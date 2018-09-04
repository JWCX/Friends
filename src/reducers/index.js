import { combineReducers } from 'redux';

import dataInterest from './dataInterestReducer';
import dataSi from './dataSiReducer';
import dataGu from './dataGuReducer';
import token from './tokenReducer';

export default combineReducers({
	dataInterest,
	dataSi,
	dataGu,
	token,
});