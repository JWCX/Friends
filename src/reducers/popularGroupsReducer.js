export default (popularGroups = {
	1: { id: 1, groupName: "토요 조기 축구", image: "https://picsum.photos/500/300/?random" },
	2: { id: 2, groupName: "이태원 맛집 탐방", image: "https://picsum.photos/501/300/?random" },
	3: { id: 3, groupName: "기타등등",  image: "https://picsum.photos/500/301/?random" },
	4: { id: 4, groupName: "기타등등", image: "https://picsum.photos/501/301/?random" },
	5: { id: 5, groupName: "기타등등", image: "https://picsum.photos/502/301/?random" },
	6: { id: 6, groupName: "기타등등", image: "https://picsum.photos/502/302/?random" },
	7: { id: 7, groupName: "기타등등", image: "https://picsum.photos/502/303/?random" },
	8: { id: 8, groupName: "기타등등", image: "https://picsum.photos/502/304/?random" },
	9: { id: 9, groupName: "기타등등", image: "https://picsum.photos/502/305/?random" },
	10: { id: 10, groupName: "기타등등", image: "https://picsum.photos/502/306/?random" },
}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.popularGroups;
		default:
			return popularGroups;
	}
}