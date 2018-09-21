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