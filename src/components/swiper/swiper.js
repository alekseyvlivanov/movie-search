import utils from '../../utils';

import './swiper.css';

export default class Swiper {
  static render() {
    const swiper = utils.createElement('div', 'swiper');

    const swiperContainer = utils.createElement('div', 'swiper-container');
    swiperContainer.id = 'swiper-container';

    const swiperWrapper = utils.createElement('div', 'swiper-wrapper');
    const swiperPagination = utils.createElement('div', 'swiper-pagination');
    const swiperButtonPrev = utils.createElement('div', 'swiper-button-prev');
    const swiperButtonNext = utils.createElement('div', 'swiper-button-next');

    swiperContainer.append(swiperWrapper);
    swiperContainer.append(swiperPagination);

    swiper.append(swiperContainer);
    swiper.append(swiperButtonPrev);
    swiper.append(swiperButtonNext);

    return swiper;
  }
}
