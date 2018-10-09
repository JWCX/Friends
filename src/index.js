import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

require('dotenv').config();

const render = () => {
	ReactDOM.render(
		<AppContainer>
			<App/>
		</AppContainer>,
		document.getElementById('react')
	)
}

render();

if (module.hot) {
	module.hot.accept('./App', () => { render() });
}

// if (process.env.NODE_ENV !== 'production') {
// 	const {whyDidYouUpdate} = require('why-did-you-update');
// 	whyDidYouUpdate(React);
// }