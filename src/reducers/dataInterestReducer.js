export default (dataInterest = {
	1:{code: 1, name:"등산"},
	2:{code: 2, name:"테스트2"},
	3:{code: 3, name:"테스트3"},
	4:{code: 4, name:"테스트4"},
	5:{code: 5, name:"테스트5"},
	6:{code: 6, name:"테스트6"},
	7:{code: 7, name:"테스트7"},
	8:{code: 8, name:"테스트8"},
	9:{code: 9, name:"테스트9"},
	10:{code: 10, name:"테스트10"},
	11:{code: 11, name:"테스트11"},
	12:{code: 12, name:"테스트12"},
	13:{code: 13, name:"테스트13"},
	14:{code: 14, name:"테스트14"},
	15:{code: 15, name:"테스트15"},
	16:{code: 16, name:"테스트16"},
}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.dataInterest;
		default:
			return dataInterest;
	}
}