import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dialog as MuiDialog,
		Grid,
		 } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios';

import { openGroupPage,
	updateGroupPage,
	closeGroupPage,
	updateGroupMembers,
	clearGroupMembers,
	updateGroupPosts,
	clearGroupPosts } from 'actions';
import { GroupMain,
		MeFriends,
		MeGroups,
		GroupInfo,
		GroupMore } from 'containers';
import { CancelButton,
		MoreButton,
		FriendButton,
		GroupButton,
		Dialog,
		MeMainLoader,
		MeFriendsGroupsLoader,
	} from 'components';


const styles = {
	paper: {
		padding: "20px 20px 20px 20px",
		minWidth:"650px",
		width:"1000px",
		maxWidth: "1000px",
		// minWidth: "1800px",
		// minHeight: "850px",
		maxHeight: "100vh",
		borderRadius: "10px",
		margin: "0",
		transition: "all 0.2s ease-in-out",
	},
	infoPaper: {
		padding: "20px 20px 20px 20px",
		minWidth:"650px",
		width:"720px",
		maxWidth: "1000px",
		// minWidth: "1800px",
		// minHeight: "850px",
		maxHeight: "100vh",
		borderRadius: "10px",
		margin: "0",
		transition: "all 0.2s ease-in-out",
	},
	notMyGroupPaper: {
		padding: "20px 20px 20px 20px",
		minWidth:"580px",
		width:"580px",
		maxWidth: "1000px",
		// minWidth: "1800px",
		// minHeight: "850px",
		maxHeight: "100vh",
		borderRadius: "10px",
		margin: "0",
		transition: "all 0.2s ease-in-out",
	},
	paperWidthXs: {
		width: "100%",
	},
	container: {
	}
}

class Group extends React.Component {
	state = {
		currentView: 0,  // 현재 뷰 0: 그룹 정보, 1: 그룹 포스트, 2: 정보수정창
		openMore: false,  // true시 더보기메뉴 활성

		dialogOpen: false,
		dialogIcon: 0,
		dialogTitle: "",
		dialogContent: "",

		currentPage: 1,
		memberPages: 0,
		st: 0,
		ed: 0,
	}
	componentDidMount = () => {
		if(this.props.match.params.id === "new") {
			this.setState({currentView: 2,
				dialogOpen: true,
				dialogTitle: "새로운 그룹을 개설합니다",
			});
			return this.props.closeGroupPage();
		}
		console.log("ID:", this.props.match.params.id);
		this.getGroupInfo(this.props.match.params.id);
	}
	// updatePageNums = memberPages => {
	// 	// const memberPages = this.props.me ? this.props.me.memberPages : this.state.memberPages;
	// 		this.setState(state => ({groupsPages: state.currentView===1 && memberPages, memberPages: state.currentView===0 && memberPages,
	// 			st: memberPages-state.currentPage < 3 ? memberPages-4 < 1 ? 1 : memberPages-4 : state.currentPage-2 < 1 ? 1 : state.currentPage-2,
	// 			ed: state.currentPage < 3 ? memberPages > 5 ? 5 : memberPages : state.currentPage+2 > memberPages ? memberPages : state.currentPage+2,
	// 	}));
	// }
	// handleFriendsPagination = target => {
	// 	let currentPage;
	// 	switch(target){
	// 		case "<":
	// 			currentPage = this.state.st-1 <= 0 ? 1 : this.state.st-1;
	// 			// currentPage = this.state.currentPage-5 <= 0 ? 1 : this.state.currentPage-5;
	// 			break;
	// 		case ">":
	// 			currentPage = this.state.ed+1 >= this.state.memberPages ? this.state.memberPages : this.state.ed+1;
	// 			// currentPage = this.state.currentPage+5 >= this.state.memberPages ? this.state.memberPages : this.state.currentPage+5;
	// 			break;
	// 		default:
	// 			currentPage= target;
	// 	}
	// 	this.setState(state => ({
	// 		currentPage,
	// 		st: state.memberPages-currentPage < 3 ? state.memberPages-4 < 1 ? 1 : state.memberPages-4 : currentPage-2 < 1 ? 1 : currentPage-2,
	// 		ed: currentPage < 3 ? state.memberPages > 5 ? 5 : state.memberPages : currentPage+2 > state.memberPages ? state.memberPages : currentPage+2,
	// 	}));

