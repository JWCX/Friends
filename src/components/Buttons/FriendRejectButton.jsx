import React from 'react'
import { IconButton } from '@material-ui/core';
import { CancelIcon } from 'components/AppBarIcons';

export default props => {
	return (
		<IconButton
			onClick={props.onClick}
			style={{
				verticalAlign: "top",
				// top: "50%",
				// transform: "translateY(-50%)",
				width: "50px",
				height: "50px",
			}}>
			<CancelIcon
				selected={props.selected}
				fill={props.fill || "#ff503d"}/>
		</IconButton>
	)
}
