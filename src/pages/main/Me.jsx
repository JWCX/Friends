import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dialog as MuiDialog,
		Grid,
		 } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios';

import { openMePage, closeMePage } from 'actions';
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
	}
	componentWillReceiveProps(nextProps) {
		if(this.props.match.params.id === nextProps.match.params.id) return;
			console.log("iiiiiiiiiiiiiiiiinooovoeooveovoeokkekkd");
			this.getUserInfo(nextProps.match.params.id);
	}
	getUserInfo = id => {
		this.props.closeMePage();
		if(parseInt(id)===this.props.token) {
			console.log("일치쓰!!!")	//TODO: SHOW MY INFO

			// Axios.get('http://192.168.0.23:8080/me', {
			// 	params: { token: this.props.token }
			// }).then(resp => {
			// 	console.log(resp);	// FIXME: 지워주세용
			// 	this.props.openMePage({
			// 		me: {
			// 			...this.props.myInfo,
			// 			friendsPages: resp.data.friendsPages,
			// 			groupsPages: resp.data.groupsPages
			// 		},
			// 		friends: resp.data.friends,
			// 		groups: resp.data.groups
			// 	});
			// }).catch(err => {
			// 	console.log(err.response);	// FIXME: REMOVE
			// 	let errorTitle, errorMessage;
			// 	if(!err.response || !err.response.data) {
			// 		errorTitle = "서버와 연결할 수 없습니다";
			// 		errorMessage = "잠시후 다시 시도해 주세요...";
			// 	}
			// 	else {
			// 		errorTitle = err.response.data;
			// 	}
			// 	this.setState({
			// 		dialogOpen: true,
			// 		dialogIcon: 2,
			// 		dialogTitle: errorTitle,
			// 		dialogContent: errorMessage
			// 	});
			// }); // FIXME: REMOVE LOG


			this.props.openMePage({		// FIXME: REMOVE AFTER TEST
				me: {...this.props.myInfo, friendsPages: 2, groupsPages: 1},
				friends: {
					123: {id: 123, nickName: "피제리움", gender: "1", image: "https://picsum.photos/800/800/?random", online: true},
					124: {id:124, nickName: "조피자", gender: "1", image: "https://picsum.photos/800/801/?random", online: true},
					125: {id:125, nickName: "도미노피자", gender: "2", image: "https://picsum.photos/802/800/?random", online: false},
					126: {id:126, nickName: "미스터 피자", gender: "1", image: "https://picsum.photos/801/800/?random", online: false},
					127: {id:127, nickName: "피자헛", gender: "1", image: "https://picsum.photos/800/803/?random", online: false},
					128: {id:128, nickName: "알볼로피자", gender: "2", image: "https://picsum.photos/802/800/?random", online: true},
					129: {id:129, nickName: "피자에땅", gender: "0", image: "https://picsum.photos/804/800/?random", online: false},
					130: {id:130, nickName: "피제리아디부자", gender: "1", image: "https://picsum.photos/805/800/?random", online: false},
					131: {id:131, nickName: "피자스쿨", gender: "2", image: "https://picsum.photos/800/804/?random", online: true},
					132: {id:132, nickName: "피자마루", gender: "2", image: "https://picsum.photos/800/805/?random", online: true}
				},
				groups: {
					2001: {id: 2001, groupName: "그룹 이름", image: "https://picsum.photos/800/800/?random"},
					2002: {id: 2002, groupName: "리스트", image: "https://picsum.photos/800/801/?random"},
					2003: {id: 2003, groupName: "입니다", image: "https://picsum.photos/802/800/?random"},
					2004: {id: 2004, groupName: "미스터ㅁㄴㄹ ㅁㄴㄹ ㅁㄴ ㄻㄴ ㄻㄴㄻ 피자", image: "https://picsum.photos/801/800/?random"},
					2005: {id: 2005, groupName: "피자헛", image: "https://picsum.photos/800/803/?random"},
					2006: {id: 2006, groupName: "알볼로피자", image: "https://picsum.photos/802/800/?random"},
					2007: {id: 2007, groupName: "피자에땅", image: "https://picsum.photos/804/800/?random"},
					2008: {id: 2008, groupName: "피제리아디부자", image: "https://picsum.photos/805/800/?random"},
					2009: {id: 2009, groupName: "피자스쿨", image: "https://picsum.photos/800/804/?random"},
					2000: {id: 2000, groupName: "피자마루", image: "https://picsum.photos/800/805/?random"}
				}
			});
		}
		else {
			console.log("부리리릴일치쓰!!!") 	//TODO: SHOW STRANGERS INFO

			// Axios.get('http://192.168.0.23:8080/me', {
			// 	params: { token: this.props.token, id: id }
			// }).then(resp => {
			// 	console.log(resp);	// FIXME: 지워주세용
			// 	this.props.openMePage({
			// 		me: {
			// 			...resp.data.me,
			// 			friendsPages: resp.data.friendsPages,
			// 			groupsPages: resp.data.groupsPages
			// 		},
			// 		friends: resp.data.friends,
			// 		groups: resp.data.groups
			// 	});
			// }).catch(err => {
			// 	console.log(err.response);	// FIXME: REMOVE
			// 	let errorTitle, errorMessage;
			// 	if(!err.response || !err.response.data) {
			// 		errorTitle = "서버와 연결할 수 없습니다";
			// 		errorMessage = "잠시후 다시 시도해 주세요...";
			// 	}
			// 	else {
			// 		errorTitle = err.response.data;
			// 	}
			// 	this.setState({
			// 		dialogOpen: true,
			// 		dialogIcon: 2,
			// 		dialogTitle: errorTitle,
			// 		dialogContent: errorMessage
			// 	});
			// }); // FIXME: REMOVE LOG

			setTimeout(() => {
				this.props.openMePage({		// FIXME: REMOVE AFTER TEST
					me: {
						id: id,
						nickName: `USER-${id}`,
						age: Math.ceil(Math.random(1)*50),
						gender: "1",
						interests: [Math.ceil(Math.random()*6),Math.ceil(Math.random()*6),Math.ceil(Math.random()*6),Math.ceil(Math.random()*6),Math.ceil(Math.random()*6),Math.ceil(Math.random()*6),Math.ceil(Math.random()*6),Math.ceil(Math.random()*6)],
						images: [`https://picsum.photos/400/${400+Math.ceil(Math.random()*100)}/?random`,
								`https://picsum.photos/400/${400+Math.ceil(Math.random()*100)}/?random`,
								`https://picsum.photos/400/${400+Math.ceil(Math.random()*100)}/?random`,
								`https://picsum.photos/400/${400+Math.ceil(Math.random()*100)}/?random`,
								`https://picsum.photos/400/${400+Math.ceil(Math.random()*100)}/?random`],
						si: Math.ceil(Math.random()*2),
						gu: Math.ceil(Math.random()*2),
						birth: `${Math.ceil(Math.random()*110)+1900}. ${Math.ceil(Math.random()*12)}. ${Math.ceil(Math.random()*28)}`,
						intro: "헬로 월드zzzzaaaaaaaaaaaazzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
						msg: "굳바이",
						areayn: Math.random()>0.7,
						birthyn: Math.random()>0.7,
						genderyn: Math.random()>0.7,
						friendsyn: Math.random()>0.7,
						groupsyn: Math.random()>0.7,
						isFriend: 0,
						isCurious: false,
						friendsPages: Math.ceil(Math.random()*20),
						groupsPages: 2
					},
					friends: {
						123: {id: 123, nickName: `피제리움${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: true},
						124: {id:124, nickName: `조피자${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: true},
						125: {id:125, nickName: `도미노피자${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: false},
						126: {id:126, nickName: `미스터 피자${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: false},
						127: {id:127, nickName: `피자헛${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: false},
						128: {id:128, nickName: `알볼로피자${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: true},
						129: {id:129, nickName: `피자에땅${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: false},
						130: {id:130, nickName: `피제리아디부자${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: false},
						131: {id:131, nickName: `피자스쿨${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: true},
						132: {id:132, nickName: `피자마루${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: true}
					},
					groups: {
						2001: {id: 2001, groupName: "그룹 이름", image: "https://picsum.photos/800/800/?random"},
						2002: {id: 2002, groupName: "리스트", image: "https://picsum.photos/800/801/?random"},
						2003: {id: 2003, groupName: "입니다", image: "https://picsum.photos/802/800/?random"},
						2004: {id: 2004, groupName: "미스터ㅁㄴㄹ ㅁㄴㄹ ㅁㄴ ㄻㄴ ㄻㄴㄻ 피자", image: "https://picsum.photos/801/800/?random"},
						2005: {id: 2005, groupName: "피자헛", image: "https://picsum.photos/800/803/?random"},
						2006: {id: 2006, groupName: "알볼로피자", image: "https://picsum.photos/802/800/?random"},
						2007: {id: 2007, groupName: "피자에땅", image: "https://picsum.photos/804/800/?random"},
						2008: {id: 2008, groupName: "피제리아디부자", image: "https://picsum.photos/805/800/?random"},
						2009: {id: 2009, groupName: "피자스쿨", image: "https://picsum.photos/800/804/?random"},
						2000: {id: 2000, groupName: "피자마루", image: "https://picsum.photos/800/805/?random"}
					}
				});
			}, 1000);
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
		this.setState({currentView: view});
	}
	handleOpenDialog = params => {
		this.setState(params);
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
				return this.props.meFriends ? <MeFriends history={this.props.history}
														match={this.props.match}
														handleOpenDialog={this.handleOpenDialog}/>
											: <MeFriendsGroupsLoader/>
			if(this.state.currentView === 1)
				return this.props.meGroups ? <MeGroups history={this.props.history}
														match={this.props.match}
														handleOpenDialog={this.handleOpenDialog}/>
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
							<CancelButton onClick={this.handleClose}/>
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
									this.props.me ? <MeMain history={history} match={match}/> :
										<MeMainLoader/>
								}
								</Grid>
								<Grid item
									style={{padding:"10px 10px 0 10px", boxShadow: this.props.me && "0 1px 10px -2px rgb(150,150,150)", borderRadius:"10px", minHeight:"787px"}}>
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
	meGroups: state.meGroups
})
const mapDispatchToProps = {
	openMePage,
	closeMePage
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Me)));