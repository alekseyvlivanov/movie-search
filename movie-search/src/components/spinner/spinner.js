import './spinner.css';

export default class Spinner {
  static render() {
    const appSpinner = document.createElement('div');
    appSpinner.className = 'spinner d-flex justify-content-center';
    appSpinner.id = 'spinner';
    appSpinner.innerHTML = `
    <div class="spinner-border m-2" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    `;

    return appSpinner;
  }
}
