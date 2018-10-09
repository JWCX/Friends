export default (nextPageNum = 2, action) => {
	switch (action.type) {
		case "SET_GROUP_NEXT_PAGE_NUM":
			return action.nextPageNum;
		default:
			return nextPageNum;
	}
}


