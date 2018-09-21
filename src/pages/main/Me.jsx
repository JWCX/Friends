import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dialog as MuiDialog,
		Grid,
		 } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios';

import { openMePage,
		closeMePage,
		updateMeFriends,
		clearMeFriends,
		updateMeGroups,
		clearMeGroups } from 'actions';
import { MeMain,
		MeFriends,
		MeGroups,
		MeInfo,
		MeMore } from 'containers';
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
		width:"700px",
		maxWidth: "1000px",
		// minWidth: "1800px",
		// minHeight: "850px",
		maxHeight: "100vh",
		borderRadius: "10px",
		margin: "0",
		transition: "all 0.2s ease-in-out"
	},
	paperWidthXs: {
		width: "100%",
	},
	container: {
	}
}

class Me extends React.Component {
	state = {
		currentView: 0,  // 현재 뷰 0: me의 친구리스트, 1: me의 그룹리스트, 2: 정보수정창
		openMore: false,  // true시 더보기메뉴 활성

		dialogOpen: false,
		dialogIcon: 0,
		dialogTitle: "",
		dialogContent: "",

		currentPage: 1,
		friendsPages: 0,
		groupsPages: 0,
		st: 0,
		ed: 0,
	}
	componentDidMount = () => {
		this.getUserInfo(this.props.match.params.id);

		if(!this.props.myInfo.nickName)
			this.setState({currentView: 2});
		// this.updatePageNums();
	}
	componentWillReceiveProps(nextProps) {
		if(this.props.match.params.id !== nextProps.match.params.id ||
			this.props.myInfo !== nextProps.myInfo){
			this.props.closeMePage();
			this.getUserInfo(nextProps.match.params.id);
		}
		// if(this.props.meFriends !== nextProps.meFriends || this.props.me !== nextProps.me)
			// this.updatePageNums();
	}
	updatePageNums = friendsPages => {
		// const friendsPages = this.props.me ? this.props.me.friendsPages : this.state.friendsPages;
			this.setState(state => ({groupsPages: state.currentView===1 && friendsPages, friendsPages: state.currentView===0 && friendsPages,
				st: friendsPages-state.currentPage < 3 ? friendsPages-4 < 1 ? 1 : friendsPages-4 : state.currentPage-2 < 1 ? 1 : state.currentPage-2,
				ed: state.currentPage < 3 ? friendsPages > 5 ? 5 : friendsPages : state.currentPage+2 > friendsPages ? friendsPages : state.currentPage+2,
		}));
	}
	handleFriendsPagination = target => {
		let currentPage;
		switch(target){
			case "<":
				currentPage = this.state.st-1 <= 0 ? 1 : this.state.st-1;
				// currentPage = this.state.currentPage-5 <= 0 ? 1 : this.state.currentPage-5;
				break;
			case ">":
				currentPage = this.state.ed+1 >= this.state.friendsPages ? this.state.friendsPages : this.state.ed+1;
				// currentPage = this.state.currentPage+5 >= this.state.friendsPages ? this.state.friendsPages : this.state.currentPage+5;
				break;
			default:
				currentPage= target;
		}
		this.setState(state => ({
			currentPage,
			st: state.friendsPages-currentPage < 3 ? state.friendsPages-4 < 1 ? 1 : state.friendsPages-4 : currentPage-2 < 1 ? 1 : currentPage-2,
			ed: currentPage < 3 ? state.friendsPages > 5 ? 5 : state.friendsPages : currentPage+2 > state.friendsPages ? state.friendsPages : currentPage+2,
		}));

		this.props.clearMeFriends();

		const id = this.props.match.params.id;
		let params = {
			token: this.props.token,
			memberlist: true,
			page: currentPage
		}
		if(parseInt(id)!==this.props.token)
			params.id = id;


		Axios.get('http://192.168.0.200:8080/me', {
				params
			}).then(resp => {
				console.log(resp);	// FIXME: 지워주세용
				this.props.updateMeFriends(resp.data.friends);
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



		// setTimeout(() => {
		// 	this.props.updateMeFriends({
		// 		1123: {id:1123, nickName: `피자나라키친공주${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: true},
		// 		1124: {id:1124, nickName: `조피자냠냠${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: true},
		// 		1125: {id:1125, nickName: `도미노피자${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: false},
		// 		1126: {id:1126, nickName: `미피앤무스티${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: false},
		// 		1127: {id:1127, nickName: `헬로월드${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: false},
		// 		1128: {id:1128, nickName: `피자헛${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: true},
		// 		1129: {id:1129, nickName: `이맛피자${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: false},
		// 		1130: {id:1130, nickName: `코스트코피자${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: false},
		// 		1131: {id:1131, nickName: `소고기고고${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: true},
		// 		1132: {id:1132, nickName: `이름뭐짓지${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: true}
		// 	});
		// }, 200);

	}
	handleGroupsPagination = target => {
		let currentPage;
		switch(target){
			case "<":
				currentPage = this.state.st-1 <= 0 ? 1 : this.state.st-1;
				// currentPage = this.state.currentPage-5 <= 0 ? 1 : this.state.currentPage-5;
				break;
			case ">":
				currentPage = this.state.ed+1 >= this.state.groupsPages ? this.state.groupsPages : this.state.ed+1;
				// currentPage = this.state.currentPage+5 >= this.state.groupsPages ? this.state.groupsPages : this.state.currentPage+5;
				break;
			default:
				currentPage= target;
		}
		this.setState(state => ({
			currentPage,
			st: state.groupsPages-currentPage < 3 ? state.groupsPages-4 < 1 ? 1 : state.groupsPages-4 : currentPage-2 < 1 ? 1 : currentPage-2,
			ed: currentPage < 3 ? state.groupsPages > 5 ? 5 : state.groupsPages : currentPage+2 > state.groupsPages ? state.groupsPages : currentPage+2,
		}));

		this.props.clearMeGroups();

		const id = this.props.match.params.id;
		let params = {
			token: this.props.token,
			grouplist: true,
			page: currentPage
		}
		if(parseInt(id)!==this.props.token)
			params.id = id;


		Axios.get('http://192.168.0.200:8080/me', {
				params
			}).then(resp => {
				console.log(resp);	// FIXME: 지워주세용
				this.props.updateMeGroups(resp.data.groups);
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
	getUserInfo = id => {
		this.setState({currentPage: 1});
		if(parseInt(id)===this.props.token) {
			Axios.get('http://192.168.0.200:8080/me', {
				params: { token: this.props.token }
			}).then(resp => {
				console.log("REEEEEEEEEESPPPPOOONNGESEESEE", resp);	// FIXME: 지워주세용
				this.props.openMePage({
					me: {
						...this.props.myInfo,
						friendsPages: resp.data.friendsPages,
						groupsPages: resp.data.groupsPages
					},
					friends: resp.data.friends,
					groups: resp.data.groups
				});
				console.log("INFOOOOOOOOOO:",this.props.myInfo)
				this.updatePageNums(resp.data.friendsPages, resp.data.groupsPages);
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
		else {

			Axios.get('http://192.168.0.200:8080/me', {
				params: { token: this.props.token, id: id }
			}).then(resp => {
				console.log("REEEEEEEEEESPPPPOOONNGESEESEE", resp);	// FIXME: 지워주세용
				this.props.openMePage({
					me: {
						...resp.data.me,
						friendsPages: resp.data.friendsPages,
						groupsPages: resp.data.groupsPages
					},
					friends: resp.data.friends,
					groups: resp.data.groups
				});
				this.updatePageNums(resp.data.friendsPages);
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
	}
	handleClose = () => {
		if(this.state.currentView === 2)
			return this.setState({currentView: 0});
		this.props.closeMePage();
		console.log(this.props.match.params['0']);
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
				console.log("유저차단처리");
				break;
			case "report":
				console.log("유저신고처리");
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
			this.handleGroupsPagination(1);
		}
		else if(view === 0) {
			this.updatePageNums(this.props.me.friendsPages);
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
	friendsOrGroups = () => {
		if(this.props.me) {
			if(this.state.currentView === 0)
				return this.props.meFriends ? <MeFriends
												meFriends={this.props.meFriends}
												currentPage={this.state.currentPage}
												st={this.state.st}
												ed={this.state.ed}
												friendsPages={this.state.friendsPages}
												handleFriendsPagination={this.handleFriendsPagination}/>
											: <MeFriendsGroupsLoader/>
			if(this.state.currentView === 1)
				return this.props.meGroups ? <MeGroups
												meGroups={this.props.meGroups}
												currentPage={this.state.currentPage}
												st={this.state.st}
												ed={this.state.ed}
												groupsPages={this.state.groupsPages}
												handleGroupsPagination={this.handleGroupsPagination}/>
											: <MeFriendsGroupsLoader/>
		}
		else return <MeFriendsGroupsLoader hideButtons/>
		// return <MeFriendsGroupsLoader/>
	}
	render() {
		const { classes, onClose, disableBackdrop, icon, redirect, match, history, token, ...other } = this.props;
		const { currentView, openMore, dialogOpen, dialogIcon, dialogTitle, dialogContent } = this.state;
		return (
			<MuiDialog
				classes={{paper: classes.paper, paperWidthXs: classes.paperWidthXs}}
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
							<CancelButton disabled={!this.props.myInfo.nickName ? true : false} onClick={this.handleClose}/>
						</Grid>
					</Grid>
					{
						currentView === 2 ? <MeInfo history={history} match={match} handleSwitchView={this.handleSwitchView}/>
						: <Grid container
								classes={{container:classes.container}}
								direction="row"
								justify="space-around"
								alignItems="flex-start"
								spacing={8}>
								<Grid item>
								{
									this.props.me && this.props.me.id ? <MeMain history={history} match={match}/> :
										<MeMainLoader/>
								}
								</Grid>
								<Grid item
									style={{padding:"10px 10px 10px 10px", boxShadow: this.props.me && "0 1px 10px -2px rgb(150,150,150)", borderRadius:"10px", minWidth:"320px", maxHeight:"787px"}}>
									<Grid container
										direction="column"
										justify="space-evenly"
										alignItems="flex-start">
										<Grid item style={{paddingTop:"15px"}}>
											<FriendButton
												fill={this.props.me || "white"}
												onClick={() => {this.handleSwitchView(0)}}
												selected={this.props.me && currentView===0}/>
											&nbsp;
											<GroupButton
												fill={this.props.me || "white"}
												onClick={() => {this.handleSwitchView(1)}}
												selected={this.props.me && currentView===1}/>
										</Grid>
										<Grid item>
										{
											this.friendsOrGroups()
										}
										</Grid>
									</Grid>
								</Grid>
							</Grid>
					}
					{
						currentView !== 2 ? <MeMore
							token={token}
							match={match}
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
	myInfo: state.myInfo,
	me: state.me,
	meFriends: state.meFriends,
	meGroups: state.meGroups,
})
const mapDispatchToProps = {
	openMePage,
	closeMePage,
	updateMeFriends,
	clearMeFriends,
	updateMeGroups,
	clearMeGroups,
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Me)));