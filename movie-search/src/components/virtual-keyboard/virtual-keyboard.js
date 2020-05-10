import keyboardLayout from './keyboard-layout';

import './virtual-keyboard.css';

export default class VirtualKeyboard {
  constructor() {
    this.caps = false;
    this.lang = 'en';
  }

  static render() {
    this.keyboardWrapper = document.createElement('div');
    this.keyboardWrapper.className = 'keyboard-wrapper hidden pb-3';
    this.keyboardWrapper.id = 'keyboard-wrapper';

    const keyboard = document.createElement('div');
    keyboard.className = 'keyboard';

    this.keyboardKeys = {};

    keyboardLayout.forEach((line) => {
      const keyboardRow = document.createElement('div');
      keyboardRow.className = 'keyboard__row';

      line.forEach((key) => {
        this.keyboardKeys[key.code] = key.lang;
        this.keyboardKeys[key.code].func = key.func;

        const keyElement = document.createElement('button');
        keyElement.id = key.code;
        keyElement.type = 'button';
        keyElement.className = `keyboard__key keyboard__key_${key.width}`;

        keyElement.textContent = key.lang.en;
        keyboardRow.append(keyElement);
      });

      keyboard.append(keyboardRow);
    });

    this.keyboardWrapper.append(keyboard);

    return this.keyboardWrapper;
  }
}
