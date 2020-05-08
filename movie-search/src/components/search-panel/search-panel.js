import './search-panel.css';

export default class SearchPanel {
  static render(term = '') {
    const searchPanel = document.createElement('div');
    searchPanel.className = 'search-panel input-group';

    const keyboard = document.createElement('i');
    keyboard.className = 'fa fa-keyboard-o fa-lg';
    keyboard.id = 'button-keyboard';
    keyboard.title = 'Virtual keyboard';
    keyboard.setAttribute('aria-hidden', 'true');

    const input = document.createElement('input');
    input.className = 'form-control';
    input.autocomplete = 'off';
    input.autofocus = true;
    input.id = 'search';
    input.placeholder = 'Search OMDb';
    input.title = 'Search OMDb';
    input.type = 'text';
    input.value = term;

    const clear = document.createElement('i');
    clear.className = 'fa fa-times fa-xs';
    clear.id = 'clear-search';
    clear.title = 'Clear';
    clear.setAttribute('aria-hidden', 'true');

    const search = document.createElement('i');
    search.className = 'fa fa-search fa-lg';
    search.id = 'button-search';
    search.title = 'Search';
    search.setAttribute('aria-hidden', 'true');

    searchPanel.append(keyboard);
    searchPanel.append(input);
    searchPanel.append(clear);
    searchPanel.append(search);

    return searchPanel;
  }
}
