import Slide from '../components/slide';

import OMDbService from './omdb-service';
import SwiperService from './swiper-service';

export default class mainSearch {
  static throttle(func, ms) {
    let isThrottled = false;
    let savedArgs;
    let savedThis;

    function wrapper(...args) {
      if (isThrottled) {
        savedArgs = args;
        savedThis = this;
        return;
      }

      func.apply(this, args);

      isThrottled = true;

      setTimeout(() => {
        isThrottled = false;

        if (savedArgs) {
          wrapper.apply(savedThis, ...savedArgs);
          savedArgs = null;
          savedThis = null;
        }
      }, ms);
    }

    return wrapper;
  }

  static debounce(func, ms) {
    let isCooldown = false;

    return (...args) => {
      if (isCooldown) return;

      func.apply(this, args);

      isCooldown = true;

      setTimeout(() => {
        isCooldown = false;
      }, ms);
    };
  }

  constructor(term) {
    this.search = document.getElementById('search');
    this.clearSearch = document.getElementById('clear-search');
    this.buttonSearch = document.getElementById('button-search');
    this.spinner = document.getElementById('spinner');
    this.swiperContainer = document.getElementById('swiper-container');

    this.omdbServiceBySearch = new OMDbService();
    this.omdbServiceById = new OMDbService();
    this.swiperService = new SwiperService(this.swiperContainer);

    this.lastTerm = '';

    this.makeSearch(term);
  }

  makeSearch(term) {
    // TODO - make alert if empty or equals last term
    if (term === '' || term === this.lastTerm) return;

    this.lastTerm = term;

    // TODO - check russian and make translation

    this.spinner.classList.remove('invisible');

    this.omdbServiceBySearch.getResourceBySearch(term).then((bodySearch) => {
      if (
        this.swiperService.swiper.slides.length > 0 &&
        bodySearch.Search.length > 0
      ) {
        this.swiperService.swiper.removeAllSlides();
      }

      bodySearch.Search.forEach((movie) => {
        this.omdbServiceById.getResourceById(movie.imdbID).then((bodyId) => {
          const slide = new Slide(
            movie.Title,
            movie.Poster,
            movie.Year,
            bodyId.imdbRating,
          );
          this.swiperService.swiper.appendSlide(slide.render());
        });
      });
    });

    setTimeout(() => {
      this.spinner.classList.add('invisible');
    }, 500);
  }

  addListeners() {
    this.search.addEventListener('keyup', (e) => {
      if (e.code === 'Enter') {
        this.makeSearch(e.target.value);
      }
    });

    this.clearSearch.addEventListener('click', () => {
      this.search.value = '';
      this.search.focus();
    });

    this.buttonSearch.addEventListener('click', () => {
      this.makeSearch(this.search.value);
      this.search.focus();
    });
  }
}
