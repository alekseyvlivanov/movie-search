import utils from '../../utils';

import './app-header.css';

export default class AppHeader {
  static render() {
    const appHeader = utils.createElement(
      'header',
      'header navbar navbar-dark text-light bg-dark justify-content-center',
    );

    const appTitle = utils.createElement('h1', 'font-weight-bolder');

    appTitle.textContent = 'Movie Search';

    appHeader.append(appTitle);

    return appHeader;
  }
}
