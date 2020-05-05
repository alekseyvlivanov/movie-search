import './search-panel.css';

export default class SearchPanel {
  static render(term = '') {
    const searchPanel = document.createElement('div');
    searchPanel.className = 'search-panel input-group pb-2';

    const buttonKeyboard = document.createElement('button');
    buttonKeyboard.className = 'btn btn-outline-secondary';
    buttonKeyboard.type = 'button';
    buttonKeyboard.id = 'button-keyboard';
    buttonKeyboard.innerHTML =
      '<i class="fa fa-keyboard-o" aria-hidden="true"></i>';

    const inputPrepend = document.createElement('div');
    inputPrepend.className = 'input-group-prepend';

    const input = document.createElement('input');
    input.className = 'form-control';
    input.id = 'search';
    input.type = 'text';
    input.placeholder = 'Search OMDb';
    input.value = term;

    const buttonSearch = document.createElement('button');
    buttonSearch.className = 'btn btn-secondary';
    buttonSearch.type = 'button';
    buttonSearch.id = 'button-search';
    buttonSearch.innerHTML =
      '<i class="fa fa-search" aria-hidden="true"></i> Search';

    const inputAppend = document.createElement('div');
    inputAppend.className = 'input-group-append';

    inputPrepend.append(buttonKeyboard);
    inputAppend.append(buttonSearch);

    searchPanel.append(inputPrepend);
    searchPanel.append(input);
    searchPanel.append(inputAppend);

    return searchPanel;
  }
}
