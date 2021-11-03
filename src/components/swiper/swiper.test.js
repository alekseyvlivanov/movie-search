import Swiper from './swiper';

describe('Swiper', () => {
  let swiper;
  beforeEach(() => {
    swiper = Swiper.render();
  });

  it('should return rendered html', () => {
    expect(swiper).toBeDefined();
    expect(swiper).toBeInstanceOf(Element);
    expect(swiper.innerHTML).toMatch(/id="swiper-container"/);
  });
});
