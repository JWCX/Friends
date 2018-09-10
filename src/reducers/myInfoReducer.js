import moment from 'moment';

export default (myInfo = {
	id: "jw.chox@gmail.com",
	nickName: "",
	si: "",
	gu: "",
	birth: moment("2000. 1. 1", "YYYY. M. D"),
	age: "",
	gender: "",
	intro: "",
	msg: "",
	images: [],
	interests: [],
	expLocation: 0,
	expBirth: 0,
	expAge: 0,
	expGender: 0,
	expFriends: 0,
	expGroups: 0
}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
		 	const birth = moment(action.myInfo.birth, "YYYY. M. D");
			return {...action.myInfo, birth};
		default:
			return myInfo;
	}
}