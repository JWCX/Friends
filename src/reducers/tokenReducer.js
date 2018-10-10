export default (token = 1, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.token;
		case "USER_LOGGED_OUT":
			return 0;
		default:
			return token;
	}
}