import App from './app';

describe('App', () => {
  let movieSearch;
  beforeEach(() => {
    movieSearch = App.render();
  });

  it('should return rendered html', () => {
    expect(movieSearch).toBeDefined();
    expect(movieSearch).toBeInstanceOf(Element);
    expect(movieSearch.innerHTML).toMatch(/href="https:\/\/rs\.school"/);
    expect(movieSearch.innerHTML).toMatch(
      /href="https:\/\/github\.com\/alekseyvlivanov"/,
    );
    expect(movieSearch.innerHTML).toMatch(/Movie Search/);
    expect(movieSearch.innerHTML).toMatch(/id="info-panel"/);
    expect(movieSearch.innerHTML).toMatch(/id="search"/);
    expect(movieSearch.innerHTML).toMatch(/placeholder="Search OMDb"/);
    expect(movieSearch.innerHTML).toMatch(/id="spinner"/);
    expect(movieSearch.innerHTML).toMatch(/id="swiper-container"/);
    expect(movieSearch.innerHTML).toMatch(/id="keyboard"/);
  });
});
