import './app-footer.css';

export default class AppFooter {
  constructor() {
    this.footerClassName =
      'footer navbar justify-content-around text-light bg-dark';
    this.linkClassName = 'nav-link text-reset';
  }

  render() {
    const linkRSS = document.createElement('a');
    linkRSS.className = this.linkClassName;
    linkRSS.href = 'https://rs.school';
    linkRSS.target = '_blank';
    linkRSS.title = 'The Rolling Scopes School';
    linkRSS.textContent = 'RS School';

    const linkGitHub = document.createElement('a');
    linkGitHub.className = this.linkClassName;
    linkGitHub.href = 'https://github.com/alekseyvlivanov';
    linkGitHub.target = '_blank';
    linkGitHub.title = 'Aleksey Ivanov';
    linkGitHub.innerHTML =
      '<i class="fi-xnsuxl-github"></i><span class="ml-2">GitHub</span>';

    const appFooter = document.createElement('footer');
    appFooter.className = this.footerClassName;

    appFooter.append(linkRSS);
    appFooter.append(linkGitHub);

    return appFooter;
  }
}
