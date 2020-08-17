import AppFooter from './app-footer';

describe('AppFooter', () => {
  let appFooter;
  beforeEach(() => {
    appFooter = AppFooter.render();
  });

  it('should return rendered html', () => {
    expect(appFooter).toBeDefined();
    expect(appFooter).toBeInstanceOf(Element);
    expect(appFooter.innerHTML).toMatch(/href="https:\/\/rs\.school"/);
    expect(appFooter.innerHTML).toMatch(
      /href="https:\/\/github\.com\/alekseyvlivanov"/,
    );
  });
});
