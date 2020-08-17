import SearchPanel from './search-panel';

describe('SearchPanel', () => {
  let searchPanel;
  beforeEach(() => {
    searchPanel = SearchPanel.render();
  });

  it('should return rendered html', () => {
    expect(searchPanel).toBeDefined();
    expect(searchPanel).toBeInstanceOf(Element);
    expect(searchPanel.innerHTML).toMatch(/id="search"/);
    expect(searchPanel.innerHTML).toMatch(/placeholder="Search OMDb"/);
    expect(searchPanel.innerHTML).toMatch(/id="spinner"/);
  });
});
