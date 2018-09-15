export default (me = 0, action) => {  // 현재 팝업된 me page의 seq
	switch (action.type) {
		case "OPEN_ME_PAGE": case "CLOSE_ME_PAGE":
			return action.me;
		default:
			return me;
	}
}