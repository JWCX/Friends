export default (token = 1, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.token;
		default:
			return token;
	}
}