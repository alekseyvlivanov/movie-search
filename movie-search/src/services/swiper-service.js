import '../../node_modules/swiper/css/swiper.min.css';
import Swiper from 'swiper';

export default class SwiperService {
  constructor(selector) {
    this.options = {
      breakpoints: {
        425: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      },
      centerInsufficientSlides: true,
      keyboard: {
        enabled: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        clickable: true,
        dynamicBullets: true,
        el: '.swiper-pagination',
      },
      slidesPerView: 1,
      spaceBetween: 20,
    };
    this.selector = selector;

    this.swiper = new Swiper(this.selector, this.options);
  }
}
