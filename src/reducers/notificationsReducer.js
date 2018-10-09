export default (notifications = {}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
		case "RECEIVED_NOTIFICATION":
		case "REMOVE_NOTIFICATION":
			return action.notifications;
		default:
			return notifications;
	}
}