export default (dataInterest = {
	1:{code: 1, name:"테스트1"},
	2:{code: 2, name:"테스트2"},
	3:{code: 3, name:"테스트3"},
	4:{code: 4, name:"테스트4"},
	5:{code: 5, name:"테스트5"},
	6:{code: 6, name:"테스트6"},
	7:{code: 7, name:"테스트7"},
	8:{code: 8, name:"테스트8"},
	9:{code: 9, name:"테스트9"},
	10:{code: 10, name:"테0스트"},
	11:{code: 11, name:"테1스트"},
	12:{code: 12, name:"테스3트"},
	13:{code: 13, name:"테스4트"},
	14:{code: 14, name:"테5스트"},
	15:{code: 15, name:"3테스트"},
	16:{code: 16, name:"테6스트"},
	17:{code: 17, name:"테7스트"},
	18:{code: 18, name:"테8스트"},
	19:{code: 19, name:"테1스트"},
	20:{code: 20, name:"테스2트"},
}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.dataInterest;
		default:
			return dataInterest;
	}
}