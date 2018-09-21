export default (myFriends = {}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
		case "UPDATE_MY_FRIENDS":
			return action.myFriends;
		default:
			return myFriends;
	}
}