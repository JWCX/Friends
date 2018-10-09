export default (groupMembers = {}, action) => {
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