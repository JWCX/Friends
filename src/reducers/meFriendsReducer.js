export default (meFriends = null, action) => {
	switch (action.type) {
		case "OPEN_ME_PAGE":
		case "CLOSE_ME_PAGE":
		case "UPDATE_ME_FRIENDS":
		case "CLEAR_ME_FRIENDS":
			return action.meFriends;
		default:
			return meFriends;
	}
}