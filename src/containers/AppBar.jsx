import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import _ from 'lodash';
import { AppBar,
		Toolbar,
		Tabs,
		Tab,
		IconButton,
		Grid,
	} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import {
	getMainPosts,
	clearMainPosts,
	getMainUsers,
	clearMainUsers,
	getMainGroups,
	clearMainGroups,
	clearFilter,
	setFiltering,
	setNextPageNum,
	setHasMorePages } from 'actions';
import { Dialog, DialogFriendRequests } from 'components';
import { NumberBadge } from 'components/Badges';
import { LogoIcon,
		BoardIcon,
		UsersIcon,
		GroupsIcon,
		MeIcon,
		NotificationIcon,
		RequestIcon,
		MoreIcon,
	} from 'components/AppBarIcons'

const styles = {
	root: {
		opacity:0.5,
	},
	selected: {
		fontSize:"1.1em"
	}
}

class MyAppBar extends Component {
	state = {
		dialogOpen: false,
		dialogTitle: "",
		dialogContent: "",
		dialogRedirect: "",

		dialogFriendRequestsOpen: false,
	}
	componentDidMount() {
		if(!this.props.myInfo.nickName){
			this.setState({
				dialogOpen: true,
				dialogTitle: "환영합니다!",
				dialogContent: <span>처음이시군요? <br/>아직 상세정보를 등록하지 않았습니다. <br/>지금 상세정보 등록페이지로 안내해드리겠습니다.</span>,
				dialogRedirect: `/me/${this.props.token}`,
			})
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(this.state.dialogOpen !== nextState.dialogOpen ||
			this.state.dialogFriendRequestsOpen !== nextState.dialogFriendRequestsOpen)
			return true;
		if(this.props.index !== nextProps.index ||
			this.props.notifications !== nextProps.notifications)
			return true;
		return false;
	}

	getSuggested = path => {
		this.props.clearMainPosts();
		this.props.clearMainUsers();
		this.props.clearMainGroups();
		this.props.clearFilter();
		this.props.setFiltering(false);
		this.props.setNextPageNum(1);
		// this.props.setHasMorePages(true);

		if(path === "groups")	// TODO: REMOVE THIS AFTER GROUPS IS DONE
			return;

		Axios.get(`http://192.168.0.200:8080/${path}`, {
			params: { token: this.props.token, page: 1 }
		})
		.then(resp => {
			switch(path) {
				case "board":
					this.props.getMainPosts(resp.data.posts);
					break;
				case "users":
					this.props.getMainUsers(resp.data.users)
					break;
				case "groups":
					this.props.getMainGroups(resp.data.groups)
					break;
				default:
			}
			this.props.setHasMorePages(resp.data.hasMorePages);
		}).catch(err => {
			console.log(err);
			let errorTitle, errorMessage;
			// if(!err.response || !err.response.data) {
				errorTitle = "서버와 연결할 수 없습니다";
				errorMessage = "잠시후 다시 시도해 주세요...";
			// }
			// else {
			// 	errorTitle = err.response.data;
			// }
			this.setState({
				dialogOpen: true,
				dialogIcon: 2,
				dialogTitle: errorTitle,
				dialogContent: errorMessage
			});
		})
	}
	openFriendRequests = () => {
		console.log("open", this.state.dialogFriendRequestsOpen);
		this.setState({dialogFriendRequestsOpen: true});
	}
	closeFriendRequests = () => {
		this.setState({dialogFriendRequestsOpen: false});
	}
	handleOpenMe = () => {
		let url = `${this.props.match.url}/me/${this.props.token}`;
		if(this.props.match.url === "/")
			url = `${this.props.match.url}me/${this.props.token}`;
		this.props.history.push(url);
	}
	handleDialogClose = () => {
		this.setState({
			dialogOpen: false,
			dialogTitle: "",
			dialogContent: "",
			// dialogRedirect: "",
		})
	}
	render() {
		const { classes, index, position,
			handleChangeTab, notifications } = this.props;
		const { dialogOpen, dialogTitle, dialogContent, dialogRedirect,
			dialogFriendRequestsOpen,  } = this.state;
		return (
			<AppBar
				position={position}
				style={{background:"white"}}
				>
				<Toolbar
					variant="regular">
					<Grid container
						direction="row"
						justify="space-between"
						alignItems="center"
						spacing={0}>
						<Grid item>
							<Tabs
								value={index}
								onChange={handleChangeTab}
								>
								<Tab icon={<LogoIcon selected={index===0}/>}
									classes={{root: classes.root, selected: classes.selected}}/>
								<Tab onClick={()=>{this.getSuggested("board")}} icon={<BoardIcon selected={index===1}/>}
									classes={{root: classes.root, selected: classes.selected}}/>
								<Tab onClick={()=>{this.getSuggested("users")}} icon={<UsersIcon selected={index===2}/>}
									classes={{root: classes.root, selected: classes.selected}}/>
								<Tab onClick={()=>{this.getSuggested("groups")}} icon={<GroupsIcon selected={index===3}/>}
									classes={{root: classes.root, selected: classes.selected}}/>
							</Tabs>
						</Grid>
						<Grid item>
							<Grid container
								direction="column"
								justify="space-around"
								alignItems="flex-end"
								spacing={0}>
								<Grid item>
									<IconButton onClick={this.handleOpenMe}>
										<MeIcon/>
									</IconButton>
									<IconButton>
										<NotificationIcon/>
									</IconButton>
									<IconButton onClick={this.openFriendRequests}>
									{
										_.values(notifications).length ? <NumberBadge content={_.values(notifications).length}>
																			<RequestIcon/>
																		</NumberBadge>
																		: <RequestIcon/>
									}
									</IconButton>
									{/* <IconButton onClick={handleToggleMessenger}>
										<MessangerIcon/>
									</IconButton> */}
									<IconButton>
										<MoreIcon/>
									</IconButton>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Toolbar>
				<Dialog
					open={dialogOpen}
					onClose={this.handleDialogClose}
					title={dialogTitle}
					content={dialogContent}
					redirect={dialogRedirect}
					disableBackdrop/>
				<DialogFriendRequests
					open={dialogFriendRequestsOpen}
					closeFriendRequests={this.closeFriendRequests}/>
			</AppBar>
		)
	}
}

const mapStateToProps = state => ({
	myInfo: state.myInfo,
	token: state.token,
	notifications: state.notifications
})
const mapDispatchToProps = {
	getMainPosts,
	clearMainPosts,
	getMainUsers,
	clearMainUsers,
	getMainGroups,
	clearMainGroups,
	clearFilter,
	setFiltering,
	setNextPageNum,
	setHasMorePages
}
export default  withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MyAppBar)));