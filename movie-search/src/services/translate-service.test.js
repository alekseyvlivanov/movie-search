import TranslateService from './translate-service';

import fetch from 'node-fetch';

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

describe('TranslateService', () => {
  let translateService;
  beforeEach(() => {
    translateService = new TranslateService();
  });

  it('should return correctly translated phrase', async () => {
    expect(translateService.translate).toBeDefined();
    expect(translateService.translate).toBeInstanceOf(Function);

    const res = await translateService.translate('День сурка');
    expect(res).toEqual('Groundhog day');
  });
});
