export default (mainGroups = null, action) => {
	switch (action.type) {
		case "GET_MAIN_GROUPS":
		case "UPDATE_MAIN_GROUPS":
			return action.mainGroups;
		case "CLEAR_MAIN_GROUPS":
			return null;
		default:
			return mainGroups;
	}
}


