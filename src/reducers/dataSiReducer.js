export default (dataSi = {}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.dataSi;
		default:
			return dataSi;
	}
}