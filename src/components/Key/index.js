import createElementFromHTML from '../../utils/createElementFromHTML';
import KeyHTML from './index.html';
import './index.scss';

class Key {
  constructor(lang, keyObj) {
    this.$element = createElementFromHTML(KeyHTML);
    this.$element.id = keyObj.code;
    this.$element.classList.add(`key_size_${keyObj.size}`);
    this.$element.textContent = keyObj[lang].key;
  }

  showId() {
    return this.$element.id;
  }

  keyDown() {
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
