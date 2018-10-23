import moment from 'moment';

export default (group = null, action) => {  // 현재 팝업된 group page의 유저정보
// export default (group = {
// 	id: 1,
//     groupName: "토요조기축구",
//     master: {
//         id: 1,
//         nickName: "지도좀봐라",
//     },
//     interests: [1,2,3],
//     estDate: new Date(),
//     memberCnt: 5,
//     maxMember: 300,
//     minAge: 20,
//     maxAge: 40,
//     avgAge: 30,
//     gender: 1,
//     si: 0,
//     gu: 0,
//     intro: "TESTING MPAPAAP",
// 	images: ["http://picsum.photos/500/300", "http://picsum.photos/500/301", "http://picsum.photos/500/302"],
// 	isMyGroup: 2
// }, action) => {  // 현재 팝업된 group page의 유저정보
	switch (action.type) {
		case "OPEN_GROUP_PAGE":
			const estDate = moment(action.group.estDate).format("YYYY. M. D");
			return {...action.group, estDate};
		case "UPDATE_GROUP_PAGE":
		case "CLOSE_GROUP_PAGE":
			return action.group;
		default:
			return group;
	}
}