import AppHeader from './app-header';

describe('AppHeader', () => {
  let appHeader;
  beforeEach(() => {
    appHeader = AppHeader.render();
  });

  it('should return rendered html', () => {
    expect(appHeader).toBeDefined();
    expect(appHeader).toBeInstanceOf(Element);
    expect(appHeader.innerHTML).toMatch(/Movie Search/);
  });
});
