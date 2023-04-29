import createElementFromHTML from '../utils/createElementFromHTML';
import KeysHTML from './index.html';
import './index.scss';
// import keysObj from './keys.json';

const Keys = createElementFromHTML(KeysHTML);

export default Keys;
