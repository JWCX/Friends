export default (mainUsers = null, action) => {
	switch (action.type) {
		case "GET_MAIN_USERS":
		case "UPDATE_MAIN_USERS":
			return action.mainUsers;
		case "CLEAR_MAIN_USERS":
			return null;
		default:
			return mainUsers;
	}
}