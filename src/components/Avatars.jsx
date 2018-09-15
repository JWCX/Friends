import React from 'react'
import styled from 'styled-components';

const UserAvatar = styled.img`
width: ${props => props.width};
height: ${props => props.height};
border-radius: 100%;
box-shadow: 0 3px 15px -1px rgba(100,100,100,0.3);
`
const GroupAvatar = styled.img`
width: ${props => props.width};
height: ${props => props.height};
border-radius: 15px;
box-shadow: 0 3px 15px -1px rgba(100,100,100,0.3);
`
export const SmallUserAvatar = ({alt, src}) => {
	return (
		<UserAvatar
			// alt={alt}
			src={src}
			width="50px"
			height="50px"/>
	)
}
export const LargeAvatar = ({alt, src}) => {
	return (
		<UserAvatar
			// alt={alt}
			src={src}
			width="200px"
			height="200px"/>
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
