import { combineReducers } from 'redux';

import dataInterest from './dataInterestReducer';
import dataSi from './dataSiReducer';
import dataGu from './dataGuReducer';
import token from './tokenReducer';
import myInfo from './myInfoReducer';
import me from './meReducer';
import meFriends from './meFriendsReducer';
import meGroups from './meGroupsReducer';

export default combineReducers({
	dataInterest, 	// 관심사 데이터
	dataSi, 	// 시 데이터
	dataGu,	 	// 구 데이터
	token,		// 로그인한 유저의 seq
	myInfo, 	// 로그인한 유저의 정보
	me,			// me페이지 접근시 해당 유저의 정보
	meFriends, 	// me페이지 접근시 해당 유저(또는 자신)의 친구 리스트
	meGroups,	// me페이지 접근시 해당 유저(또는 자신)의 그룹 리스트
});