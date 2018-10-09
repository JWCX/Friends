export const userLoggedIn = data => ({
	type: "USER_LOGGED_IN",
	dataSi: data.dataSi,	// 전체 지역(시) 데이터
	dataGu: data.dataGu,	// 전체 지역(구) 데이터
	dataInterest: data.dataInterest,	// 전체 관심사 데이터
	token: data.token,			// 내 key
	myInfo: data.myInfo,		// 내정보
	myFriends: data.myFriends,	// 내 친구들 전체목록 (simple data, contact 추가시 사용됨)
	contacts: data.contacts,	// 채팅리스트에 등록된 친구들
	messages: data.messages,	// 채팅 메세지
	notifications: data.notifications,	// 알림 리스트
	popularUsers: data.popularUsers,	// 인기 유저 리스트
	popularGroups: data.popularGroups,	// 인기 그룹 리스트
	popularPosts: data.popularPosts,	// 인기 게시글 리스트
});
export const userLoggedOut = () => ({
	type: "USER_LOGGED_OUT",
	token: 0,
});