import './app-header.css';

export default class AppHeader {
  static render() {
    const appHeader = document.createElement('header');
    appHeader.className =
      'header navbar navbar-dark text-light bg-dark justify-content-center';

    const appTitle = document.createElement('h1');
    appTitle.className = 'font-weight-bolder';
    appTitle.textContent = 'Movie Search';

    appHeader.append(appTitle);

    return appHeader;
  }
}
