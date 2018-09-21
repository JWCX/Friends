export default (messages = {}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
		case "RECEIVED_MESSAGE":
			return action.messages;
		default:
			return messages;
	}
}