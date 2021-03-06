import React from 'react'
import styled from 'styled-components';
import defaultImage from 'assets/user_default.png';
import defaultGroupImage from 'assets/group_default.png';

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
margin: ${props => props.margin};
border-radius: 10px;
box-shadow: 0 3px 15px -1px rgba(100,100,100,0.3);
`
export const MiniUserAvatar = ({alt, src}) => {
	return (
		<UserAvatar
			// alt={alt}
			src={src || defaultImage}
			width="25px"
			height="25px"/>
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
export const LargeUserAvatar = ({alt, src, center}) => {
	return (
		<UserAvatar
			// alt={alt}
			src={src || defaultImage}
			width="100px"
			height="100px"
			margin={center ? "10px 0 10px 0" : "10px 0 10px 15px"}/>
	)
}
export const SmallGroupAvatar = ({alt, src}) => {
	return (
		<GroupAvatar
			// alt={alt}
			src={src || defaultGroupImage}
			width="83px"
			// width="50px"
			height="50px"/>
	)
}
export const LargeGroupAvatar = ({alt, src}) => {
	return (
		<GroupAvatar
			// alt={alt}
			src={src || defaultGroupImage}
			width="250px"
			height="150px"
			margin="10px 0 10px 15px"/>
	)
}
export const PopularGroupAvatar = ({alt, src}) => {
	return (
		<GroupAvatar
			// alt={alt}
			src={src || defaultGroupImage}
			width="167px"
			height="100px"
			margin="10px 0 10px 0"/>
	)
}
