import React from 'react'
import { IconButton } from '@material-ui/core';
import { ReplyIcon } from 'components/AppBarIcons';

export default props => {
	return (
		<IconButton
			onClick={props.onClick}
			style={{
				verticalAlign: "top",
				top: "50%",
				transform: "translateY(-50%)",
				width: "40px",
				height: "40px",
			}}>
			<ReplyIcon />
		</IconButton>
	)
}
