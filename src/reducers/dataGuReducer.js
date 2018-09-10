export default (dataGu = {1:{1:{siCode:1, guCode:1, name:"테스팅"},
							2:{siCode:1, guCode:2, name:"테스트합시다"}},
							2:{1:{siCode:2, guCode:1, name:"테스터스"},
							2:{siCode:2, guCode:2, name:"초이스"}}}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.dataGu;
		default:
			return dataGu;
	}
}