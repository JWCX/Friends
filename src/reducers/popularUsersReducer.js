export default (popularUsers = {
	1: { id: 1, nickName: "user1", image: "https://picsum.photos/210/300/?random", age: 23, gender: 2 },
	2: { id: 2, nickName: "user2", image: "https://picsum.photos/211/300/?random", age: 23, gender: 1 },
	3: { id: 3, nickName: "user3", image: "https://picsum.photos/212/300/?random", age: 23, gender: 1 },
	4: { id: 4, nickName: "user4", image: "https://picsum.photos/213/300/?random", age: 23, gender: 1 },
	5: { id: 5, nickName: "user5", image: "https://picsum.photos/214/300/?random", age: 23, gender: 1 },
	6: { id: 6, nickName: "user6", image: "https://picsum.photos/215/300/?random", age: 23, gender: 1 },
	7: { id: 7, nickName: "user7", image: "https://picsum.photos/216/300/?random", age: 23, gender: 1 },
	8: { id: 8, nickName: "user8", image: "https://picsum.photos/217/300/?random", age: 23, gender: 1 },
	9: { id: 9, nickName: "user9", image: "https://picsum.photos/218/300/?random", age: 23, gender: 1 },
	10: { id: 10, nickName: "user10", image: "https://picsum.photos/219/300/?random", age: 23, gender: 1 },
}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.popularUsers;
		default:
			return popularUsers;
	}
}