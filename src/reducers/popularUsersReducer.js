export default (popularUsers = {}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.popularUsers;
		default:
			return popularUsers;
	}
}