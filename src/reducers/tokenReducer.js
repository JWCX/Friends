export default (token = null, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.token;
		case "USER_LOGGED_OUT":
			return 0;
		default:
			return token;
	}
}