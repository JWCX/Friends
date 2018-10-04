export default (groupMembers = {
	1: {
		id: 1, // key값
		nickName: "멤버1", // 닉네임
		gender: 1, // 성별
		image: "http://picsum.photos/100/100", // 이미지 url
		online: true // 접속중인지여부
	}
}, action) => {
	switch (action.type) {
		case "OPEN_GROUP_PAGE":
		case "CLOSE_GROUP_PAGE":
		case "UPDATE_GROUP_MEMBERS":
		case "CLEAR_GROUP_MEMBERS":
			return action.groupMembers;
		default:
			return groupMembers;
	}
}