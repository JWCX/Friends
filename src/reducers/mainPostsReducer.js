export default (mainPosts = {}, action) => {
	switch (action.type) {
		case "GET_MAIN_POSTS":
		case "UPDATE_MAIN_POSTS":
			return action.mainPosts;
		case "CLEAR_MAIN_POSTS":
			return null;
		default:
			return mainPosts;
	}
}


