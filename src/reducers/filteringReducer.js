export default (filtering = false, action) => {
	switch (action.type) {
		case "SET_FILTERING":
			return action.filtering;
		default:
			return filtering;
	}
}


