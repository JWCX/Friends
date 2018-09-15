export default (dataGu = {1:{1:{sicode:1, gucode:1, name:"테스팅"},
							2:{sicode:1, gucode:2, name:"테스트합시다"}},
							2:{1:{sicode:2, gucode:1, name:"테스터스"},
							2:{sicode:2, gucode:2, name:"초이스"}}}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.dataGu;
		default:
			return dataGu;
	}
}