import './info-panel.css';

export default class InfoPanel {
  static render() {
    const infoPanel = document.createElement('div');
    infoPanel.className =
      'info-panel bg-transparent d-flex align-items-center justify-content-center py-2';
    infoPanel.id = 'info-panel';

    return infoPanel;
  }
}
