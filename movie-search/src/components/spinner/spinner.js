import './spinner.css';

export default class Spinner {
  static render() {
    const appSpinner = document.createElement('div');
    appSpinner.className = 'spinner d-flex justify-content-center invisible';
    appSpinner.id = 'spinner';
    appSpinner.innerHTML = `
    <i class="fa fa-refresh fa-spin fa-2x fa-fw"></i>
    <span class="sr-only">Loading...</span>
    `;

    return appSpinner;
  }
}
