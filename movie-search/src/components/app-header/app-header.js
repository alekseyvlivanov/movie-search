import './app-header.css';

export default class AppHeader {
  constructor() {
    this.headerClassName =
      'header navbar justify-content-center text-light bg-dark';
    this.titleClassName = 'font-weight-bolder';
    this.titleTextContent = 'MovieSearch';
  }

  render() {
    const appTitle = document.createElement('h1');
    appTitle.className = this.titleClassName;
    appTitle.textContent = this.titleTextContent;

    const appHeader = document.createElement('header');
    appHeader.className = this.headerClassName;
    appHeader.append(appTitle);

    return appHeader;
  }
}
