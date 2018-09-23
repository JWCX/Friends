export default (filter = {
	interest: "",
	si: "",
	gu: "",
	gender: "0",
	minAge: 0,
	maxAge: 100,
	keyword: "",
}, action) => {
	switch (action.type) {
		case "UPDATE_FILTER":
			return action.filter;
		case "CLEAR_FILTER":
			return { interest: "", si: "", gu: "", gender: "0", minAge: 0, maxAge: 100, keyword: "" };
		default:
			return filter;
	}
}