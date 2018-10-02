import React from 'react'
import { IconButton } from '@material-ui/core';
import { NanoAddMapIcon } from 'components/AppBarIcons';

export default props => {
	return (
		<IconButton
			onClick={props.onClick}
			onMouseUp={props.onMouseUp}
			disabled={props.disabled}
			style={{
				// verticalAlign: "top",
				// top: "50%",
				// transform: "translateY(-50%)",
				width: "28px",
				height: "28px",
				background: props.background,
			}}>
			<NanoAddMapIcon
				selected={props.selected}
				sfill={props.sfill}
				fill={props.fill || "rgb(120,120,120)"}/>
		</IconButton>
	)
}
