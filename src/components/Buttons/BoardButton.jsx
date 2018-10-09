import React from 'react'
import { IconButton } from '@material-ui/core';
import { NanoBoardIcon } from 'components/AppBarIcons';

export default props => {
	return (
		<IconButton
			buttonRef={props.buttonRef}
			onClick={props.onClick}
			style={{
				verticalAlign: "top",
				top: "50%",
				transform: "translateY(-50%)",
				width: "28px",
				height: "28px",
			}}>
			<NanoBoardIcon
				selected={props.selected}
				fill={props.fill || "rgb(80,80,80)"}/>
		</IconButton>
	)
}
