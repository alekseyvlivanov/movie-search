import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import InfoPanel from '../info-panel';
import VirtualKeyboard from '../virtual-keyboard';
import Swiper from '../swiper';
import AppFooter from '../app-footer';

import utils from '../../utils';

import './app.css';

export default class App {
  static render(term = '') {
    const movieSearch = utils.createElement(
      'div',
      'movie-search d-flex flex-column min-vh-100',
    );
    const appMain = utils.createElement(
      'main',
      'main container d-flex flex-column flex-grow-1 justify-content-center py-2',
    );

    appMain.append(SearchPanel.render(term));
    appMain.append(InfoPanel.render());
    appMain.append(VirtualKeyboard.render());
    appMain.append(Swiper.render());

    movieSearch.append(AppHeader.render());
    movieSearch.append(appMain);
    movieSearch.append(AppFooter.render());

    return movieSearch;
  }
}
