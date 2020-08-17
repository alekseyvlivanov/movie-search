import VirtualKeyboard from './virtual-keyboard';

describe('VirtualKeyboard', () => {
  let keyboard;
  beforeEach(() => {
    keyboard = VirtualKeyboard.render();
  });

  it('should return rendered html', () => {
    expect(keyboard).toBeDefined();
    expect(keyboard).toBeInstanceOf(Element);
    expect(keyboard.innerHTML).toMatch(/id="keyboard"/);
  });
});
