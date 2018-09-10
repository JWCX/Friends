import React from 'react'
import styled from 'styled-components';

const Avatar = styled.img`
width: ${props => props.width};
height: ${props => props.height};
border-radius: 100%;
box-shadow: 0 3px 15px -1px rgba(100,100,100,0.3);
`




export const SmallAvatar = ({alt, src}) => {
	return (
		<Avatar
			alt={alt}
			src={src}
			width="55px"
			height="55px"/>
	)
}

export const LargeAvatar = ({alt, src}) => {
	return (
		<Avatar
			alt={alt}
			src={src}
			width="200px"
			height="200px"/>
	)
}