import keyboardLayout from './keyboard-layout';

import './virtual-keyboard.css';

export default class VirtualKeyboard {
  constructor(input) {
    this.input = input;

    this.caps = false;
    this.lang = 'en';

    this.keyboardKeys = {};
    keyboardLayout.forEach((line) => {
      line.forEach((key) => {
        this.keyboardKeys[key.code] = key.lang;
        this.keyboardKeys[key.code].func = key.func;
      });
    });
  }

  static render() {
    const keyboardWrapper = document.createElement('div');
    keyboardWrapper.className = 'keyboard-wrapper hidden pb-3';
    keyboardWrapper.id = 'keyboard-wrapper';

    const keyboard = document.createElement('div');
    keyboard.className = 'keyboard';
    keyboard.id = 'keyboard';

    keyboardLayout.forEach((line) => {
      const keyboardRow = document.createElement('div');
      keyboardRow.className = 'keyboard__row';

      line.forEach((key) => {
        const keyElement = document.createElement('button');
        keyElement.id = key.code;
        keyElement.type = 'button';
        keyElement.className = `keyboard__key keyboard__key_${key.width}`;

        keyElement.textContent = key.lang.en;
        keyboardRow.append(keyElement);
      });

      keyboard.append(keyboardRow);
    });

    keyboardWrapper.append(keyboard);

    return keyboardWrapper;
  }

  pressBackspace() {
    if (this.input.selectionStart !== this.input.selectionEnd) {
      this.insertText('');
    } else {
      const cursorAt = Math.max(0, this.input.selectionStart - 1);

      this.input.value =
        this.input.value.slice(0, cursorAt) +
        this.input.value.slice(this.input.selectionEnd);

      this.input.selectionStart = cursorAt;
      this.input.selectionEnd = this.input.selectionStart;
    }
  }

  pressDelete() {
    if (this.input.selectionStart !== this.input.selectionEnd) {
      this.insertText('');
    } else {
      const cursorAt = this.input.selectionStart;

      this.input.value =
        this.input.value.slice(0, cursorAt) +
        this.input.value.slice(cursorAt + 1);

      this.input.selectionStart = cursorAt;
      this.input.selectionEnd = this.input.selectionStart;
    }
  }

  switchCaps() {
    const toCase = this.caps ? 'toUpperCase' : 'toLowerCase';

    Array.from(document.querySelectorAll('.keyboard__key')).forEach((e) => {
      if (!this.keyboardKeys[e.id].func) {
        if (e.id === 'Minus') {
          e.textContent = this.caps ? '_' : '-';
        } else if (e.id === 'Plus') {
          e.textContent = this.caps ? '=' : '+';
        } else if (e.id === 'BracketLeft' && this.lang === 'en') {
          e.textContent = this.caps ? '{' : '[';
        } else if (e.id === 'BracketRight' && this.lang === 'en') {
          e.textContent = this.caps ? '}' : ']';
        } else if (e.id === 'Semicolon' && this.lang === 'en') {
          e.textContent = this.caps ? ':' : ';';
        } else if (e.id === 'Quote' && this.lang === 'en') {
          e.textContent = this.caps ? '"' : "'";
        } else if (e.id === 'Question' && this.lang === 'en') {
          e.textContent = this.caps ? '\\' : '?';
        } else if (e.id === 'Comma' && this.lang === 'en') {
          e.textContent = this.caps ? '<' : ',';
        } else if (e.id === 'Period' && this.lang === 'en') {
          e.textContent = this.caps ? '>' : '.';
        } else if (e.id === 'Slash' && this.lang === 'en') {
          e.textContent = this.caps ? '?' : '/';
        } else if (e.id === 'Slash' && this.lang === 'ru') {
          e.textContent = this.caps ? ',' : '.';
        } else {
          e.textContent = e.textContent[toCase]();
        }
      }
    });
  }

  showLanguage() {
    Array.from(document.querySelectorAll('.keyboard__key')).forEach((e) => {
      e.textContent = this.keyboardKeys[e.id][this.lang];
    });

    this.switchCaps();
  }

  arrowUp() {
    this.input.selectionStart = 0;
    this.input.selectionEnd = this.input.selectionStart;
  }

  arrowLeft() {
    this.input.selectionStart = Math.max(0, this.input.selectionStart - 1);
    this.input.selectionEnd = this.input.selectionStart;
  }

  arrowRight() {
    this.input.selectionStart = Math.min(
      this.input.value.length,
      this.input.selectionEnd + 1,
    );
    this.input.selectionEnd = this.input.selectionStart;
  }

  arrowDown() {
    this.input.selectionEnd = this.input.value.length;
    this.input.selectionStart = this.input.selectionEnd;
  }

  insertText(chars) {
    const cursorAt = this.input.selectionStart;

    this.input.value =
      this.input.value.slice(0, cursorAt) +
      chars +
      this.input.value.slice(this.input.selectionEnd);

    this.input.selectionStart = cursorAt + chars.length;
    this.input.selectionEnd = this.input.selectionStart;
  }

  addListeners() {
    document.getElementById('keyboard').addEventListener('click', (e) => {
      const key = e.target.closest('.keyboard__key');

      if (!key) return;

      this.input.focus();

      switch (key.id) {
        case 'Backspace':
          this.pressBackspace();
          break;

        case 'Delete':
          this.pressDelete();
          break;

        case 'CapsLock':
          this.caps = !this.caps;
          if (this.caps) {
            key.classList.add('active');
          } else {
            key.classList.remove('active');
          }
          this.switchCaps();
          break;

        case 'EnRu':
          this.lang = this.lang === 'ru' ? 'en' : 'ru';
          this.showLanguage();
          break;

        case 'ArrowUp':
          this.arrowUp();
          break;

        case 'ArrowLeft':
          this.arrowLeft();
          break;

        case 'ArrowRight':
          this.arrowRight();
          break;

        case 'ArrowDown':
          this.arrowDown();
          break;

        case 'Enter':
          document.getElementById('button-search').click();
          break;

        default:
          this.insertText(key.textContent);
      }
    });
  }
}
