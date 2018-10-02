import React from 'react'
import { IconButton } from '@material-ui/core';
import { WritePostIcon } from 'components/AppBarIcons';

export default props => {
	return (
		<IconButton
			onClick={props.onClick}
			disabled={props.disabled}
			style={{
				// verticalAlign: "top",
				// top: "50%",
				// transform: "translateY(-50%)",
				width: "50px",
				height: "50px",
				background: props.background,
			}}>
			<WritePostIcon sfill={props.sfill} fill={props.fill || "rgb(80,80,80)"}/>
		</IconButton>
	)
}
