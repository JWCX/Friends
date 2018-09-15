export default (dataInterest = {
	1:{code: 1, name:"등산"},
	2:{code: 2, name:"테스트2"},
	3:{code: 3, name:"테스트3"},
	4:{code: 4, name:"테스트4"},
	5:{code: 5, name:"테스트5"},
	6:{code: 6, name:"테스트6"}
}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.dataInterest;
		default:
			return dataInterest;
	}
}