import keyboardLayout from './keyboard-layout';

describe('keyboardLayout', () => {
  it('should be array of arrays', () => {
    expect(keyboardLayout).toBeDefined();
    expect(keyboardLayout).toBeInstanceOf(Array);
    expect(keyboardLayout.flat().length).toEqual(56);
    expect(keyboardLayout.flat()).toEqual(
      expect.arrayContaining([
        {
          code: 'CapsLock',
          func: true,
          lang: { en: '🅰', ru: '🅰' },
          width: 'extra-wide',
        },
        {
          code: 'EnRu',
          func: true,
          lang: { en: '🌐', ru: '🌐' },
          width: 'extra-wide',
        },
        {
          code: 'Enter',
          func: true,
          lang: { en: '↩', ru: '↩' },
          width: 'extra-wide',
        },
      ]),
    );
  });
});
