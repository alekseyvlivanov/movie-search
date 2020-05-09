import Slide from '../components/slide';

import OMDbService from './omdb-service';
import SwiperService from './swiper-service';

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

function updateInfo(type, msg) {
  const infoPanel = document.getElementById('info-panel');
  infoPanel.innerHTML = `<span class="text-${type}"><small>${msg}</small></span>`;
}

export default class mainService {
  constructor(term) {
    this.search = document.getElementById('search');
    this.clearSearch = document.getElementById('clear-search');
    this.buttonSearch = document.getElementById('button-search');
    this.spinner = document.getElementById('spinner');

    this.omdbServiceBySearch = new OMDbService();
    this.omdbServiceById = new OMDbService();

    this.lastTerm = '';
    this.page = 0;
    this.totalResults = 0;

    const swiperService = new SwiperService(
      document.getElementById('swiper-container'),
    );
    this.swiper = swiperService.swiper;

    this.swiper.on('reachEnd', () => {
      window.console.log('reachEnd:', this.swiper.slides.length);
      window.console.log('totalResults:', this.totalResults);
      window.console.log('page:', this.page);
      window.console.log('-----');

      // debugger;
      // if (this.swiper.slides.length < this.totalResults) {
      //   window.console.log(
      //     `make search for '${this.lastTerm}' and page ${this.page + 1}`,
      //   );
      // }
    });

    this.makeSearch(term, 1);
  }

  // TODO
  // при достижении конца слайдера/свайпера происходит загрузка следующей страницы поискового запроса

  // TODO
  // поисковый запрос можно набирать на виртуальной клавиатуре.
  // Есть возможность переключения языка клавиатуры кликом мышки

  // TODO
  // поисковый запрос можно отправить, кликая мышкой по кнопке Enter на виртуальной клавиатуре.
  // Поисковый запрос можно редактировать при помощи виртуальной клавиатуры перемещаясь стрелками вправо-влево и вводя текст на позицию курсора

  makeSearch(term, page = 1) {
    if (page === 1) {
      if (term === '' || term === this.lastTerm) {
        updateInfo('info', 'Enter new non-empty word or phrase to search.');
        return;
      }
    }

    this.lastTerm = term;

    // TODO
    // при вводе запроса на русском языке поисковый запрос переводится на английский язык,
    // выводится уведомление "Showing results for ..."

    const searchTerm = term;

    this.spinner.classList.remove('invisible');

    this.omdbServiceBySearch
      .getResourceBySearch(searchTerm, page)
      .then((bodySearch) => {
        if (bodySearch.Response !== 'True') {
          updateInfo('danger', `No results for '${searchTerm}'.`);
          this.spinner.classList.add('invisible');

          return;
        }

        Promise.all(
          bodySearch.Search.map((e) =>
            this.omdbServiceById.getResourceById(e.imdbID).then((bodyID) => {
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
              const arr = new Array(this.swiper.slides.length);

              items.forEach((item) => {
                const slide = new Slide(
                  item.imdbID,
                  item.Title,
                  item.Type,
                  item.Poster,
                  item.Year,
                  item.imdbRating,
                );
                this.swiper.appendSlide(slide.render());
              });

              this.swiper.removeSlide(arr.fill(0).map((_, idx) => idx));
              this.swiper.slideTo(0);

              this.page = page;
              this.totalResults = parseInt(bodySearch.totalResults, 10);

              updateInfo(
                'info',
                `${bodySearch.totalResults} result(s) for '${searchTerm}'.`,
              );

              this.spinner.classList.add('invisible');
            },
          );
        });
      })
      .catch((err) => {
        updateInfo('danger', `${err}`);
        this.spinner.classList.add('invisible');
      });
  }

  addListeners() {
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
  }
}
