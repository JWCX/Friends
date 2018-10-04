import moment from 'moment';

// export default (group = null, action) => {  // 현재 팝업된 group page의 유저정보
export default (group = {
	id: 1,
	groupName: "토요조기축구",
	master : { id:1, nickName: "김슛돌" },
	si: 1,
	gu: 1,
	minAge: 1,
	maxAge: 100,
	gender: 1,
	intro: "헬로월드입니다헬로로입헬로월드입니다헬로로입니다헬로월드입니다헬로월드입니다헬로로입니다헬로월드입니다헬로월드입니다헬로로입니다헬로월드입니다니다헬로월드입니다",
	images: ["http://picsum.photos/500/300", "http://picsum.photos/500/300"],
	interests: [1,2,3,4,3],
	estDate : moment("1990. 11. 1", "YYYY. M. D"),
	memberCnt : 10,
	maxMember : 250,
	avgAge : 25,
	isMyGroup: 0,
}, action) => {  // 현재 팝업된 group page의 유저정보
	switch (action.type) {
		case "OPEN_GROUP_PAGE":
			const estDate = moment(action.group.estDate, "YYYY. M. D");
			return {...action.group, estDate};
		case "UPDATE_GROUP_PAGE":
		case "CLOSE_GROUP_PAGE":
			return action.group;
		default:
			return group;
	}
}