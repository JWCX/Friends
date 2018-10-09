export const setGroupNextPageNum = nextPageNum => ({
	type: "SET_GROUP_NEXT_PAGE_NUM",
	nextPageNum
})
export const setGroupHasMorePages = hasMorePages => ({
	type: "SET_GROUP_HAS_MORE_PAGES",
	hasMorePages
})

export const openGroupPage = data => ({
	type: "OPEN_GROUP_PAGE",
	group: data.group,
	groupMembers: data.members,
	groupPosts: data.posts,
});
export const updateGroupPage = group => ({
	type: "UPDATE_GROUP_PAGE",
	group: group,
});
export const closeGroupPage = () => ({
	type: "CLOSE_GROUP_PAGE",
	group: null,
	groupMembers: null,
	groupPosts: null,
});

export const updateGroupMembers = members => ({
	type: "UPDATE_GROUP_MEMBERS",
	groupMembers: members
})
export const clearGroupMembers = () => ({
	type: "CLEAR_GROUP_MEMBERS",
	groupMembers: null
})



export const getGroupPosts = posts => ({
	type: "GET_GROUP_POSTS",
	groupPosts: posts
})
export const updateGroupPosts = (currentPosts, posts) => ({
	type: "UPDATE_GROUP_POSTS",
	groupPosts: { ...currentPosts, ...posts }
})
export const clearGroupPosts = () => ({
	type: "CLEAR_GROUP_POSTS",
	groupPosts: null
})