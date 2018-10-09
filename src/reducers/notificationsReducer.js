export default (notifications = {
	1: { notification: 1, gubun: 0, id: 1, nickName:"제발요", image:"http://picsum.photos/100/100", message: "제발 받아주셍..", receiveyn: false, writedate: new Date() },
	2: { notification: 2, gubun: 1, id: 5, nickName:"제발요", groupId:1, groupName:"토요조기축구", image:"http://picsum.photos/100/101", message: "제발 받아주셍..", receiveyn: false, writedate: new Date() },
	3: { notification: 3, gubun: 0, id: 5, nickName:"제발요", image:"http://picsum.photos/100/102", message: "제발 받아주셍..", receiveyn: false, writedate: new Date() },
	4: { notification: 4, gubun: 1, id: 5, nickName:"제발요", groupId:1, groupName:"토요조기축구",image:"http://picsum.photos/100/103", message: "그룹점.. 제발 받아주셍..", receiveyn: false, writedate: new Date() },
	5: { notification: 5, gubun: 0, id: 5, nickName:"제발요", image:"http://picsum.photos/100/104", message: "제발 받아주셍..", receiveyn: false, writedate: new Date() },
	6: { notification: 6, gubun: 0, id: 5, nickName:"제발요", image:"http://picsum.photos/100/105", message: "제발 받아주셍..", receiveyn: false, writedate: new Date() },
	7: { notification: 7, gubun: 1, id: 5, nickName:"제발요1", groupId:1, groupName:"토요조기축구", image:"http://picsum.photos/100/106", message: "제발 받아주셍..", receiveyn: false, writedate: new Date() },
	8: { notification: 8, gubun: 2, id: 5, nickName:"제발요2", image:"http://picsum.photos/100/106", message: "제발 받아주셍..", receiveyn: false, writedate: new Date() },
	9: { notification: 9, gubun: 2, id: 5, nickName:"제발요3", image:"http://picsum.photos/100/106", message: "제발 받아주셍..", receiveyn: false, writedate: new Date() },
	10: { notification: 10, gubun: 3, id: 5, nickName:"제발요4", groupId:1, groupName:"토요조기축구", image:"http://picsum.photos/100/106", message: "제발 받아주셍..", receiveyn: false, writedate: new Date() },
	11: { notification: 11, gubun: 3, id: 5, nickName:"제발요4", groupId:1, groupName:"토요조기축구", image:"http://picsum.photos/100/106", message: "제발 받아주셍..", receiveyn: false, writedate: new Date() },
	12: { notification: 12, gubun: 3, id: 5, nickName:"제발요4", groupId:1, groupName:"토요조기축구", image:"http://picsum.photos/100/106", message: "제발 받아주셍..", receiveyn: false, writedate: new Date() },
	13: { notification: 13, gubun: 3, id: 5, nickName:"제발요4", groupId:1, groupName:"토요조기축구", image:"http://picsum.photos/100/106", message: "제발 받아주셍..", receiveyn: false, writedate: new Date() },
	14: { notification: 14, gubun: 3, id: 5, nickName:"제발요4", groupId:1, groupName:"토요조기축구", image:"http://picsum.photos/100/106", message: "제발 받아주셍..", receiveyn: false, writedate: new Date() },
	15: { notification: 15, gubun: 3, id: 5, nickName:"제발요4", groupId:1, groupName:"토요조기축구", image:"http://picsum.photos/100/106", message: "제발 받아주셍..", receiveyn: false, writedate: new Date() },
}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
		case "RECEIVED_NOTIFICATION":
		case "REMOVE_NOTIFICATION":
			return action.notifications;
		default:
			return notifications;
	}
}