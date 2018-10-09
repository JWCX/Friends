import React, { Component } from 'react';
import styled from 'styled-components';

import { SmallUserAvatar } from 'components/Avatars';
import { TextField } from 'components';


const Container = styled.div`
	width: ${props => props.width ? `${props.width+80}px` : "380px"};
	text-align: right;
	/* margin: 5px; */
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	margin: 8px 0;
`
const AvatarContainer = styled.div`
	vertical-align: top;
	display: inline-block;
	padding-top: 16px;
`
const TimeBubbleContainer = styled.div`
	display: inline-block;
	margin-right: 15px;
`
const Time = styled.div`
	font-size: 0.7em;
	text-align: end;
	color: rgb(150,150,150);
`
const Bubble = styled.div`
	position: relative;
	transition: all .1s ease-in-out;
	border-radius: 10px;
	background: linear-gradient(rgba(235,225,250,0.2) 15%, rgba(200,230,255,1) 230%);
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
	color: rgb(100,100,150);
	&::after {
		content: '';
		position: absolute;
		border-style: solid;
		border-width: 6px 0 6px 8px;
		border-color: transparent rgb(245,245,255);
		display: block;
		width: 0;
		z-index: 1;
		right: -7px;
		top: 11px;
	}
	&::before {
		content: '';
		position: absolute;
		border-style: solid;
		border-width: 7px 0 6px 8px;
		border-color: transparent rgba(0,0,0,0.15);
		display: block;
		width: 0;
		z-index: 0;
		right: -8px;
		top: 11px;
	}
`

export class ChatBubbleMe extends Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.msg !== nextProps.msg ||
			this.props.time !== nextProps.time)
			return true;
		return false;
	}
	render() {
		const { width, nickName, avatar, time, msg, inputId, label, onChange, disabled } = this.props;
		return (
			(msg || onChange) ? <Container width={width}>
				<TimeBubbleContainer>
					<Time>
						{time} &nbsp; <span style={{color:"rgb(110,110,110)" , fontSize:"1.2em"}}>{nickName}</span> &nbsp;
					</Time>
					<Bubble width={width}>
						<Text width={width}>
						{
							onChange ? <TextField
								id={inputId}
								value={msg}
								onChange={onChange}
								label={label}
								shrink
								multiline
								rows={4}
								rowsMax={6}
								disabled={disabled}
								margin="dense"
								width={`${width-30}px`}/>
								// width="450px"/>
							: msg
						}
						</Text>
					</Bubble>
				</TimeBubbleContainer>
				<AvatarContainer>
					<SmallUserAvatar
						src={avatar}/>
				</AvatarContainer>
			</Container> : <span></span>
		)
	}
}

export default ChatBubbleMe;