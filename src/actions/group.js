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

export const updateGroupPosts = posts => ({
	type: "UPDATE_GROUP_POSTS",
	groupPosts: posts
})
export const clearGroupPosts = () => ({
	type: "CLEAR_GROUP_POSTS",
	groupPosts: null
})