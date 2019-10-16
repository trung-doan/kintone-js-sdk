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

describe('Checking Record.updateRecordByID', () => {
  it('should be called successfully', () => {
    const data = {
      app: 1,
      id: 1,
      record: {
        Text_0: {
          value: 123
        }
      },
      revision: 2
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

    const updateRecordByIdResult = recordModule.updateRecordByID(data);
    return updateRecordByIdResult.then((rsp) => {
      expect(rsp.revision).toEqual('3');
    });
  });

  it('should throw error when called with empty parameter', () => {
    const updateRecordByIdResult = recordModule.updateRecordByID();
    return updateRecordByIdResult.catch((err)=>{
      expect(err).toBeInstanceOf(KintoneAPIException);
    });
  });
});