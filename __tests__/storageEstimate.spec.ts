/**
 * @jest-environment jsdom
 */
import * as log from '../src/log';
import * as st from '../src/storageEstimate';

describe('storageEstimate', () => {
  describe('.reportStorageEstimate()', () => {
    let spy: jest.SpyInstance;

    afterEach(() => {
      if (spy) {
        spy.mockReset();
        spy.mockRestore();
      }
    });

    it('should call logData with all data', () => {
      spy = jest.spyOn(log, 'logData');
      st.reportStorageEstimate({
        quota: 10000000,
        usage: 9000000,
        usageDetails: {
          caches: 9000000,
          indexedDB: 9000000,
          serviceWorkerRegistrations: 9000000,
        },
      } as any);
      expect(spy.mock.calls.length).toEqual(1);
      expect(spy).toHaveBeenCalledWith('storageEstimate', {
        serviceWorker: 8.5831,
        caches: 8.5831,
        indexedDB: 8.5831,
        quota: 9.5367,
        usage: 8.5831,
      });
    });

    it('should call logData with all data without usageDetails', () => {
      spy = jest.spyOn(log, 'logData');
      st.reportStorageEstimate({
        quota: 10000000,
        usage: 9000000,
      } as any);
      expect(spy.mock.calls.length).toEqual(1);
      expect(spy).toHaveBeenCalledWith('storageEstimate', {
        serviceWorker: null,
        caches: null,
        indexedDB: null,
        quota: 9.5367,
        usage: 8.5831,
      });
    });
  });
});
