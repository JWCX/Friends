import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';
import moment from 'moment';

import { ChatBubble, ChatBubbleMe } from 'components';

const StyledChatBox = styled.div`
	position: absolute;
	/* background: rgba(100,100,100,0.1); */
	height: 92%;
	width: 100%;
	overflow: auto;
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
		moment.locale('kr', {
			months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
			monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
			monthsParseExact : true,
			weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
			weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
			weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
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
				future : 'dans %s',
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
				dow : 1, // Monday is the first day of the week.
				doy : 4  // The week that contains Jan 4th is the first week of the year.
			}
		});
		moment().locale('kr');
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
