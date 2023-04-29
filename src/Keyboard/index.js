import createElementFromHTML from '../utils/createElementFromHTML';
import KeyboardHTML from './index.html';
import './index.scss';
import Keys from '../Keys';

const keyboard = createElementFromHTML(KeyboardHTML);
keyboard.appendChild(Keys);

export default keyboard;
