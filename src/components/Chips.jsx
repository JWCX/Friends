import React from 'react'

import { Chip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	blueChip: {
		position: "relative",
		top: "50%",
		transform: "translateY(-50%)",
		margin: "0 3px",
		background: "linear-gradient(45deg, #8c98d9 10%, #66ffff 270%)",
	},
	blueChipLabel: {
		padding:"0 10px 0 0",
		margin: "0 3px 0 0",
		fontSize: "0.9em",
	},

	interestChip: {
		margin: "2px 4px",
		background: "linear-gradient(#fff2e6 5%, #ffff1a 300%)",
		boxShadow: "0 2px 7px -2px rgba(80,80,80,0.3)",
		borderRadius: "10px",
		height:"25px",
	},
	interestChipLabel: {
		padding: "10px",
		fontSize: "0.9em",
	},

	avatar: {
	},
	deleteIcon: {
		fontSize: "1em",
		padding: "4px 5px 0 10px",
		cursor:"default",
	}
}

export const BlueChip = withStyles(styles)(({avatar, label, deleteIcon, onDelete, classes}) => {
	return (
		<Chip
			avatar={avatar}
			label={label}
			deleteIcon={deleteIcon}
			onDelete={onDelete}
			classes={{root: classes.blueChip, avatar: classes.avatar, label: classes.blueChipLabel}}
			/>
	)
})
export const InterestChip = withStyles(styles)(({avatar, label, fontSize, deleteIcon, onDelete, classes}) => {
	return (
		<Chip
			avatar={avatar}
			label={label}
			style={{fontSize}}
			deleteIcon={deleteIcon}
			onDelete={onDelete}
			classes={{root: classes.interestChip, avatar: classes.avatar, label: classes.interestChipLabel, deleteIcon: classes.deleteIcon}}
			/>
	)
})

