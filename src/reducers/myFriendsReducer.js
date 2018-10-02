export default (myFriends = {
	0: {
	  id: 0,
	  nickName: "주먹감좌",
	  image: "https://picsum.photos/100/100"
	},
	1: {
	  id: 1,
	  nickName: "PotatoFist1",
	  image: "https://picsum.photos/100/101"
	},
	2: {
	  id: 2,
	  nickName: "PotatoFist2",
	  image: "https://picsum.photos/100/102"
	},
	3: {
	  id: 3,
	  nickName: "PotatoFist3",
	  image: "https://picsum.photos/100/103"
	},
	4: {
	  id: 4,
	  nickName: "PotatoFist4",
	  image: "https://picsum.photos/100/104"
	},
	5: {
	  id: 5,
	  nickName: "PotatoFist5",
	  image: "https://picsum.photos/100/105"
	},
	6: {
	  id: 6,
	  nickName: "PotatoFist6",
	  image: "https://picsum.photos/100/106"
	},
	7: {
	  id: 7,
	  nickName: "PotatoFist7",
	  image: "https://picsum.photos/100/107"
	},
	8: {
	  id: 8,
	  nickName: "PotatoFist8",
	  image: "https://picsum.photos/100/108"
	},
	9: {
	  id: 9,
	  nickName: "PotatoFist9",
	  image: "https://picsum.photos/100/109"
	},
	10: {
	  id: 10,
	  nickName: "PotatoFist10",
	  image: "https://picsum.photos/100/110"
	},
	11: {
	  id: 11,
	  nickName: "PotatoFist11",
	  image: "https://picsum.photos/100/111"
	},
	12: {
	  id: 12,
	  nickName: "PotatoFist12",
	  image: "https://picsum.photos/100/112"
	},
	13: {
	  id: 13,
	  nickName: "PotatoFist13",
	  image: "https://picsum.photos/100/113"
	},
	14: {
	  id: 14,
	  nickName: "PotatoFist14",
	  image: "https://picsum.photos/100/114"
	},
	15: {
	  id: 15,
	  nickName: "PotatoFist15",
	  image: "https://picsum.photos/100/115"
	},
	16: {
	  id: 16,
	  nickName: "PotatoFist16",
	  image: "https://picsum.photos/100/116"
	},
}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
		case "UPDATE_MY_FRIENDS":
			return action.myFriends;
		default:
			return myFriends;
	}
}