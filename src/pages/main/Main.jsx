import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import SockJsClient from 'react-stomp';
import styled from 'styled-components';
import moment from 'moment';

import { receivedMessage,
	receivedNotification,
	updateMyFriends } from 'actions';
import { AppBar,
		Messenger,
		Map } from 'containers';
import {
		Popular,
		Board,
		Users,
		Groups,
		Me,
		Group,
	} from 'pages';

const Container = styled.div`
	position: relative;
	display: flex;
	flex-flow: row;
	width: 1560px;
	left: 50%;
	transform: translateX(-50%);
	/* margin-left: 10vw; */
`
const OuterContentContainer = styled.div`
	/* background: rgba(255,0,0,0.1); */
	position: relative;
	height: 87vh;
	overflow: auto;
	width: 1100px;
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
		contentStyles: null,
	}

	componentDidMount() {
		moment.locale('kr', {
			months : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
			monthsShort : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
			monthsParseExact : true,
			weekdays : '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
			weekdaysShort : '일_월_화_수_목_금_토'.split('_'),
			weekdaysMin : '일_월_화_수_목_금_토'.split('_'),
			weekdaysParseExact : true,
			longDateFormat : {
				LT : 'HH:mm',
				LTS : 'HH:mm:ss',
				L : 'DD/MM/YYYY',
				LL : 'D MMMM YYYY',
				LLL : 'D MMMM YYYY HH:mm',
				LLLL : 'dddd D MMMM YYYY HH:mm'
			},
			calendar : {
				sameDay : '[Aujourd’hui à] LT',
				nextDay : '[Demain à] LT',
				nextWeek : 'dddd [à] LT',
				lastDay : '[Hier à] LT',
				lastWeek : 'dddd [dernier à] LT',
				sameElse : 'L'
			},
			relativeTime : {
				future : '%s',
				past : '%s 전',
				s : '방금',
				m : '일분',
				mm : '%d분',
				h : '한시간',
				hh : '%d시간',
				d : '하루',
				dd : '%d일',
				M : '한달',
				MM : '%d달',
				y : '일년',
				yy : '%d년'
			},
			dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
			ordinal : function (number) {
				return number + (number === 1 ? 'er' : 'e');
			},
			meridiemParse : /PD|MD/,
			isPM : function (input) {
				return input.charAt(0) === 'M';
			},
			meridiem : function (hours, minutes, isLower) {
				return hours < 12 ? 'PD' : 'MD';
			},
			week : {
				dow : 0, // Monday is the first day of the week.
				doy : 4  // The week that contains Jan 4th is the first week of the year.
			}

		});
		moment().locale('kr');

		this.updateContentStyle();
		window.addEventListener("resize", this.updateContentStyle, false);

		if(!this.props.location.pathname.match('/[a-z]+'))
		return this.setState({index:0});
		switch(this.props.location.pathname.match('/[a-z]+').toString()) {	// 새로고침시 Tab Index설정
			case "/board":	return this.setState({index: 1});
			case "/users":	return this.setState({index: 2});
			case "/groups":	return this.setState({index: 3});
			default: return this.setState({index: 0});
		}
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateContentStyle, false);
	}

	updateContentStyle = () => {
		console.log("resized");
		this.setState({
			contentStyles: {
				borderRadius: "10px",
				boxShadow: "0 1px 10px -1px rgba(120,120,120,0.5)",
				margin: "5px",
				overflow:"auto",
				height: `${this.outerContainerHeightRef && this.outerContainerHeightRef.scrollHeight-85}px`,	// 스크롤 영역 height =  OuterContainerHeight - FilterHeight
				padding: "10px",
		}})
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
				msg.notification.gubun === 2 && this.props.updateMyFriends(msg.myFriends);
				break;
			default: console.log("RECIEVED UNKNOWN MESSAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		}
	}
	sendMessage = data => {
		this.clientRef.sendMessage("/app/message", JSON.stringify(data));
	}

	render() {
		const { index, contentStyles } = this.state;
		const { me, token } = this.props;
		return (
			<React.Fragment>
				<Route path="(/|/board|/users|/groups|/me|/group)" render={() =>
					<React.Fragment>
						<SockJsClient
							url={`${process.env.REACT_APP_DEV_API_URL}/chat`}
							topics={[`/topic/${token}`]}
							onMessage={this.onMessageReceive}
							onConnect={ () => console.log("CONNECTTTA") }
							// subscribeHeaders
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
						<div ref={outerContainerHeightRef => this.outerContainerHeightRef = outerContainerHeightRef}
						style={{position: "absolute", height: "100%"}}/>
						<Switch>
							<Route path="/board" render={() =>
								<Board contentStyles={contentStyles}/>
							}/>
							<Route path="/users" render={() =>
								<Users contentStyles={contentStyles}/>
							}/>
							<Route path="/groups" render={() =>
								<Groups contentStyles={contentStyles}/>
							}/>
							<Route path="/" render={() =>
								<Popular contentStyles={contentStyles}/>
							}/>
						</Switch>
					</OuterContentContainer>
					<OuterChatContainer>
						<Messenger
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
				<Route path="(|/board|/users|/groups)/group/:id" render={() =>
					<Group
					open={true}
					disableBackdrop={true}/>
				}/>
				{/* <Map open={true}
					handleClose={()=>{}}/> */}
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
	receivedNotification,
	updateMyFriends
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
