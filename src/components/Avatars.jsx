import React from 'react'
import styled from 'styled-components';
import defaultImage from 'assets/user_default.png';

const UserAvatar = styled.img`
width: ${props => props.width};
height: ${props => props.height};
margin: ${props => props.margin};
border-radius: 100%;
box-shadow: 0 3px 15px -1px rgba(100,100,100,0.3);
`
const GroupAvatar = styled.img`
width: ${props => props.width};
height: ${props => props.height};
border-radius: 15px;
box-shadow: 0 3px 15px -1px rgba(100,100,100,0.3);
`
export const MiniUserAvatar = ({alt, src}) => {
	return (
		<UserAvatar
			// alt={alt}
			src={src || defaultImage}
			width="30px"
			height="30px"/>
	)
}
export const SmallUserAvatar = ({alt, src}) => {
	return (
		<UserAvatar
			// alt={alt}
			src={src || defaultImage}
			width="50px"
			height="50px"/>
	)
}
export const LargeUserAvatar = ({alt, src}) => {
	return (
		<UserAvatar
			// alt={alt}
			src={src || defaultImage}
			width="100px"
			height="100px"
			margin="10px 0 10px 20px"/>
	)
}
export const SmallGroupAvatar = ({alt, src}) => {
	return (
		<GroupAvatar
			// alt={alt}
			src={src}
			width="50px"
			height="50px"/>
	)
}
