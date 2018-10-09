export default (groupPosts = {}, action) => {
	switch (action.type) {
		case "OPEN_GROUP_PAGE":
		case "CLOSE_GROUP_PAGE":
		case "GET_GROUP_POSTS":
		case "UPDATE_GROUP_POSTS":
			return action.groupPosts;
		case "CLEAR_GROUP_POSTS":
			return null;
		default:
			return groupPosts;
	}
}