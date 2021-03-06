import React from 'react'
import { IconButton } from '@material-ui/core';
import { NanoAddImageIcon } from 'components/AppBarIcons';

export default props => {
	return (
		<IconButton
			onClick={props.onClick}
			onMouseUp={props.onMouseUp}
			disabled={props.disabled}
			style={{
				verticalAlign: props.verticalAlign,
				top: props.top,
				transform: props.transform,
				width: "28px",
				height: "28px",
				background: props.background,
			}}>
			<NanoAddImageIcon
				selected={props.selected}
				sfill={props.sfill}
				fill={props.fill || "rgb(120,120,120)"}/>
		</IconButton>
	)
}
