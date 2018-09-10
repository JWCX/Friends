import React from 'react'

import { Chip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	root: {
		position: "relative",
		top: "50%",
		transform: "translateY(-50%)",
		margin: "0 3px",
		background: "linear-gradient(45deg, #8c98d9 10%, #66ffff 270%)",
	},
	avatar: {
		background: "red",
	},
	label: {
		padding:"0 10px 0 0"
	}
}

export const BlueChip = withStyles(styles)(({avatar, label, deleteIcon, onDelete, classes}) => {
	return (
		<Chip
			avatar={avatar}
			label={label}
			deleteIcon={deleteIcon}
			onDelete={onDelete}
			classes={{root: classes.root, avatar: classes.avatar, label: classes.label}}
			/>
	)
})

