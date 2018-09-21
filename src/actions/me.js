export const openMePage = data => ({
	type: "OPEN_ME_PAGE",
	me: data.me,
	meFriends: data.friends,
	meGroups: data.groups
});
export const updateMePage = me => ({
	type: "UPDATE_ME_PAGE",
	me: me,
});
export const closeMePage = () => ({
	type: "CLOSE_ME_PAGE",
	me: null,
	meFriends: null,
	meGroups: null
});
export const updateMyInfo = myInfo => ({
	type: "UPDATE_MY_INFO",
	myInfo: myInfo
})

export const updateMeFriends = friends => ({
	type: "UPDATE_ME_FRIENDS",
	meFriends: friends
})
export const clearMeFriends = () => ({
	type: "CLEAR_ME_FRIENDS",
	meFriends: null
})

export const updateMeGroups = groups => ({
	type: "UPDATE_ME_GROUPS",
	meGroups: groups
})
export const clearMeGroups = () => ({
	type: "CLEAR_ME_GROUPS",
	meGroups: null
})