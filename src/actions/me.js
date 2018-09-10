export const openMe = me => ({
	type: "OPEN_ME",
	me: me,
});

export const closeMe = () => ({
	type: "CLOSE_ME",
	me: 0,
});