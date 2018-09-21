import { combineReducers } from 'redux';

import dataInterest from './dataInterestReducer';
import dataSi from './dataSiReducer';
import dataGu from './dataGuReducer';

import token from './tokenReducer';
import myInfo from './myInfoReducer';
import myFriends from './myFriendsReducer';

import me from './meReducer';
import meFriends from './meFriendsReducer';
import meGroups from './meGroupsReducer';

import mainUsers from './mainUsersReducer';
import mainGroups from './mainGroupsReducer';

import contacts from './contactsReducer';
import messages from './messagesReducer';

import notifications from './notificationsReducer';

export default combineReducers({
	dataInterest, 	// 관심사 데이터
	dataSi, 	// 시 데이터
	dataGu,	 	// 구 데이터

	token,		// 로그인한 유저의 seq
	myInfo, 	// 로그인한 유저의 정보
	myFriends,	// 내친구 정보(simple, 채팅추가시 셀렉메뉴에 들어갈 데이터)

	me,			// me페이지 접근시 해당 유저의 정보
	meFriends, 	// me페이지 접근시 해당 유저(또는 자신)의 친구 리스트
	meGroups,	// me페이지 접근시 해당 유저(또는 자신)의 그룹 리스트

	mainUsers,	// 메인페이지 유저 추천/검색목록 리스트
	mainGroups, // 메인페이지 그룹 추천/검색목록 리스트

	contacts, // 메신저 리스트
	messages, // 메세지 리스트

	notifications,
});