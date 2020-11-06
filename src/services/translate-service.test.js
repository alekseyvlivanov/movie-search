import fetch from 'node-fetch';

import TranslateService from './translate-service';
import APIDATA from './api-data';

if (!global.fetch) {
  global.fetch = fetch;
}

describe('TranslateService', () => {
  let translateService;
  beforeEach(() => {
    translateService = new TranslateService(APIDATA.MultiTranslate, false);
  });

  it('should return correctly translated phrase', async () => {
    expect(translateService.translate).toBeDefined();
    expect(translateService.translate).toBeInstanceOf(Function);

    const res = await translateService.translate('день сурка');
    expect(res).toEqual('groundhog day');
  });
});
