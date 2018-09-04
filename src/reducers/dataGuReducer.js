export default (dataGu = {}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.dataGu;
		default:
			return dataGu;
	}
}