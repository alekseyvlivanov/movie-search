import Slide from './slide';

describe('Slide', () => {
  let slide;
  beforeEach(() => {
    const objSlide = new Slide({
      id: 'ttOK',
      title: 'Movie title',
      type: 'movie',
      poster: 'N/A',
      year: '1987',
      rating: '6.5',
    });
    slide = objSlide.render();
  });

  it('should return rendered html', () => {
    expect(slide).toBeDefined();
    expect(slide).toBeInstanceOf(Element);
    expect(slide.innerHTML).toMatch(/href="https:\/\/www\.imdb\.com\/title\//);
  });
});
