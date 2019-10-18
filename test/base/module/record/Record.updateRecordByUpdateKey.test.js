import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {URI, USERNAME, PASSWORD, DOMAIN} from './common';
import nock from 'nock';
import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const connection = new Connection({auth, domain: DOMAIN});
const recordModule = new Record({connection});

const RECORD_ROUTE = '/k/v1/record.json';

describe('Checking Record.updateRecordByUpdateKey', () => {
  it('should be called successfully', () => {
    const data = {
      'app': 777,
      'updateKey': {
        'field': 'unique_key',
        'value': 'CODE123'
      },
      'revision': 2,
      'record': {
        'string_multi': {
          'value': 'this value has been updated'
        }
      }
    };
    nock(URI)
      .put(RECORD_ROUTE, (rqBody) => {
        expect(rqBody).toEqual(data);
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toBe('application/json;charset=utf-8');
        return true;
      })
      .reply(200, {'revision': '3'});

    const updateRecordByUpdateKeyResult = recordModule.updateRecordByUpdateKey(data);
    return updateRecordByUpdateKeyResult.then((rsp) => {
      expect(rsp.revision).toEqual('3');
    });
  });

  it('should be called successfully without revision', () => {
    const data = {
      'app': 777,
      'updateKey': {
        'field': 'unique_key',
        'value': 'CODE123'
      },
      'record': {
        'string_multi': {
          'value': 'this value has been updated'
        }
      }
    };
    nock(URI)
      .put(RECORD_ROUTE, (rqBody) => {
        const bodyData = Object.assign({}, data);
        bodyData.revision = null; // TODO: Update default revision to -1
        expect(rqBody).toEqual(bodyData);
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toBe('application/json;charset=utf-8');
        return true;
      })
      .reply(200, {'revision': '1'});

    const updateRecordByUpdateKeyResult = recordModule.updateRecordByUpdateKey(data);
    return updateRecordByUpdateKeyResult.then((rsp) => {
      expect(rsp.revision).toEqual('1');
    });
  });

  it('should throw error when called with no updateKey', () => {
    const data = {
      'app': 777,
      'revision': 2,
      'record': {
        'string_multi': {
          'value': 'this value has been updated'
        }
      },
      updateKey: {}
    };
    const expectResult = {
      'code': 'CB_VA01',
      'id': 'w4L7A60XoUJAbG9EYhDt',
      'message': 'Missing or invalid input.',
      'errors': {
        'updateKey.value': {
          'messages': ['Required field.']
        },
        'updateKey.field': {
          'messages': ['Required field.']
        }
      }
    };
    nock(URI)
      .put(RECORD_ROUTE, (rqBody) => {
        expect(rqBody).toEqual(data);
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toBe('application/json;charset=utf-8');
        return true;
      })
      .reply(400, expectResult);

    const updateRecordByUpdateKeyResult = recordModule.updateRecordByUpdateKey(data);
    return updateRecordByUpdateKeyResult.catch((err) => {
      expect(err).toBeInstanceOf(KintoneAPIException);
      expect(err.errorResponse).toMatchObject(expectResult);
    });
  });
});