import './app-footer.css';

export default class AppFooter {
  static render() {
    const appFooter = document.createElement('footer');
    appFooter.className =
      'footer navbar navbar-dark text-light bg-dark justify-content-around';

    appFooter.innerHTML = `
    <a class="nav-link" href="https://rs.school" target="_blank" title="The Rolling Scopes School"><span aria-hidden="true">RS School 2020q1</span></a>
    <a class="nav-link" href="https://github.com/alekseyvlivanov" target="_blank" title="Aleksey Ivanov"><i class="fa fa-github" aria-hidden="true"></i><span aria-hidden="true"> GitHub</span></a>
    `;

    return appFooter;
  }
}
