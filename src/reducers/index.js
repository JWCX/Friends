import { combineReducers } from 'redux';

import dataInterest from './dataInterestReducer';
import dataSi from './dataSiReducer';
import dataGu from './dataGuReducer';
import token from './tokenReducer';
import myInfo from './myInfoReducer';
import me from './meReducer';

export default combineReducers({
	dataInterest, // 관심사 데이터
	dataSi, // 시 데이터
	dataGu, // 구 데이터
	token,	// 로그인 유저 seq
	myInfo, // 로그인 유저 정보
	me,		//
});