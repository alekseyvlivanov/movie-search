import './swiper.css';

export default class Swiper {
  static render() {
    const swiper = document.createElement('div');
    swiper.className = 'swiper';

    const swiperContainer = document.createElement('div');
    swiperContainer.className = 'swiper-container';
    swiperContainer.id = 'swiper-container';

    const swiperWrapper = document.createElement('div');
    swiperWrapper.className = 'swiper-wrapper';

    const swiperPagination = document.createElement('div');
    swiperPagination.className = 'swiper-pagination';

    const swiperButtonPrev = document.createElement('div');
    swiperButtonPrev.className = 'swiper-button-prev';

    const swiperButtonNext = document.createElement('div');
    swiperButtonNext.className = 'swiper-button-next';

    swiperContainer.append(swiperWrapper);
    swiperContainer.append(swiperPagination);

    swiper.append(swiperContainer);
    swiper.append(swiperButtonPrev);
    swiper.append(swiperButtonNext);

    return swiper;
  }
}
