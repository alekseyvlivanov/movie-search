import Spinner from './spinner';

describe('Spinner', () => {
  let appSpinner;
  beforeEach(() => {
    appSpinner = Spinner.render();
  });

  it('should return rendered html', () => {
    expect(appSpinner).toBeDefined();
    expect(appSpinner).toBeInstanceOf(Element);
    expect(appSpinner.id).toMatch(/spinner/);
  });
});
