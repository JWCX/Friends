import React from 'react';
import { Badge } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { NanoStarIcon } from 'components/AppBarIcons';

const styles = {
	loggedIn: {
		top: "0px",
		right: "0px",
		width: "15px",
		height: "15px",
		border: "1px solid rgba(255,255,255,0.8)",
		background: "rgb(97, 244, 120)",
	},
	manager: {
		top: "0px",
		right: "0px",
		width: "15px",
		height: "15px",
		border: "1px solid rgba(255,255,255,0.8)",
		background: "rgb(255, 207, 0)",
	},
	subManager: {
		top: "0px",
		right: "0px",
		width: "15px",
		height: "15px",
		border: "1px solid rgba(255,255,255,0.8)",
		background: "rgb(153, 153, 153)",
	}
}

export const LoggedInBadge = withStyles(styles)( ({children, classes}) => {
	return (
		<Badge classes={{badge: classes.loggedIn}}>
			{children}
		</Badge>
	)
})
export const ManagerBadge = withStyles(styles)( ({children, classes}) => {
	return (
		<Badge badgeContent={<NanoStarIcon/>} classes={{badge: classes.manager}}>
			{children}
		</Badge>
	)
})
export const SubManagerBadge = withStyles(styles)( ({children, classes}) => {
	return (
		<Badge badgeContent={<NanoStarIcon/>} classes={{badge: classes.subManager}}>
			{children}
		</Badge>
	)
})
