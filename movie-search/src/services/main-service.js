import Slide from '../components/slide';

import OMDbService from './omdb-service';
import SwiperService from './swiper-service';

function updateInfo(type, msg) {
  const infoPanel = document.getElementById('info-panel');
  infoPanel.innerHTML = `<span class="text-${type}"><small>${msg}</small></span>`;
}

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

  // TODO
  // при достижении конца слайдера/свайпера происходит загрузка следующей страницы поискового запроса

  // TODO
  // поисковый запрос можно набирать на виртуальной клавиатуре.
  // Есть возможность переключения языка клавиатуры кликом мышки

  // TODO
  // поисковый запрос можно отправить, кликая мышкой по кнопке Enter на виртуальной клавиатуре.
  // Поисковый запрос можно редактировать при помощи виртуальной клавиатуры перемещаясь стрелками вправо-влево и вводя текст на позицию курсора

  makeSearch(term) {
    if (term === '' || term === this.lastTerm) {
      updateInfo('info', 'Enter new non-empty word or phrase to search.');
      return;
    }

    this.lastTerm = term;

    // TODO
    // при вводе запроса на русском языке поисковый запрос переводится на английский язык,
    // выводится уведомление "Showing results for ..."

    this.spinner.classList.remove('invisible');

    this.omdbServiceBySearch
      .getResourceBySearch(term)
      .then((bodySearch) => {
        if (bodySearch.Response !== 'True') {
          updateInfo('danger', `No results for '${term}'.`);
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
            items.map((e) => e.Poster),
            () => {
              const arr = new Array(this.swiperService.swiper.slides.length);

              items.forEach((item) => {
                const slide = new Slide(
                  item.imdbID,
                  item.Title,
                  item.Type,
                  item.Poster,
                  item.Year,
                  item.imdbRating,
                );
                this.swiperService.swiper.appendSlide(slide.render());
              });

              this.swiperService.swiper.removeSlide(
                arr.fill(0).map((_, idx) => idx),
              );
              this.swiperService.swiper.slideTo(0);

              updateInfo(
                'info',
                `${bodySearch.totalResults} result(s) for '${term}'.`,
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
        this.makeSearch(this.search.value);
        this.search.focus();
      }
    });

    this.clearSearch.addEventListener('click', () => {
      this.search.value = '';
      this.search.focus();
    });

    this.buttonSearch.addEventListener('click', () => {
      this.search.value = this.search.value.trim();
      this.makeSearch(this.search.value);
      this.search.focus();
    });
  }
}
