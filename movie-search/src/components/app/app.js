import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import Slider from '../slider';
import AppFooter from '../app-footer';

import './app.css';

export default class app {
  constructor() {
    this.appClassName = 'movie-search';
    this.mainClassName = 'main container d-flex flex-column py-2';
  }

  render() {
    const appHeader = new AppHeader();
    const searchPanel = new SearchPanel();
    const slider = new Slider();
    const appFooter = new AppFooter();

    const movieSearch = document.createElement('div');
    movieSearch.className = this.appClassName;

    const myMain = document.createElement('main');
    myMain.className = this.mainClassName;
    myMain.append(searchPanel.render());
    myMain.append(slider.render());

    movieSearch.append(appHeader.render());
    movieSearch.append(myMain);
    movieSearch.append(appFooter.render());

    return movieSearch;
  }
}
