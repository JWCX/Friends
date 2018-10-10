import React, { Component } from 'react';
import _ from 'lodash';

import { UserContact } from 'containers';

export class Contacts extends Component {

	render() {
		const { id,
				contacts,
				openChatbox,
				handleOpenChatbox,
				handleMessageRead } = this.props;
		return (
			_.map(contacts, contact => {
				return (
					<div key={contact.id}>
						<UserContact
							id={contact.id}
							currentid={id}
							roomid={contact.roomid}
							nickName={contact.nickName}
							image={contact.image}
							online={contact.online}
							openChatbox={openChatbox}
							handleOpenChatbox={handleOpenChatbox}
							handleMessageRead={handleMessageRead}>
						</UserContact>
					</div>
				)
			})
		)
	}
}

export default Contacts;