export const updateMyFriends = (newFriends) => {
	return {
		type: "UPDATE_MY_FRIENDS",
		myFriends: newFriends
	}
}