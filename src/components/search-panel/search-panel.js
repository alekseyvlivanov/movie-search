import utils from '../../utils';

import './search-panel.css';

export default class SearchPanel {
  static render(term = '') {
    const searchPanel = utils.createElement('div', 'search-panel input-group');

    const keyboard = utils.createElement('i', 'fa fa-keyboard-o fa-lg');
    keyboard.id = 'button-keyboard';
    keyboard.title = 'Virtual keyboard';
    keyboard.setAttribute('aria-hidden', 'true');

    const input = utils.createElement('input', 'form-control');
    input.autocomplete = 'off';
    input.autofocus = true;
    input.id = 'search';
    input.placeholder = 'Search OMDb';
    input.title = 'Search OMDb';
    input.type = 'text';
    input.value = term;

    const spinner = utils.createElement(
      'div',
      'spinner d-flex justify-content-center invisible',
    );
    spinner.id = 'spinner';
    spinner.innerHTML = `
    <i class="fa fa-refresh fa-spin fa-2x fa-fw"></i>
    <span class="sr-only">Loading...</span>
    `;

    const clear = utils.createElement('i', 'fa fa-times fa-xs');
    clear.id = 'clear-search';
    clear.title = 'Clear';
    clear.setAttribute('aria-hidden', 'true');

    const search = utils.createElement('i', 'fa fa-search fa-lg');
    search.id = 'button-search';
    search.title = 'Search';
    search.setAttribute('aria-hidden', 'true');

    searchPanel.append(keyboard);
    searchPanel.append(input);
    searchPanel.append(spinner);
    searchPanel.append(clear);
    searchPanel.append(search);

    return searchPanel;
  }
}
