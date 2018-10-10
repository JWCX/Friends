import React from 'react';
import { Badge } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { NanoStarIcon } from 'components/AppBarIcons';

const styles = {
	number: {
		top: "2px",
		right: "2px",
		width: "22px",
		height: "22px",
		border: "1px solid rgba(255,255,255,0.5)",
		boxShadow: "0 0 10px -2px rgba(255,100,100)",
		background: "linear-gradient(45deg, #ff4f4f 5%, #fff74f 200%)",
		color: "white",
	},
	buttonNumber: {
		top: "7px",
		right: "-3px",
		width: "22px",
		height: "22px",
		border: "1px solid rgba(255,255,255,0.5)",
		boxShadow: "0 0 10px -2px rgba(255,100,100)",
		background: "linear-gradient(45deg, #ff4f4f 5%, #fff74f 200%)",
		color: "white",
	},
	unreadChat: {
		top: "30px",
		right: "30px",
		width: "22px",
		height: "22px",
		fontSize: "0.7em",
		border: "1px solid rgba(255,255,255,0.5)",
		boxShadow: "0 0 10px -2px rgba(255,100,100)",
		background: "linear-gradient(45deg, #ff4f4f 5%, #fff74f 200%)",
		color: "white",
	},
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
		background: "#ffdb4d",
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

export const NumberBadge = withStyles(styles)( ({content, button, children, classes}) => {
	return (
		<Badge badgeContent={content} classes={{badge: button ? classes.buttonNumber : classes.number}}>
			{children}
		</Badge>
	)
})
export const UnreadChatBadge = withStyles(styles)( ({content, button, children, classes}) => {
	return (
		content === 0 ? children
		: <Badge badgeContent={content} classes={{badge: classes.unreadChat}}>
			{children}
		</Badge>
	)
})
export const LoggedInBadge = withStyles(styles)( ({children, classes}) => {
	return (
		<Badge badgeContent="" classes={{badge: classes.loggedIn}}>
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
