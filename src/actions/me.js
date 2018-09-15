export const openMePage = me => ({
	type: "OPEN_ME_PAGE",
	me: me,
});

export const closeMePage = () => ({
	type: "CLOSE_ME_PAGE",
	me: 0,
});

export const updateMyInfo = myInfo => ({
	type: "UPDATE_MY_INFO",
	myInfo: myInfo,
})