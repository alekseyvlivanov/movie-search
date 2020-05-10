import Slide from '../components/slide';
import VirtualKeyboard from '../components/virtual-keyboard';

import OMDbService from './omdb-service';
import SwiperService from './swiper-service';
import TranslateService from './translate-service';

function preloadImages(sources, callback) {
  let counter = 0;

  function checkCounter() {
    counter += 1;
    if (counter === sources.length) callback();
  }

  sources.forEach((source) => {
    const img = document.createElement('img');

    img.onload = checkCounter;
    img.onerror = checkCounter;

    img.src = source;
  });
}

export default class mainService {
  constructor(term) {
    this.keyboardWrapper = document.getElementById('keyboard-wrapper');
    this.buttonKeyboard = document.getElementById('button-keyboard');
    this.search = document.getElementById('search');
    this.clearSearch = document.getElementById('clear-search');
    this.buttonSearch = document.getElementById('button-search');
    this.infoPanel = document.getElementById('info-panel');
    this.spinner = document.getElementById('spinner');

    this.omdbServiceById = new OMDbService();
    this.omdbServiceBySearch = new OMDbService();
    this.translateService = new TranslateService();
    this.virtualKeyboard = new VirtualKeyboard(this.search);

    this.lastTerm = '';
    this.searchTerm = '';
    this.totalResults = 0;
    this.page = 0;
    this.searching = false;

    const swiperService = new SwiperService(
      document.getElementById('swiper-container'),
    );
    this.swiper = swiperService.swiper;

    this.swiper.on('reachEnd', () => {
      if (this.swiper.slides.length < this.totalResults) {
        this.makeSearch(this.searchTerm, this.page + 1);
      }
    });

    this.makeSearch(term, 1);
  }

  clearInfo() {
    this.infoPanel.innerHTML = '';
  }

  updateInfo(type, msg) {
    this.infoPanel.innerHTML = `<span class="text-${type}"><small>${msg}</small></span>`;
  }

  makeSearch(term, page = 1) {
    if (page === 1) {
      if (term === '' || term === this.lastTerm) {
        this.updateInfo(
          'info',
          'Enter new non-empty word or phrase to search.',
        );
        return;
      }
    }

    if (this.searching) return;

    this.clearInfo();
    this.searching = true;
    this.spinner.classList.remove('invisible');

    // translate if needed
    this.translateService
      .translate(term)
      .then((translatedTerm) => {
        this.searchTerm = translatedTerm;
      })
      .catch((err) => {
        window.console.log('Yandex Translate:', err);
        this.searchTerm = term;
      })
      .finally(() => {
        this.omdbServiceBySearch
          .getResourceBySearch(this.searchTerm, page)
          .then((bodySearch) => {
            if (bodySearch.Response !== 'True') {
              if (page === 1) {
                this.updateInfo(
                  'danger',
                  `No results were found for '${this.searchTerm}'.`,
                );
              }

              this.searching = false;
              this.spinner.classList.add('invisible');

              return;
            }

            Promise.all(
              bodySearch.Search.map((e) =>
                this.omdbServiceById
                  .getResourceById(e.imdbID)
                  .then((bodyID) => {
                    return {
                      imdbID: e.imdbID,
                      Title: e.Title,
                      Type: e.Type,
                      Poster: e.Poster,
                      Year: e.Year,
                      imdbRating: bodyID.imdbRating,
                    };
                  }),
              ),
            ).then((items) => {
              preloadImages(
                items.map((e) => (e.Poster === 'N/A' ? '' : e.Poster)),
                () => {
                  const slides = items.map((item) => {
                    const slide = new Slide(
                      item.imdbID,
                      item.Title,
                      item.Type,
                      item.Poster,
                      item.Year,
                      item.imdbRating,
                    );
                    return slide.render();
                  });

                  this.lastTerm = term;
                  this.page = page;

                  if (page === 1) {
                    this.totalResults = parseInt(bodySearch.totalResults, 10);
                    this.swiper.removeAllSlides();
                  }

                  this.swiper.appendSlide(slides);

                  if (page === 1) this.swiper.slideTo(0);

                  this.updateInfo(
                    'info',
                    `Showing results for '${this.searchTerm}' - ${this.swiper.slides.length} of ${bodySearch.totalResults}.`,
                  );

                  this.searching = false;
                  this.spinner.classList.add('invisible');
                },
              );
            });
          })
          .catch((err) => {
            this.updateInfo('danger', `${err}`);

            this.searching = false;
            this.spinner.classList.add('invisible');
          });
      });
  }

  addListeners() {
    this.buttonKeyboard.addEventListener('click', () => {
      this.keyboardWrapper.classList.toggle('hidden');
      this.search.focus();
    });

    this.search.addEventListener('keyup', (e) => {
      if (e.code === 'Enter') {
        this.search.value = this.search.value.trim();
        this.makeSearch(this.search.value, 1);
        this.search.focus();
      }
    });

    this.clearSearch.addEventListener('click', () => {
      this.search.value = '';
      this.search.focus();
    });

    this.buttonSearch.addEventListener('click', () => {
      this.search.value = this.search.value.trim();
      this.makeSearch(this.search.value, 1);
      this.search.focus();
    });

    this.virtualKeyboard.addListeners();
  }
}
