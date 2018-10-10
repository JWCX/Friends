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

import { getMainPosts,
	clearMainPosts,
	getMainUsers,
	clearMainUsers,
	getMainGroups,
	clearMainGroups,
	clearFilter,
	setFiltering,
	setNextPageNum,
	setHasMorePages,
	userLoggedOut } from 'actions';
import { Dialog,
	DialogFriendRequests,
	DialogYN } from 'components';
import { NumberBadge } from 'components/Badges';
import { LogoIcon,
		BoardIcon,
		UsersIcon,
		GroupsIcon,
		MeIcon,
		NotificationIcon,
		RequestIcon,
		LogoutIcon } from 'components/AppBarIcons'
import { Notifications } from 'containers';

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
		openNotifications: false,

		dialogOpen: false,
		dialogTitle: "",
		dialogContent: "",
		dialogRedirect: "",

		dialogYnOpen: false,
		dialogYnTitle: "",
		dialogYnContent: "",
		dialogYnProcess: false,
		dialogYnSubmit: null,

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
			this.state.dialogYnOpen !== nextState.dialogYnOpen ||
			this.state.openNotifications !== nextState.openNotifications ||
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

		Axios.get(`${process.env.REACT_APP_DEV_API_URL}/${path}`, {
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
	handleDialogYnCancel = () => {
		this.setState({
			dialogYnOpen: false,
			dialogYnTitle: "",
			dialogYnContent: "",
			dialogYnSubmit: null
		});
	};
	handleLogout = () => {
		this.setState({
			dialogYnOpen: true,
			dialogYnTitle: "로그아웃",
			dialogYnContent: "로그아웃 하시겠습니까?",
			dialogYnSubmit: this.logout
		})
	}
	logout = () => {
		this.props.userLoggedOut();
		this.props.history.push("/login");
	}
	handleOpenNotifications = () => {	/* 더보기 버튼 클릭시 메뉴 활성화 */
		this.setState(state => ({ openNotifications: !state.openNotifications }));
	}
	handleNotificationSelect = e => {
		if(e) {
			const path = this.props.location.pathname === "/" ? "" : this.props.location.pathname;
			this.props.history.push(`${path}/group/${e.target.id}`);
		}
		this.setState({ openNotifications: false });
	}
	render() {
		const { classes, index, position,
			handleChangeTab, notifications } = this.props;
		const { dialogYnOpen, dialogYnTitle, dialogYnContent, dialogYnProcess, dialogYnSubmit,
			dialogOpen, dialogTitle, dialogContent, dialogRedirect, dialogIcon,
			dialogFriendRequestsOpen,
			openNotifications  } = this.state;
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
								onChange={handleChangeTab}>
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
									<IconButton buttonRef={ node => this.anchorEl = node }
										onClick={ _.filter(notifications, notification => notification.gubun !== 0).length && this.handleOpenNotifications}>
									{
										_.filter(notifications, notification => notification.gubun !== 0).length ?
											<NumberBadge content={_.filter(notifications, notification => notification.gubun !== 0).length}>
												<NotificationIcon/>
											</NumberBadge>
											: <NotificationIcon/>
									}
									</IconButton>
									<IconButton onClick={this.openFriendRequests}>
									{
										_.filter(notifications, notification => notification.gubun === 0).length ?
											<NumberBadge content={_.filter(notifications, notification => notification.gubun === 0).length}>
												<RequestIcon/>
											</NumberBadge>
											: <RequestIcon/>
									}
									</IconButton>
									<IconButton onClick={this.handleLogout}>
										<LogoutIcon/>
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
					icon={dialogIcon}
					disableBackdrop/>
				<DialogFriendRequests
					open={dialogFriendRequestsOpen}
					closeFriendRequests={this.closeFriendRequests}/>
				<DialogYN open={dialogYnOpen}
					title={dialogYnTitle}
					content={dialogYnContent}
					onSubmit={dialogYnSubmit}
					onCancel={this.handleDialogYnCancel}
					process={dialogYnProcess}
					disableBackdrop/>
					<Notifications
							open={openNotifications}
							anchorEl={this.anchorEl}
							handleNotificationSelect={this.handleNotificationSelect}/>
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
	setHasMorePages,
	userLoggedOut
}
export default  withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MyAppBar)));