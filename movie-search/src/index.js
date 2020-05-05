import App from './components/app';
import Slide from './components/slide';

import OMDbService from './services/omdb-service';
import SwiperService from './services/swiper-service';

const term = 'Die Hard';
document.getElementById('root').append(App.render(term));

// const search = document.getElementById('search');
const spinner = document.getElementById('spinner');
const swiperContainer = document.getElementById('swiper-container');

const omdbServiceBySearch = new OMDbService();
const omdbServiceById = new OMDbService();
const swiperService = new SwiperService(swiperContainer);

omdbServiceBySearch
  .getResourceBySearch(term)
  .then((bodySearch) => {
    bodySearch.Search.forEach((movie) => {
      window.console.log(movie);
      omdbServiceById.getResourceById(movie.imdbID).then((bodyId) => {
        window.console.log(bodyId.imdbRating);

        const slide = new Slide(
          movie.Title,
          movie.Poster,
          movie.Year,
          bodyId.imdbRating,
        );
        swiperService.swiper.appendSlide(slide.render());
      });
    });
  })
  .finally(spinner.classList.add('invisible'));
