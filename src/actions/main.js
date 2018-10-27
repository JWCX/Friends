export const setNextPageNum = nextPageNum => ({
	type: "SET_NEXT_PAGE_NUM",
	nextPageNum
})
export const setHasMorePages = hasMorePages => ({
	type: "SET_HAS_MORE_PAGES",
	hasMorePages
})

export const getMainPosts = posts => ({
	type: "GET_MAIN_POSTS",
	mainPosts: posts || null,
})
export const updateMainPosts = (currentPosts, posts) => ({
	type: "UPDATE_MAIN_POSTS",
	mainPosts: { ...currentPosts, ...posts }
})
export const clearMainPosts = () => ({
	type: "CLEAR_MAIN_POSTS",
	mainPosts: null
})

export const getMainUsers = users => ({
	type: "GET_MAIN_USERS",
	mainUsers: users
})
export const updateMainUsers = (currentUsers, users) => ({
	type: "UPDATE_MAIN_USERS",
	mainUsers: { ...currentUsers, ...users }
})
export const clearMainUsers = () => ({
	type: "CLEAR_MAIN_USERS",
	mainUsers: null
})

export const getMainGroups = groups => ({
	type: "GET_MAIN_GROUPS",
	mainGroups: groups
})
export const updateMainGroups = (currentGroups, groups) => ({
	type: "UPDATE_MAIN_GROUPS",
	mainGroups: { ...currentGroups, ...groups }
})
export const clearMainGroups = () => ({
	type: "CLEAR_MAIN_GROUPS",
	mainGroups: null
})