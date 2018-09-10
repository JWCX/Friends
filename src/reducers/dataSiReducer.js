export default (dataSi = {1:{code:1, name:"헬로월드"},2:{code:2, name:"헬월드"}}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.dataSi;
		default:
			return dataSi;
	}
}