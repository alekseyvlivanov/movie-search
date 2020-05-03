import './search-panel.css';

export default class SearchPanel {
  constructor() {
    this.panelClassName = 'search-panel input-group';

    this.term = 'Die Hard';
  }

  render() {
    const buttonKeyboard = document.createElement('button');
    buttonKeyboard.className = 'btn btn-outline-secondary';
    buttonKeyboard.type = 'button';
    buttonKeyboard.id = 'button-keyboard';
    buttonKeyboard.innerHTML = '<i class="fi-xnsuxm-keyboard-solid">';

    const inputPrepend = document.createElement('div');
    inputPrepend.className = 'input-group-prepend';

    inputPrepend.append(buttonKeyboard);

    const input = document.createElement('input');
    input.className = 'form-control';
    input.type = 'text';
    input.placeholder = this.term;

    const buttonSearch = document.createElement('button');
    buttonSearch.className = 'btn btn-secondary';
    buttonSearch.type = 'button';
    buttonSearch.id = 'button-search';
    buttonSearch.innerHTML =
      '<i class="fi-xnsuhm-search"></i><span class="ml-2">Search</span>';

    const inputAppend = document.createElement('div');
    inputAppend.className = 'input-group-append';

    inputAppend.append(buttonSearch);

    const searchPanel = document.createElement('div');
    searchPanel.className = this.panelClassName;

    searchPanel.append(inputPrepend);
    searchPanel.append(input);
    searchPanel.append(inputAppend);

    return searchPanel;
  }
}
