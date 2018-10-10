import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import _ from 'lodash';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';

import { updateContacts,
	readMessage } from 'actions';
import { Contacts,
	ChatRoom,
	NewContact } from 'containers';
import { Dialog } from 'components';
import { SquareAddIcon } from 'components/AppBarIcons';

const MessangerContainer = styled.div`
	position: absolute;
	height: 94%;
	/* width: 420px; */
	width: 94%;
	/* width: ${props => props.width}; */
	box-shadow: 0 1px 10px -1px rgb(150,150,150);
	border-radius: 5px;
	padding: 0 15px 15px 15px;
	/* margin: 0 0 0 15px; */
	left: 50%;
	transform: translateX(-50%);
	flex-grow: ${props => props.grow};
	transition: flex-grow 300ms linear;
`
const ContactsContainer = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	border-radius: 5px;
	/* width: ${props => props.openChatbox ? "100%" : "10%" }; */
	left: 0px;
	transition: all 0.2s ease-in-out;
	overflow: auto;
	/* background: rgb(230,230,230); */
	background: rgb(240,240,240);
	/* overflow: hidden; */
	/* padding: 10px; */
`
const ChatboxContainer = styled.div`
	position: absolute;
	height: 100%;
	width: ${props => props.openChatbox ? "355px" : "0px" };
	background: rgb(255,255,255);
	border-left: ${props => props.openChatbox ? "1px solid rgb(100,100,100)" : "none" };
	border-radius: 0 5px 5px 0;
	right: 0px;
	transition: all 0.2s ease-in-out;
	overflow:auto;
	/* padding: 10px; */
`

const MessangerHead = styled.div`
	height: 40px;
	margin: 0 5px;
	text-align: start;
`

class Messenger extends React.Component {
	state = {
		openChatbox: false,

		openNewContactDialog: false,
		selectedFriend: null,
		dialogDisabled: true,
		dialogProcess: false,

		dialogOpen: false,
		dialogTitle: "",
		dialogContent: "",
		dialogIcon: null,

		id: 0,
		roomid: 0,
	}
	handleOpenChatbox = (id, roomid) => {
		if(this.state.roomid === roomid)
			this.setState(state => ({
				id: 0, roomid: 0,
				openChatbox: !state.openChatbox
			}));
		else {
			this.setState({id, roomid, openChatbox: true});
			Axios.post(`${process.env.REACT_APP_DEV_API_URL}/message`, {
				token: this.props.token,
				roomid: roomid
			}).then(resp => {
				console.log(resp);	// FIXME: 지워주세용
				const originalMessages = {...this.props.messages};
				_.filter(originalMessages, message => message.roomid == roomid)
				.map(message => originalMessages[message.messageid] = {...message, readyn: 1});
				this.props.readMessage(originalMessages);
				this.setState({
					dialogOpen: true,
					dialogIcon: 1,
					dialogTitle: "가입이 완료되었습니다",
					dialogContent: "가입하신 이메일로 전송된 인증 메일을 확인해주세요!",
				});
			}).catch(err => {
				console.log(err.response);
				this.setState({
					dialogOpen: true,
					dialogIcon: 2,
					dialogTitle: "서버와 연결할 수 없습니다",
					dialogContent: "잠시후 다시 시도해주세요..",
				});
			}); // FIXME: REMOVE LOG
		}
	}
	handleSelectContactDialogOpen = () => {
		this.setState({openNewContactDialog: true});
	}
	handleSelectContactDialogClose = () => {
		this.setState({
			openNewContactDialog: false,
			dialogDisabled: true,
			selectedFriend: null
		});
	}
	handleSelectContact = value => {
		if(value.length === 0)
			this.setState({selectedFriend: value, dialogDisabled: true});
		else
			this.setState({selectedFriend: value, dialogDisabled: false});
	}
	handleAddContact = () => {
		this.setState({dialogProcess: true});

		Axios.post(`${process.env.REACT_APP_DEV_API_URL}/contact`, {
			token: this.props.token,
			id: this.state.selectedFriend.id
		}).then(resp => {
			console.log(resp);	// FIXME: 지워주세용
			this.setState({
				openNewContactDialog: false,
				selectedFriend: null,
				dialogDisabled: true,
				dialogProcess: false,

				dialogYnSubmit: null,
				dialogOpen: true,
				dialogIcon: 1,
				dialogContent: `채팅방을 개설했습니다! ${this.state.selectedFriend.nickName}님과 채팅을 시작해보세요!`,
			});
			this.props.updateContacts(this.props.contacts, resp.data.contacts);
		}).catch(err => {
			console.log(err.response);	// FIXME: REMOVE
			let errorTitle, errorMessage;
			// if(!err.response || !err.response.data) {
				errorTitle = "서버와 연결할 수 없습니다";
				errorMessage = "잠시후 다시 시도해 주세요...";
			// }
			// else {
			// 	errorTitle = err.response.data;
			// }
			this.setState({
				openNewContactDialog: false,
				selectedFriend: null,
				dialogDisabled: true,
				dialogProcess: false,

				dialogOpen: true,
				dialogIcon: 2,
				dialogTitle: errorTitle,
				dialogContent: errorMessage
			});
		}); // FIXME: REMOVE LOG

	}
	handleDialogClose = () => {
		this.setState({
			dialogOpen: false,
			dialogIcon: null,
			dialogTitle:"",
			dialogContent:""
		});
	}

	render() {
		const { openChatbox, id, roomid,
				openNewContactDialog, selectedFriend, dialogDisabled, dialogProcess,
				dialogOpen, dialogTitle, dialogContent, dialogIcon } = this.state;
		const { contacts, sendMessage, onMessageReceive } = this.props;
		console.log("contacts : ", this.props.contacts);
		return (
			<React.Fragment>
				<MessangerHead>
					<IconButton
						onClick={this.handleSelectContactDialogOpen}
						style={{ verticalAlign: "top",
								top: "50%",
								transform: "translateY(-50%)",
								width: "35px",
								height: "35px" }}>
						<SquareAddIcon/>
					</IconButton>
				</MessangerHead>
				<MessangerContainer>
					<ContactsContainer
						className="hide-scroll"
						openChatbox={!openChatbox}>
						<Contacts
							id={id}
							openChatbox={openChatbox}
							contacts={contacts}
							handleOpenChatbox={this.handleOpenChatbox}/>
					</ContactsContainer>
					<ChatboxContainer
						className="hide-scroll"
						openChatbox={openChatbox}>
						<ChatRoom
							// contacts={contacts}
							id={id}
							roomid={roomid}
							sendMessage={sendMessage}
							onMessageReceive={onMessageReceive}/>
					</ChatboxContainer>
					<NewContact open={openNewContactDialog}
						onSubmit={this.handleAddContact}
						selectedFriend={selectedFriend}
						handleSelectContact={this.handleSelectContact}
						onCancel={this.handleSelectContactDialogClose}
						disabled={dialogDisabled}
						process={dialogProcess}
						disableBackdrop/>
					<Dialog
						open={dialogOpen}
						onClose={this.handleDialogClose}
						title={dialogTitle}
						content={dialogContent}
						disableBackdrop={true}
						icon={dialogIcon}/>
				</MessangerContainer>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	token: state.token,
	contacts: state.contacts,
	messages: state.messages,
})
const mapDispatchToProps = {
	updateContacts,
	readMessage
}
export default connect(mapStateToProps, mapDispatchToProps)(Messenger);