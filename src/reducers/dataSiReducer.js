export default (dataSi = {
	1:{code:1, name:"헬로월드"},
	2:{code:2, name:"헬월드"},
	3:{code:3, name:"헬월드"},
	4:{code:4, name:"헬월드"},
	5:{code:5, name:"헬월드"},
	6:{code:6, name:"헬월드"},
	7:{code:7, name:"헬월드"},
	8:{code:8, name:"헬월드"},
	9:{code:9, name:"헬월드"},
	10:{code:10, name:"헬월드"},
	11:{code:11, name:"헬월드"},
	12:{code:12, name:"헬월드"},
	13:{code:13, name:"헬월드"},
}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.dataSi;
		default:
			return dataSi;
	}
}