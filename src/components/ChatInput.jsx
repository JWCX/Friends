import React, { Component } from 'react';
import styled from 'styled-components';

import { SendMessageIcon } from 'components/AppBarIcons';

const ChatInputContainer = styled.div`
	position: absolute;
	/* bottom: 13px; */
	/* height: 40px; */
	bottom: 0px;
	height: 8%;
`
const MyInput = styled.input`
	width: 260px;
	height: 40px;
	padding: 5px 10px;
	margin: 5px;
	border-radius: 5px;
	border: 1px solid rgba(100,100,100,0.5);
	box-shadow: 0 0 10px -3px rgb(100,100,100);
	display: inline-block;
	font-size: 1em;
	line-height: 1.4em;
	color: rgb(90,90,90);
	resize: none;
	transition: all 0.2s ease-in-out;
	&:focus {
		border: 1px solid rgb(100,100,200);
		box-shadow: 0 0 15px -1px rgb(200,200,255);
	}
`;
const SendButton = styled.button`
		display: inline-block;
		vertical-align: top;
		width: 75px;
		height: 40px;
		margin: 5px 5px 5px 0;
		padding-left: 23px;
		border-style: none;
		border-radius: 5px;
		cursor: pointer;
		background: linear-gradient(45deg, #32abe8 40%, #27eff9 200%);
		box-shadow: 0 0 10px -3px rgb(100,100,100);
		transition: all 0.1s ease-in-out;
		&:hover {
			box-shadow: 0 0 10px -2px rgb(50,50,50);
		}
`
class ChatInput extends Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.value !== nextProps.value )
			return true;
		else return false;
	}
	render() {
		const { id, value, onChange, handleKeyPress, handleSubmit } = this.props;
		return (
			<ChatInputContainer>
				<form style={{margin:"0"}} onSubmit={handleSubmit}>
					<MyInput
						className="hide-scroll"
						type="text"
						id={id}
						value={value || ""}
						onChange={onChange}
						onKeyPress={handleKeyPress}
						autoComplete="off"/>
					<SendButton>
						<SendMessageIcon/>
					</SendButton>
				</form>
			</ChatInputContainer>
		)
	}
}

export default ChatInput;