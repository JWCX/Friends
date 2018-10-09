import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';
import moment from 'moment';

import { ChatBubble, ChatBubbleMe } from 'components';

const StyledChatBox = styled.div`
	position: absolute;
	/* background: rgba(100,100,100,0.1); */
	height: 93.8%;
	width: 100%;
	overflow: auto;
	overflow-x: hidden;
`

class Chatbox extends Component {
	scrollToBottom = behavior => {
		this.messagesEnd.scrollIntoView({ behavior: behavior });
	}
	componentDidMount() {
		this.scrollToBottom("instant");
	}
	componentDidUpdate() {
		this.scrollToBottom("instant");
	}
	shouldComponentUpdate(nextProps) {
		if(this.props.messages !== nextProps.messages ||
			this.props.myInfo !== nextProps.myInfo ||
			this.props.contacts !== nextProps.contacts ||
			this.props.roomid !== nextProps.roomid ||
			this.props.token !== nextProps.token)
			return true;
		return false;
	}
	render() {
		const { messages, token, id, roomid, myInfo, contacts } = this.props;
		return (
			<StyledChatBox>
				{
					_.filter(messages, message => message.roomid == roomid)
					.map(message => {
						if(message.id == token)
							return <ChatBubbleMe
								key={message.messageid}
								time={moment(message.writedate).fromNow()}
								nickName={myInfo.nickName}
								avatar={myInfo.images[0]}
								msg={message.message}
								width={240}/>
						else
							return <ChatBubble
								key={message.messageid}
								msg={message.message}
								time={moment(message.writedate).fromNow()}
								avatar={contacts[message.id].image}
								nickName={contacts[message.id].nickName}
								width={240}/>
					})
				}
				<div style={{ float:"left", clear: "both" }}
					ref={(el) => { this.messagesEnd = el; }}>
				</div>
			</StyledChatBox>
		)
	}
}

const mapStateToProps = state => ({
	messages: state.messages,
	token: state.token,
	myInfo: state.myInfo,
	contacts: state.contacts
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);
