export default (contacts = {}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
		case "UPDATE_CONTACTS":
			return action.contacts;
		default:
			return contacts;
	}
}


