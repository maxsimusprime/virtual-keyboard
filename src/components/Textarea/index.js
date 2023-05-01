import createElementFromHTML from '../../utils/createElementFromHTML';
import TextareaHTML from './index.html';
import './index.scss';

class Textarea {
  constructor() {
    this.$element = createElementFromHTML(TextareaHTML);
  }

  write(char) {
    this.$element.focus();
    const { selectionStart, selectionEnd, value } = this.$element;
    if (selectionStart === selectionEnd) {
      const firstPart = value.substring(0, selectionStart);
      const secondPart = value.substring(selectionEnd);
      const newValue = firstPart + char + secondPart;
      this.$element.value = newValue;
      this.$element.selectionStart = selectionStart + 1;
      this.$element.selectionEnd = selectionStart + 1;
    }
  }

  backspace() {
    this.$element.focus();
    const { selectionStart, selectionEnd, value } = this.$element;
    if (selectionStart === selectionEnd) {
      const firstPart = value.substring(0, selectionStart - 1);
      const secondPart = value.substring(selectionEnd);
      const newValue = firstPart + secondPart;
      this.$element.value = newValue;
      this.$element.selectionStart = selectionStart - 1;
      this.$element.selectionEnd = selectionStart - 1;
    }
  }

  delete() {
    this.$element.focus();
    const { selectionStart, selectionEnd, value } = this.$element;
    if (selectionStart === selectionEnd) {
      if (selectionStart < value.length) {
        const firstPart = value.substring(0, selectionStart);
        const secondPart = value.substring(selectionStart + 1);
        const newValue = firstPart + secondPart;
        this.$element.value = newValue;
        this.$element.selectionStart = selectionStart;
        this.$element.selectionEnd = selectionStart;
      }
    }
  }
}

export default Textarea;
