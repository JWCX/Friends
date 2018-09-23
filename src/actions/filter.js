export const updateFilter = (filter, currentFilter = {}) => ({
	type: "UPDATE_FILTER",
	filter: { ...currentFilter, ...filter }
})
export const clearFilter = () => ({
	type: "CLEAR_FILTER",
	// filter: null
})

export const setFiltering = (filtering) => ({
	type: "SET_FILTERING",
	filtering: filtering
})
