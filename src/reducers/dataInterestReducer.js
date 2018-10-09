export default (dataInterest = {}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.dataInterest;
		default:
			return dataInterest;
	}
}