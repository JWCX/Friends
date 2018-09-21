import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ChatInput } from 'components';
import { ChatBox } from 'containers';

export class ChatRoom extends Component {
	state = {
		inputMessage: "",
	}
	handleChange = ({target}) => {
		this.setState({inputMessage: target.value});
	}
	// handleKeyPress = e => {
	// 	if(this.state.inputMessage !== "" && e.which === 13)
	// 		this.handleSubmit();
	// 	}
	handleSubmit = e => {
		e && e.preventDefault();
		if(this.state.inputMessage) {
			//TODO: MESSAGE 전송
			const messageData = {
				roomid: this.props.roomid,
				id: this.props.id,
				token: this.props.token,
				message: this.state.inputMessage
			}
			console.log("messageDATA", messageData);
			this.props.sendMessage(messageData);
			this.setState({inputMessage:""})
		}
	}

	render() {
		const { inputMessage } = this.state;
		const { roomid, id } = this.props;
		return (
			<React.Fragment>
				<ChatBox
					roomid={roomid}
					id={id}/>
				<ChatInput
					id="inputMessage"
					value={inputMessage}
					onChange={this.handleChange}
					// handleKeyPress={this.handleKeyPress}
					handleSubmit={this.handleSubmit}/>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => ({
	token: state.token
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);