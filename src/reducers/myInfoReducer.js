import moment from 'moment';

export default (myInfo = {
	id: "",
	nickName: "aa",
	si: 0,
	gu: 0,
	birth: null,
	age: 25,
	gender: "1",
	intro: "",
	msg: "",
	images: ["http://picsum.photos/100/100"],
	interests: [],
	areayn: false,
	birthyn: false,
	genderyn: false,
	friendsyn: false,
	groupsyn: false
}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
		case "UPDATE_MY_INFO":
			const birth = moment(action.myInfo.birth, "YYYY. M. D");
			// return {...action.myInfo, birth};
			return {...myInfo, ...action.myInfo, birth};
		default:
			return myInfo;
	}
}