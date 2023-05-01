import createElementFromHTML from '../../utils/createElementFromHTML';
import KeyHTML from './index.html';
import './index.scss';

class Key {
  constructor(lang, keyObj) {
    this.keyObj = keyObj;
    this.$element = createElementFromHTML(KeyHTML);
    this.$element.id = keyObj.code;
    this.$element.classList.add(`key_size_${keyObj.size}`);
    this.$element.textContent = keyObj[lang].key;
  }

  keyDown(target) {
    if (target && !this.keyObj.actionkey) {
      target.write(this.$element.textContent);
    }
    if (target && this.keyObj.actionkey) {
      switch (this.$element.id) {
        case 'Backspace':
          target.backspace();
          break;
        case 'Tab':
          target.write('\t');
          break;
        case 'Delete':
          target.delete();
          break;
        case 'Enter':
          target.write('\n');
          break;
        default:
      }
    }
    this.$element.classList.add('key_active');
  }

  keyUp() {
    this.$element.classList.remove('key_active');
  }

  keyCaps() {
    this.$element.classList.toggle('key_active');
  }
}

export default Key;
