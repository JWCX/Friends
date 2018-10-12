export default (hasMorePages = false, action) => {
	switch (action.type) {
		case "SET_GROUP_HAS_MORE_PAGES":
			return action.hasMorePages;
		default:
			return hasMorePages;
	}
}


