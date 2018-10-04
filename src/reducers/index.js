import { combineReducers } from 'redux';

import dataInterest from './dataInterestReducer';
import dataSi from './dataSiReducer';
import dataGu from './dataGuReducer';

import token from './tokenReducer';
import myInfo from './myInfoReducer';
import myFriends from './myFriendsReducer';

import group from './groupReducer';
import groupMembers from './groupMembersReducer';
import groupPosts from './groupPostsReducer';

import me from './meReducer';
import meFriends from './meFriendsReducer';
import meGroups from './meGroupsReducer';

import mainPosts from './mainPostsReducer';
import mainUsers from './mainUsersReducer';
import mainGroups from './mainGroupsReducer';

import contacts from './contactsReducer';
import messages from './messagesReducer';

import notifications from './notificationsReducer';

import filter from './filterReducer';
import filtering from './filteringReducer';

import nextPageNum from './nextPageNumReducer';
import hasMorePages from './hasMorePagesReducer';

export default combineReducers({
	dataInterest, 	// 관심사 데이터
	dataSi, 	// 시 데이터
	dataGu,	 	// 구 데이터

	token,		// 로그인한 유저의 seq
	myInfo, 	// 로그인한 유저의 정보
	myFriends,	// 내친구 정보(simple, 채팅추가시 셀렉메뉴에 들어갈 데이터)

	group,			// group페이지 접근시 해당 그룹의 정보
	groupMembers,	// group페이지 접근시 해당 그룹의 멤버 리스트
	groupPosts,		// group페이지 접근시 해당 그룹의 게시글 리스트

	me,			// me페이지 접근시 해당 유저의 정보
	meFriends, 	// me페이지 접근시 해당 유저(또는 자신)의 친구 리스트
	meGroups,	// me페이지 접근시 해당 유저(또는 자신)의 그룹 리스트

	mainPosts,	// 메인페이지 게시판 게시글 리스트
	mainUsers,	// 메인페이지 유저 추천/검색목록 리스트
	mainGroups, // 메인페이지 그룹 추천/검색목록 리스트

	nextPageNum, 	// 다음 AJAX요청시 받아와야 할 메인페이지 컨텐츠의 페이지 번호
	hasMorePages,	// 메인페이지 컨텐츠 관련 DB에 더 읽어올 정보가 있는지 여부

	contacts, // 메신저 리스트
	messages, // 메세지 리스트

	notifications,	// 알림 리스트

	filter,	// 필터 옵션
	filtering, // 현재 출력값에 필터링을 적용 한 것인지 여부(true=필터링, false=추천친구||그룹)
});