export default (token = "", action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.token;
		default:
			return token;
	}
}