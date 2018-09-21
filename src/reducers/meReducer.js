import moment from 'moment';

export default (me = null, action) => {  // 현재 팝업된 me page의 유저정보
	switch (action.type) {
		case "OPEN_ME_PAGE":
			const birth = moment(action.me.birth, "YYYY. M. D");
			return {...action.me, birth};
		case "UPDATE_ME_PAGE":
		case "CLOSE_ME_PAGE":
			return action.me;
		default:
			return me;
	}
}