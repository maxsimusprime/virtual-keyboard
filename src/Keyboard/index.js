import createElementFromHTML from '../utils/createElementFromHTML';
import KeyboardHTML from './index.html';
import './index.scss';
import Textarea from '../components/Textarea';
import Footer from './components/Footer';
import Keys from '../Keys';

const keyboard = createElementFromHTML(KeyboardHTML);
const textarea = new Textarea();
const footer = Footer();
const keys = new Keys(textarea);

keyboard.appendChild(textarea.$element);
keyboard.appendChild(keys.$element);
keyboard.appendChild(footer);

document.addEventListener('keydown', (e) => { keys.keydownHandler(e); });
document.addEventListener('keyup', (e) => { keys.keyupHandler(e); });

export default keyboard;
