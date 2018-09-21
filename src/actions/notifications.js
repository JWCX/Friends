export const receivedNotification = (currentNotifications, newNotification) => {
	return {
		type: "RECEIVED_NOTIFICATION",
		notifications: {...currentNotifications, ...newNotification}
	}
}
export const removeNotification = (currentNotifications, idOfNotificationToRemove) => {
	const current = {...currentNotifications};
	delete current[idOfNotificationToRemove];
	return {
		type: "REMOVE_NOTIFICATION",
		// notifications: {...currentNotifications, [idOfNotificationToRemove]: undefined}
		notifications: current
	}
}