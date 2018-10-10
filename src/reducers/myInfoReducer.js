import moment from 'moment';

export default (myInfo = {
	id: "",
	nickName: "a",
	si: 0,
	gu: 0,
	birth: null,
	age: 0,
	gender: "0",
	intro: "",
	msg: "",
	images: [],
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