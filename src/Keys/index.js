import createElementFromHTML from '../utils/createElementFromHTML';
import KeysHTML from './index.html';
import './index.scss';
import keysObj from './keys.json';
import KeysRow from './components/KeysRow';
import Key from '../components/Key';

const getCookieLang = () => {
  const cookieLang = document.cookie.match(/lang=[^;]+/);
  if (cookieLang) {
    return cookieLang[0].split('=')[1];
  }
  return 'en';
};

class Keys {
  constructor(target) {
    this.keys = {};
    this.target = target;
    this.lang = getCookieLang() || 'en';
    this.caps = false;
    this.shift = false;
    this.$element = createElementFromHTML(KeysHTML);
    this.init();
  }

  init() {
    keysObj.rows.forEach((row) => {
      const keysRow = KeysRow();
      row.forEach((el) => {
        const key = new Key(this.lang, el);
        this.keys[key.$element.id] = key;
        const keyElement = key.$element;
        keyElement.addEventListener('mousedown', (e) => { this.mousedownHandler(e); });
        keyElement.addEventListener('mouseup', (e) => { this.mouseupHandler(e); });
        keyElement.addEventListener('mouseout', (e) => {
          if (e.buttons > 0) this.mouseupHandler(e);
        });
        keysRow.append(keyElement);
      });
      this.$element.appendChild(keysRow);
      window.addEventListener('beforeunload', () => {
        document.cookie = `lang=${this.lang}`;
      });
    });
  }

  mousedownHandler(e) {
    if (e.target.id in this.keys) {
      const keyId = e.target.id;
      const key = this.keys[keyId];
      switch (keyId) {
        case 'CapsLock':
          key.keyCaps();
          this.changeCaps();
          this.changeKeys();
          break;
        case 'ShiftLeft':
          key.keyDown();
          this.changeShift();
          this.changeKeys();
          break;
        case 'ShiftRight':
          key.keyDown();
          this.changeShift();
          this.changeKeys();
          break;
        default:
          key.keyDown(this.target);
      }
    }
  }

  mouseupHandler(e) {
    if (e.target.id in this.keys) {
      const keyId = e.target.id;
      const key = this.keys[keyId];
      switch (keyId) {
        case 'CapsLock':
          break;
        case 'ShiftLeft':
          key.keyUp();
          if (this.shift) {
            this.changeShift();
            this.changeKeys();
          }
          break;
        case 'ShiftRight':
          key.keyUp();
          this.changeShift();
          this.changeKeys();
          break;
        default:
          key.keyUp();
      }
    }
  }

  keydownHandler(e) {
    const keyId = e.code;
    if (keyId in this.keys) {
      const key = this.keys[keyId];
      switch (keyId) {
        case 'CapsLock':
          if (!e.repeat) {
            key.keyCaps();
            this.changeCaps();
            this.changeKeys();
          }
          break;
        case 'ShiftLeft':
          if (!e.repeat) {
            key.keyDown();
            this.changeShift();
            this.changeKeys();
          }
          break;
        case 'ShiftRight':
          if (!e.repeat) {
            key.keyDown();
            this.changeShift();
            this.changeKeys();
          }
          break;
        case 'ControlLeft':
          if (e.altKey && !e.repeat) {
            this.changeLang();
            this.changeKeys();
          }
          key.keyDown();
          break;
        case 'AltLeft':
          if (e.ctrlKey && !e.repeat) {
            this.changeLang();
            this.changeKeys();
          }
          key.keyDown();
          break;
        default:
          key.keyDown(this.target);
      }
      e.preventDefault();
    }
  }

  keyupHandler(e) {
    const keyId = e.code;
    if (keyId in this.keys) {
      const key = this.keys[keyId];
      switch (keyId) {
        case 'CapsLock':
          break;
        case 'ShiftLeft':
          key.keyUp();
          this.changeShift();
          this.changeKeys();
          break;
        case 'ShiftRight':
          key.keyUp();
          this.changeShift();
          this.changeKeys();
          break;
        default:
          key.keyUp();
      }
      e.preventDefault();
    }
  }

  changeLang() {
    this.lang = this.lang === 'ru' ? 'en' : 'ru';
  }

  changeCaps() {
    this.caps = this.caps !== true;
  }

  changeShift() {
    this.shift = this.shift !== true;
  }

  changeKeys() {
    if (this.caps && !this.shift) {
      Object.keys(this.keys)
        .forEach((k) => {
          this.keys[k].$element.textContent = this.keys[k].keyObj[this.lang].capsAndKey;
        });
    }
    if (!this.caps && this.shift) {
      Object.keys(this.keys)
        .forEach((k) => {
          this.keys[k].$element.textContent = this.keys[k].keyObj[this.lang].shiftAndKey;
        });
    }
    if (this.caps && this.shift) {
      Object.keys(this.keys)
        .forEach((k) => {
          this.keys[k].$element.textContent = this.keys[k].keyObj[this.lang].shiftAndKey;
        });
    }
    if (!this.caps && !this.shift) {
      Object.keys(this.keys)
        .forEach((k) => {
          this.keys[k].$element.textContent = this.keys[k].keyObj[this.lang].key;
        });
    }
  }
}

export default Keys;
