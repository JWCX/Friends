import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import SockJsClient from 'react-stomp';
import styled from 'styled-components';

import { receivedMessage, receivedNotification } from 'actions';
import { AppBar,
		Messenger } from 'containers'; // FIXME: pages MUST IMPORT containers ONLY!! THIS IS FOR TESTING
import {
		Popular,
		Board,
		Users,
		Groups,
		Me,
	} from 'pages';

const Container = styled.div`
	display: flex;
	flex-flow: row;
	width: 90vw;
	margin-left: 5vw;
`
const OuterContentContainer = styled.div`
	/* background: rgba(255,0,0,0.1); */
	position: relative;
	height: 87vh;
	overflow: auto;
	width: 1000px;
	margin: 15px 5px 0 5px;
	border-radius: 10px;
	padding: 10px;
	/* flex-grow: ${props => props.grow}; */
	transition: flex-grow 300ms linear;
	box-shadow: 0 1px 10px -1px rgb(120,120,120);
`
const OuterChatContainer = styled.div`
	/* background: rgba(255,0,0,0.1); */
	position: relative;
	height: 87vh;
	width: 460px;
	margin: 15px 5px 0 5px;
	border-radius: 10px;
	/* flex-grow: ${props => props.grow}; */
	padding: 0 2px;
	transition: flex-grow 300ms linear;
	box-shadow: 0 1px 10px -1px rgb(120,120,120);
`
class Main extends Component {
	state = {
		index: 0,	// 현재 Tab의 index. 0:Main, 1:Board, 2:Users, 3:Group
		openMessenger: false,	// true시 메신저 활성화
		left: 10,
		right: 0.0000001,
	}

	componentDidMount() {
		if(!this.props.location.pathname.match('/[a-z]+'))
			return this.setState({index:0});
		switch(this.props.location.pathname.match('/[a-z]+').toString()) {	// 새로고침시 Tab Index설정
			case "/board":	return this.setState({index: 1});
			case "/users":	return this.setState({index: 2});
			case "/groups":	return this.setState({index: 3});
			default: return this.setState({index: 0});
		}
	}
	handleChangeTab = (e, index) => {
		this.setState({index});
		switch(index) {
			case 0:
				return this.props.history.push("/");
			case 1:
				return this.props.history.push("/board");
			case 2:
				return this.props.history.push("/users");
			case 3:
				return this.props.history.push("/groups");
			default:
		}
	}
	handleToggleMessenger = () => {
		console.log(this.state);
		if(this.state.openMessenger)
			this.setState({
				openMessenger: false,
				left: 10,
				right: 0.0000001,
			});
		else
			this.setState({
				openMessenger: true,
				left: 10,
				right:5
			});
	}
	onMessageReceive = (msg, topic) => {
		console.log("MSG RECEIVED!!", msg);
		console.log("MSG RECEIVED!!", topic);
		switch(msg.type) {
			case "message":
				this.props.receivedMessage(this.props.messages, {[msg.message.messageid]: msg.message});
				break;
			case "notification":
				console.log("CURRENT NOTIFI : ", this.props.notifications)
				console.log("NEXT NOTIFI : ", {[msg.notification.notification]: msg.notification})
				this.props.receivedNotification(this.props.notifications, {[msg.notification.notification]: msg.notification});
				break;
			default: console.log("RECIEVED UNKNOWN MESSAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		}
	}
	sendMessage = data => {
		this.clientRef.sendMessage("/app/message", JSON.stringify(data));
	}

	render() {
		console.log("NOTIFIIIIIIIIIIIIIIIIIIIIIIIIIIIIIC", this.props.notifications);
		const { index, openMessenger } = this.state;
		const { me, token } = this.props;
		return (
			<React.Fragment>
				<Route path="(/|/board|/users|/groups|/me|/group)" render={() =>
					<React.Fragment>
						<SockJsClient
							url="http://192.168.0.200:8080/chat"
							topics={[`/topic/${token}`]}
							onMessage={this.onMessageReceive}
							onConnect={ () => console.log("CONNECTTTA") }
							subscribeHeaders
							ref={client => this.clientRef = client}/>
						<AppBar
							position="sticky"
							index={index}
							handleChangeTab={this.handleChangeTab}
							handleToggleMessenger={this.handleToggleMessenger}/>
					</React.Fragment>
					}/>
				<Container>
					<OuterContentContainer>
						<Switch>
							<Route path="/board" render={() =>
								<Board/>
							}/>
							<Route path="/users" render={() =>
								<Users/>
							}/>
							<Route path="/groups" render={() =>
								<Groups/>
							}/>
							<Route path="/" render={() =>
								<Popular/>
							}/>
						</Switch>
					</OuterContentContainer>
					<OuterChatContainer>
						<Messenger open={openMessenger}
							sendMessage={this.sendMessage}
							onMessageReceive={this.onMessageReceive}/>
					</OuterChatContainer>
				</Container>
				<Route path="(|/board|/users|/groups)/me/:id" render={() =>
					<Me
					open={true}
					// open={me}
					disableBackdrop={true}/>
				}/>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	me: state.me,
	messages: state.messages,
	notifications: state.notifications,
	token: state.token
})
const mapDispatchToProps = {
	receivedMessage,
	receivedNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
