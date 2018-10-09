export default (popularGroups = {}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.popularGroups;
		default:
			return popularGroups;
	}
}