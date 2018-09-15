export default (meGroups = null, action) => {
	switch (action.type) {
		case "OPEN_ME_PAGE":
		case "CLOSE_ME_PAGE":
		case "UPDATE_ME_GROUPS":
		case "CLEAR_ME_GROUPS":
			return action.meGroups;
		default:
			return meGroups;
	}
}