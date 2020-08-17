import InfoPanel from './info-panel';

describe('InfoPanel', () => {
  let infoPanel;
  beforeEach(() => {
    infoPanel = InfoPanel.render();
  });

  it('should return rendered html', () => {
    expect(infoPanel).toBeDefined();
    expect(infoPanel).toBeInstanceOf(Element);
    expect(infoPanel.id).toMatch(/info-panel/);
  });
});
