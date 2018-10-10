export const updateContacts = (currentContacts, newContacts) => ({
	type: "UPDATE_CONTACTS",
	contacts: {...currentContacts, ...newContacts}
})

export const receivedMessage = (currentMessages, newMessage) => {
	return { type: "RECEIVED_MESSAGE", messages: {...currentMessages, ...newMessage} }
}
export const readMessage = (currentMessages, newMessage) => {
	return { type: "READ_MESSAGE", messages: {...currentMessages, ...newMessage} }
}