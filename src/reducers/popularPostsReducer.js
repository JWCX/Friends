export default (popularPosts = {}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
		case "GET_POPULAR_POSTS":
			return action.popularPosts;
		default:
			return popularPosts;
	}
}