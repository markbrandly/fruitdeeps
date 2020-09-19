import React from 'react';
import ReactDOM from 'react-dom';
import Attacker from './components/Attacker.js';
import Defender from './components/Defender.js';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers/reducer.js';

import '../scss/_reset.scss';
import '../scss/main.scss';

const store = createStore(
	reducer
)


ReactDOM.render(<Provider store={store}><Attacker /></Provider>, document.getElementById('Player'));
ReactDOM.render(<Provider store={store}><Defender /></Provider>, document.getElementById('Monster'));