	// 	this.props.clearMeFriends();

	// 	const id = this.props.match.params.id;
	// 	let params = {
	// 		token: this.props.token,
	// 		memberlist: true,
	// 		page: currentPage
	// 	}
	// 	if(parseInt(id)!==this.props.token)
	// 		params.id = id;


	// 	Axios.get('http://192.168.0.200:8080/me', {
	// 			params
	// 		}).then(resp => {
	// 			console.log(resp);	// FIXME: 지워주세용
	// 			this.props.updateMeFriends(resp.data.friends);
	// 		}).catch(err => {
	// 			console.log(err.response);	// FIXME: REMOVE
	// 			let errorTitle, errorMessage;
	// 			// if(!err.response || !err.response.data) {
	// 				errorTitle = "서버와 연결할 수 없습니다";
	// 				errorMessage = "잠시후 다시 시도해 주세요...";
	// 			// }
	// 			// else {
	// 			// 	errorTitle = err.response.data;
	// 			// }
	// 			this.setState({
	// 				dialogOpen: true,
	// 				dialogIcon: 2,
	// 				dialogTitle: errorTitle,
	// 				dialogContent: errorMessage
	// 			});
	// 		}); // FIXME: REMOVE LOG

	// }
	getGroupInfo = id => {
		this.setState({currentPage: 1});

		Axios.get('http://192.168.0.200:8080/group', {
			params: { token: this.props.token, id }
		}).then(resp => {
			console.log("REEEEEEEEEESPPPPOOONNGESEESEE", resp);	// FIXME: 지워주세용
			this.props.openGroupPage({
				group: {
					...resp.data.group,
					isMyGroup: resp.data.isMyGroup,
					memberPages: resp.data.memberPages,
				},
				members: resp.data.members,
				posts: resp.data.posts
			});
			// this.updatePageNums(resp.data.memberPages, resp.data.groupsPages);
		}).catch(err => {
			console.log(err.response);	// FIXME: REMOVE
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
		}); // FIXME: REMOVE LOG
	}
	handleClose = () => {
		if(this.state.currentView === 2 && this.props.match.params.id !== "new")
			return this.setState({currentView: 0});
		this.props.closeGroupPage();
		this.props.history.push(this.props.match.params['0']);
	}
	handleMore = () => {	/* 더보기 버튼 클릭시 메뉴 활성화 */
		this.setState(state => ({ openMore: !state.openMore }));
	}
	handleMoreSelect = e => {
		this.setState({ openMore: false });
		if(!e) return;
		switch(e.target.id){
			case "block":
				console.log("그룹차단처리");
				break;
			case "report":
				console.log("그룹신고처리");
				break;
			case "setInfo":
				this.setState({currentView: 2});
				break;
			default:
		}
	}
	handleSwitchView = view => {
		this.setState({currentView: view, currentPage:1});

		if(view === 1) {
			this.updatePageNums(this.props.me.groupsPages);
		}
		else if(view === 0) {
			this.updatePageNums(this.props.me.memberPages);
			this.handleFriendsPagination(1);
		}
	}
	handleDialogClose = () => {
		this.setState({
			dialogOpen: false,
			dialogIcon: 0,
			dialogTitle:"",
			dialogContent:""
		});
	};
	// friendsOrGroups = () => {
	// 	if(this.props.me) {
	// 		if(this.state.currentView === 0)
	// 			return this.props.meFriends ? <MeFriends
	// 											meFriends={this.props.meFriends}
	// 											currentPage={this.state.currentPage}
	// 											st={this.state.st}
	// 											ed={this.state.ed}
	// 											memberPages={this.state.memberPages}
	// 											handleFriendsPagination={this.handleFriendsPagination}/>
	// 										: <MeFriendsGroupsLoader/>
	// 	}
	// 	else return <MeFriendsGroupsLoader hideButtons/>
	// }
	render() {
		const { classes, onClose, disableBackdrop, icon, redirect, match, history, token, group, ...other } = this.props;
		const { currentView, openMore, dialogOpen, dialogIcon, dialogTitle, dialogContent } = this.state;
		console.log(this.state);
		return (
			<MuiDialog
				classes={{paper: currentView===2 ? classes.infoPaper : group.isMyGroup!==2 ? classes.notMyGroupPaper : classes.paper, paperWidthXs: classes.paperWidthXs}}
				disableBackdropClick={disableBackdrop}
				onClose={this.handleClose}
				aria-labelledby="simple-dialog-title"
				disableEscapeKeyDown={currentView===2}
				{...other}>
					<Grid container
					direction="row"
					justify="flex-end"
					alignItems="flex-start"
					spacing={0}>
						{ currentView !== 2 &&
							<Grid item>
								<React.Fragment>
									<MoreButton
										buttonRef={ node => { this.anchorEl = node; } }
										onClick={this.handleMore}/>
								</React.Fragment>
							</Grid>
						}
						<Grid item>
							<CancelButton onClick={this.handleClose}/>
						</Grid>
					</Grid>
					{
						currentView === 2 ? <GroupInfo establish={true} history={history} match={match} handleSwitchView={this.handleSwitchView}/>
						:

						<Grid container
								classes={{container:classes.container}}
								direction="row"
								justify="space-around"
								alignItems="flex-start"
								spacing={8}>
						 		<Grid item>
								{
									<GroupMain history={history} match={match}/>
									// this.props.me && this.props.me.id ? <MeMain history={history} match={match}/> :
										// <MeMainLoader/>
								}
						 		</Grid>
						 		{/* <Grid item
						 			style={{padding:"10px 10px 10px 10px", boxShadow: this.props.me && "0 1px 10px -2px rgb(150,150,150)", borderRadius:"10px", minWidth:"320px", maxHeight:"787px"}}>
						 			<Grid container
						 				direction="column"
										justify="space-evenly"
										alignItems="flex-start">
										<Grid item style={{paddingTop:"15px"}}>
											<FriendButton
												fill={this.props.group || "white"}
												onClick={() => {this.handleSwitchView(0)}}
												selected={this.props.me && currentView===0}/>
											&nbsp;
											<GroupButton
												fill={this.props.group || "white"}
												onClick={() => {this.handleSwitchView(1)}}
												selected={this.props.me && currentView===1}/>
										</Grid>
									</Grid>
								</Grid> */}
							</Grid>
					}
					{
						currentView !== 2 ? <GroupMore
							token={token}
							masterId={this.props.group && this.props.group.master.id}
							open={openMore}
							anchorEl={this.anchorEl}
							handleMoreSelect={this.handleMoreSelect}/> : ""
					}
					<Dialog
						open={dialogOpen}
						onClose={this.handleDialogClose}
						title={dialogTitle}
						content={dialogContent}
						disableBackdrop={true}
						icon={dialogIcon}
					/>
			</MuiDialog>
		);
	}
}

const mapStateToProps = state => ({
	token: state.token,
	group: state.group,
	groupMembers: state.groupMembers,
	groupPosts: state.groupPosts,
})
const mapDispatchToProps = {
	openGroupPage,
	updateGroupPage,
	closeGroupPage,
	updateGroupMembers,
	clearGroupMembers,
	updateGroupPosts,
	clearGroupPosts,
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Group)));