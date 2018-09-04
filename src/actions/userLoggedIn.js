export default (data) => ({
	type: "USER_LOGGED_IN",
	dataSi: data.dataSi,
	dataGu: data.dataGu,
	dataInterest: data.dataInterest,
	token: data.token,
});