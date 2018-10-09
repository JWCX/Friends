import moment from 'moment';

export default (group = {}, action) => {  // 현재 팝업된 group page의 유저정보
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