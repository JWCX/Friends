export default (nextPageNum = 1, action) => {
	switch (action.type) {
		case "SET_NEXT_PAGE_NUM":
			return action.nextPageNum;
		default:
			return nextPageNum;
	}
}


