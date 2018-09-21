import React, { Component } from 'react';
import styled from 'styled-components';

import { SmallUserAvatar } from 'components/Avatars';


const Container = styled.div`
	width: ${props => props.width ? `${props.width+80}px` : "380px"};
	text-align: left;
	/* margin: 5px; */
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	margin: 8px 0;
`
const AvatarContainer = styled.div`
	display: inline-block;
	padding-top: 16px;
`
const TimeBubbleContainer = styled.div`
	vertical-align: top;
	display: inline-block;
	margin-left: 15px;
`
const Time = styled.div`
	text-align: left;
	font-size: 0.7em;
	color: rgb(150,150,150);
`
const Bubble = styled.div`
	position: relative;
	transition: all .1s ease-in-out;
	border-radius: 10px;
	background: linear-gradient(rgba(255,255,230,0.2) 15%, rgba(255,230,220,1) 230%);
	box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
	overflow-wrap: break-word;
	&:hover {
		box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.3), 0px 2px 5px 0px rgba(0, 0, 0, 0.2), 0px 3px 4px -2px rgba(0, 0, 0, 0.15);
	}
`
const Text = styled.div`
	text-align: left;
	max-width: ${props => props.width ? `${props.width}px` : "300px"};
	overflow-wrap: break-word;
	overflow: hidden;
	padding: 5px 10px;
	font-size: 0.9em;
	color: rgb(200,150,140);
	&::after {
		content: '';
		position: absolute;
		border-style: solid;
		border-width: 6px 8px 6px 0;
		border-color: transparent rgb(255,255,242);
		display: block;
		width: 0;
		z-index: 1;
		left: -7px;
		top: 11px;
	}
	&::before {
		content: '';
		position: absolute;
		border-style: solid;
		border-width: 7px 8px 6px 0;
		border-color: transparent rgba(0,0,0,0.15);
		display: block;
		width: 0;
		z-index: 0;
		left: -8px;
		top: 11px;
	}
`

export class ChatBubble extends Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.msg !== nextProps.msg)
			return true;
		return false;
	}
	render() {
		const { width, nickName, avatar, time, msg } = this.props;
		return (
			msg && <Container width={width}>
				<AvatarContainer>
					<SmallUserAvatar
						src={avatar}/>
				</AvatarContainer>
				<TimeBubbleContainer>
					<Time>
						&nbsp; <span style={{color:"rgb(110,110,110)" , fontSize:"1.2em"}}>{nickName}</span> &nbsp; {time}
					</Time>
					<Bubble width={width}>
						<Text width={width}>
							{msg}
						</Text>
					</Bubble>
				</TimeBubbleContainer>
			</Container>
		)
	}
}

export default ChatBubble;