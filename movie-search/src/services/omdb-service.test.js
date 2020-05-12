import OMDbService from './omdb-service';

import fetch from 'node-fetch';

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

describe('OMDbService', () => {
  let omdbService;
  beforeEach(() => {
    omdbService = new OMDbService();
  });

  it('should return IMDb data', async () => {
    expect(omdbService.getResourceBySearch).toBeDefined();
    expect(omdbService.getResourceById).toBeDefined();
    expect(omdbService.getResourceBySearch).toBeInstanceOf(Function);
    expect(omdbService.getResourceById).toBeInstanceOf(Function);

    const resSearch = await omdbService.getResourceBySearch('Doc Martin');
    expect(resSearch.Response).toEqual('True');

    const resId = await omdbService.getResourceById('tt0408381');
    expect(resId.Title).toEqual('Doc Martin');
  });
});
