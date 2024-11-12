const getters = {
	token: state => state.user.token,
	avatar: state => state.user.avatar,
	name: state => state.user.name,
	phone: state => state.user.phone,
	inviteCode: state => state.user.inviteCode,
	H5Url: state => state.user.H5Url,
	acc: state => state.user.acc,
	adr: state => state.user.adr
}
export default getters