import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';

export default createStore(
	reducers,
	// compose(
	// 	applyMiddleware(),
	// 	window.devToolsExtension && window.devToolsExtension()
	// )
);
