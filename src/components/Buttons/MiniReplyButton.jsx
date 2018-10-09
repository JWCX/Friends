import React from 'react'
import { IconButton } from '@material-ui/core';
import { NanoReplyIcon } from 'components/AppBarIcons';

export default props => {
	return (
		<IconButton
			onClick={props.onClick}
			style={{
				verticalAlign: props.align || "top",
				top: props.align || "50%",
				transform: props.align || "translateY(-50%)",
				width: "28px",
				height: "28px",
			}}>
			<NanoReplyIcon sfill={props.sfill} fill={props.fill || "rgb(80,80,80)"}/>
		</IconButton>
	)
}
