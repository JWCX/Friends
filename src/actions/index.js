import { userLoggedIn, userLoggedOut } from './login';
import { getPopularPosts } from './popular';
import {
	setGroupNextPageNum,
	setGroupHasMorePages,
	openGroupPage,
	updateGroupPage,
	closeGroupPage,
	updateGroupMembers,
	clearGroupMembers,
	getGroupPosts,
	updateGroupPosts,
	clearGroupPosts,
} from './group';
import {
	openMePage,
	updateMePage,
	closeMePage,
	updateMyInfo,
	updateMeFriends,
	updateMeGroups,
	clearMeFriends,
	clearMeGroups
} from './me';
import {
	setNextPageNum,
	setHasMorePages,
	getMainPosts,
	updateMainPosts,
	clearMainPosts,
	getMainUsers,
	updateMainUsers,
	clearMainUsers,
	getMainGroups,
	updateMainGroups,
	clearMainGroups
} from './main';
import {
	updateContacts,
	receivedMessage
} from './messenger';
import {
	receivedNotification,
	removeNotification
} from './notifications';
import {
	updateMyFriends
} from './myFriends';
import {
	updateFilter,
	clearFilter,
	setFiltering
} from './filter';

export {
	userLoggedIn,
	userLoggedOut,

	getPopularPosts,

	setGroupNextPageNum,
	setGroupHasMorePages,
	openGroupPage,
	updateGroupPage,
	closeGroupPage,
	updateGroupMembers,
	clearGroupMembers,
	getGroupPosts,
	updateGroupPosts,
	clearGroupPosts,

	updateMePage,
	openMePage,
	closeMePage,
	updateMyInfo,
	updateMeFriends,
	updateMeGroups,
	clearMeFriends,
	clearMeGroups,

	setNextPageNum,
	setHasMorePages,
	getMainPosts,
	updateMainPosts,
	clearMainPosts,
	getMainUsers,
	updateMainUsers,
	clearMainUsers,
	getMainGroups,
	updateMainGroups,
	clearMainGroups,

	updateContacts,
	receivedMessage,

	receivedNotification,
	removeNotification,

	updateMyFriends,

	updateFilter,
	clearFilter,
	setFiltering
}