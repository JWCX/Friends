export default (popularPostsIndex = [], action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.popularPostsIndex;
		default:
			return popularPostsIndex;
	}
}