import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import InfoPanel from '../info-panel';
import Spinner from '../spinner';
import Swiper from '../swiper';
import AppFooter from '../app-footer';

import './app.css';

export default class App {
  static render(term = '') {
    const movieSearch = document.createElement('div');
    movieSearch.className = 'movie-search';

    const appMain = document.createElement('main');
    appMain.className = 'main container d-flex flex-column py-2';

    appMain.append(SearchPanel.render(term));
    appMain.append(InfoPanel.render());
    appMain.append(Spinner.render());
    appMain.append(Swiper.render());

    movieSearch.append(AppHeader.render());
    movieSearch.append(appMain);
    movieSearch.append(AppFooter.render());

    return movieSearch;
  }
}
