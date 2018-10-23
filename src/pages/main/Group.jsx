import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dialog as MuiDialog,
		Grid,
		Fade,
		Divider,
		CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Axios from 'axios';
import _ from 'lodash';

import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import { EditorState,
	convertFromRaw } from 'draft-js';

import { openGroupPage,
	updateGroupPage,
	closeGroupPage,
	updateGroupMembers,
	clearGroupMembers,
	getGroupPosts,
	updateGroupPosts,
	clearGroupPosts,
	setGroupNextPageNum,
	setGroupHasMorePages } from 'actions';
import { GroupMain,
		GroupMembers,
		GroupInfo,
		GroupMore,
		ExpansionPost,
		GroupPostForm } from 'containers';
import { CancelButton,
		MoreButton,
		BoardButton,
		GroupButton,
		WriteGroupPostButton,
		Dialog,
		GroupMainLoader,
		MeFriendsGroupsLoader,
		PostHeader,
		DialogGroupApplicants,
		LikeButton,
		ReplyButton,
		Comments,
		CommentForm } from 'components';
import { NanoExpandIcon } from 'components/AppBarIcons';

import createMyMapPlugin from 'assets/draftjs/draft-js-mymap-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createAnchorPlugin from 'draft-js-anchor-plugin';
import createMentionPlugin from 'draft-js-mention-plugin';

import createVideoPlugin from 'draft-js-video-plugin';
import createImagePlugin from 'draft-js-image-plugin';

import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';

import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js-alignment-plugin/lib/plugin.css';
import 'draft-js-anchor-plugin/lib/plugin.css';
import 'assets/draftjs/draft-js-emoji-plugin/styles.css';
import 'assets/draftjs/draft-js-mention-plugin/styles.css';
import editorStyles from 'assets/draftjs/editorStyles.css';

const emojiPlugin = createEmojiPlugin();
const linkifyPlugin = createLinkifyPlugin();
const anchorPlugin = createAnchorPlugin();
const resizeablePlugin = createResizeablePlugin();
const alignmentPlugin = createAlignmentPlugin();

const decorator = composeDecorators(
	resizeablePlugin.decorator,
	alignmentPlugin.decorator,
)
const myMapPlugin = createMyMapPlugin({decorator});
const imagePlugin = createImagePlugin({decorator});
const videoPlugin = createVideoPlugin({decorator});

const styles = {
	paper: {
		padding: "20px 20px 20px 20px",
		minWidth:"650px",
		width:"960px",
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

		loadingContents: false,

		postFormOpen: false,

		openReply: false,
		postIdToReply: null,

		dialogOpen: false,
		dialogIcon: 0,
		dialogTitle: "",
		dialogContent: "",

		dialogGroupApplicantsOpen: false,

		currentPage: 1,
		memberPages: 0,
		st: 0,
		ed: 0,
	}
	mentionPlugin = createMentionPlugin({
		mentionComponent: (mentionProps) =>
		<span
			className={mentionProps.className}
			onClick={() => this.props.history.push(`${this.props.match.params[0]}/me/${mentionProps.mention.id}`)}>
			{mentionProps.children}
		</span>
	});
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
	updatePageNums = memberPages => {
			this.setState(state => ({ memberPages: state.currentView===0 && memberPages,
				st: memberPages-state.currentPage < 3 ? memberPages-4 < 1 ? 1 : memberPages-4 : state.currentPage-2 < 1 ? 1 : state.currentPage-2,
				ed: state.currentPage < 3 ? memberPages > 5 ? 5 : memberPages : state.currentPage+2 > memberPages ? memberPages : state.currentPage+2,
		}));
	}
	handleMembersPagination = pageNum => {
		let currentPage;
		switch(pageNum){
			case "<":
				currentPage = this.state.st-1 <= 0 ? 1 : this.state.st-1;
				break;
			case ">":
				currentPage = this.state.ed+1 >= this.state.memberPages ? this.state.memberPages : this.state.ed+1;
				break;
			default:
				currentPage= pageNum;
		}
		this.setState(state => ({
			currentPage,
			st: state.memberPages-currentPage < 3 ? state.memberPages-4 < 1 ? 1 : state.memberPages-4 : currentPage-2 < 1 ? 1 : currentPage-2,
			ed: currentPage < 3 ? state.memberPages > 5 ? 5 : state.memberPages : currentPage+2 > state.memberPages ? state.memberPages : currentPage+2,
		}));

		this.props.clearGroupMembers();

		Axios.get(`${process.env.REACT_APP_DEV_API_URL}/group/member`, {
				token: this.props.token,
				id: this.props.group.id,
				page: currentPage
			}).then(resp => {
				console.log(resp);	// FIXME: 지워주세용
				this.props.updateGroupMembers(resp.data.members);
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

	getGroupInfo = id => {
		this.setState({currentPage: 1});

		// this.updatePageNums(this.props.group.memberPages); //TODO: DELETETETAS


		Axios.get(`${process.env.REACT_APP_DEV_API_URL}/group`, {
			params: { token: this.props.token, id }
		}).then(resp => {
			console.log("REEEEEEEEEESPPPPOOONNGESEESEE", resp);	// FIXME: 지워주세용
			this.props.openGroupPage({
				group: {
					...resp.data.group,
					isMyGroup: resp.data.isMyGroup,
					memberPages: resp.data.memberPages,
					hasMorePages: resp.data.hasMorePages
				},
				members: resp.data.members,
				posts: resp.data.posts
			});
			this.updatePageNums(resp.data.memberPages);
		}).catch(err => {
			console.log("err",err);
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
				this.props.setGroupNextPageNum(2);
				this.props.clearGroupPosts();
				break;
			default:
		}
	}
	handleSwitchView = view => {
		this.setState({currentView: view, currentPage:1});
		if(view === 1) {
			this.loadMore(1);
		} else if(view === 0) {
			this.updatePageNums(this.props.group.memberPages);
			this.handleMembersPagination(1);
			this.props.setGroupNextPageNum(2);
			this.props.clearGroupPosts();
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
	expandPost = id => {
		if(!this.state[`expanded${id}`]) {
			Axios.post(`${process.env.REACT_APP_DEV_API_URL}/group/board/read`, {
				token: this.props.token,
				id: id
			}).then(resp => {
				console.log(resp);	// FIXME: 지워주세용
				if(resp.data.increment) {
					const readPost = this.props.groupPosts[id];
					readPost.views = readPost.views+1;
					this.props.getGroupPosts({...this.props.groupPosts, [id]: readPost});
				}
			}).catch(err => {
				console.log(err.response);
			}); // FIXME: REMOVE LOG
		}

		this.setState(state => ({[`expanded${id}`]: !state[`expanded${id}`]}));
		this.setState({[`editorState${id}`]: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.groupPosts[id].content)))})
	}
	handleLike = id => {
		Axios.post(`${process.env.REACT_APP_DEV_API_URL}/group/board/like`, {
				token: this.props.token,
				id: id,
				liked: !this.props.groupPosts[id].liked
			}).then(resp => {
				console.log(resp);	// FIXME: 지워주세용
				const likedPost = this.props.groupPosts[id];
				likedPost.likes = likedPost.liked ? likedPost.likes-1 : likedPost.likes+1;
				likedPost.liked = !likedPost.liked;
				this.props.getGroupPosts({...this.props.groupPosts, [id]: likedPost});
			}).catch(err => {
				console.log(err.response);
			}); // FIXME: REMOVE LOG
	}
	handleWritePost = () => {
		this.setState({postFormOpen: true});
	}
	handleCloseWritePost = () => {
		this.setState({postFormOpen: false});
	}
	loadMore = pageNum => {
		this.setState({loadingContents: true});

		Axios.get(`${process.env.REACT_APP_DEV_API_URL}/group/board`, {
				params: {
					token: this.props.token,
					id: this.props.group.id,
					page: pageNum || this.props.nextPageNum
				}
			})
			.then(resp => {
				this.props.updateGroupPosts(this.props.groupPosts, resp.data.posts);
				this.props.setGroupNextPageNum(pageNum ? pageNum+1 : this.props.nextPageNum+1);
				this.props.setGroupHasMorePages(resp.data.hasMorePages);
				this.setState({loadingContents: false});
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
					loadingContents: false,
					dialogOpen: true,
					dialogIcon: 2,
					dialogTitle: errorTitle,
					dialogContent: errorMessage
				});
			})
	}
	handleScroll = () => {
		const { scrollHeight, scrollTop } = this.scrollContainer && this.scrollContainer;
		if(scrollTop + 1087 >= scrollHeight)
			this.loadMore();
	}
	openGroupApplicants = () => {
		this.setState({dialogGroupApplicantsOpen: true});
	}
	closeGroupApplicants = () => {
		this.setState({dialogGroupApplicantsOpen: false});
	}
	openReplyForm = id => {
		this.setState({openReply: true, postIdToReply: id});
	}
	handleCloseCommentForm = () => {
		this.setState({openReply: false, postIdToReply: null});
	}
	render() {
		const { classes, onClose, disableBackdrop, icon, redirect, match, history, token, group, groupMembers, groupPosts, hasMorePages, ...other } = this.props;
		const { st, ed, memberPages, currentPage, currentView,
			dialogOpen, dialogIcon, dialogTitle, dialogContent,
			openMore,
			postFormOpen,
			loadingContents,
			dialogGroupApplicantsOpen,
			openReply,
			postIdToReply } = this.state;
		return (
			<MuiDialog
				classes={{paper: currentView===2 ? classes.infoPaper : group && group.isMyGroup===2 ? classes.paper : classes.notMyGroupPaper, paperWidthXs: classes.paperWidthXs}}
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
						: 	<Grid container
								classes={{container:classes.container}}
								direction="row"
								justify="space-around"
								alignItems="flex-start"
								spacing={8}>
								{
									currentView === 0 ?
											<React.Fragment>
												<Grid item>
												{
													group && group.id ? <GroupMain history={history} match={match} openGroupApplicants={this.openGroupApplicants}/> :
														<GroupMainLoader/>
												}
												</Grid>
												{
													group && group.isMyGroup === 2 &&
													<Grid item
														style={{padding:"10px 10px 10px 10px", boxShadow: group && "0 1px 10px -2px rgb(150,150,150)", borderRadius:"10px", minWidth:"320px", minHeight:"787px", maxHeight:"787px"}}>
														<Grid container
															direction="row"
															justify="space-evenly"
															alignItems="flex-start">
															<Grid item>
															{
																groupMembers ? <GroupMembers 	//TODO:SWITCH
																		group={group}
																		groupMembers={groupMembers}
																		currentPage={currentPage}
																		st={st}
																		ed={ed}
																		memberPages={memberPages}
																		handleMembersPagination={this.handleMembersPagination}/>
																		: <MeFriendsGroupsLoader/>
																	}
															</Grid>
														</Grid>
													</Grid>
												}
											</React.Fragment>
									: <Fade in={true}>
										<div style={{padding:"10px 10px 10px 10px", boxShadow: group && "0 1px 10px -2px rgb(150,150,150)", borderRadius:"10px", width:"865px", height:"787px", overflowY:"scroll"}}
											ref={scrollContainer => this.scrollContainer = scrollContainer}
											onScroll={ !loadingContents && hasMorePages ? this.handleScroll : null}>
											<Grid item>
											{
												_.map(groupPosts, post =>
													<Grid item
														style={{width: "100%", minWidth: "390px"}}>
														<ExpansionPost
															group
															id={post.id}
															onClick={this.expandPost}
															expanded={this.state[`expanded${post.id}`]}
															icon={<NanoExpandIcon fill="rgb(150,150,150)"/>}
															summary={
																<PostHeader
																	expanded={this.state[`expanded${post.id}`]}
																	handleLink={()=>{this.props.history.push(`${this.props.match.params[0]}/me/${post.user.id}`)}}
																	title={post.title}
																	writedate={moment(post.writedate).fromNow()}
																	user={post.user}
																	views={post.views}
																	comments={_.values(post.comments).length}
																	likes={post.likes}/>
															}>
															<div>
																{
																	this.state[`expanded${post.id}`] &&
																		<div className={editorStyles.readerGroup}>
																			<Editor editorState={this.state[`editorState${post.id}`]}
																				onChange={editorState =>{ this.setState({[`editorState${post.id}`]: editorState}) } }
																				plugins={[
																					myMapPlugin,
																					emojiPlugin,
																					linkifyPlugin,
																					videoPlugin,
																					imagePlugin,
																					resizeablePlugin,
																					alignmentPlugin,
																					anchorPlugin,
																					this.mentionPlugin,
																				]}
																				readOnly={true}/>
																		</div>
																}
																<div style={{paddingTop: "15px"}}>
																	{
																		_.map(post.comments, comment => <React.Fragment>
																				<Comments
																					comment={comment}
																					group/>
																				<Divider style={{margin: "15px 1px 5px 2px"}}/>
																			</React.Fragment>
																		)
																	}
																</div>
																<div style={{position: "relative", height: "80px", width: "780px", textAlign: "center"}}>
																	<LikeButton
																		onClick={()=>{this.handleLike(post.id)}}
																		selected={post.liked}/>
																	&nbsp;&nbsp;&nbsp;&nbsp;
																	<ReplyButton onClick={() => this.openReplyForm(post.id)}/>
																</div>
															</div>
														</ExpansionPost>
													</Grid>
												)
											}
											{
												openReply &&
												<CommentForm
													type="group"
													token={token}
													postId={postIdToReply}
													open={openReply}
													handleClose={this.handleCloseCommentForm}/>
											}
											{
												hasMorePages &&
													<Grid item style={{position: "relative", height: "100px", textAlign:"center"}}>
													{
														loadingContents &&
															<CircularProgress
															style={{
																position: "relative",
																top: "35px",
																color:"rgba(100, 180, 255)"
															}}
															size={30}
															thickness={5}/>
													}
														&nbsp;
													</Grid>
											}
											</Grid>
										</div>
									</Fade>
								}
								{
									group && group.isMyGroup === 2 &&
									<Grid item style={{paddingTop:"15px"}}>
										<GroupButton
											fill={group || "white"}
											onClick={() => {this.handleSwitchView(0)}}
											selected={group && currentView===0}/>
										<br/>
										<br/>
										<BoardButton
											fill={group || "white"}
											onClick={() => {this.handleSwitchView(1)}}
											selected={group && currentView===1}/>
										<br/>
										<br/>
										<WriteGroupPostButton
											fill={group || "white"}
											onClick={this.handleWritePost}
											selected={group && currentView===1}/>
									</Grid>
								}
							</Grid>
					}
					{
						postFormOpen &&	<GroupPostForm
							open={postFormOpen}
							handleClose={this.handleCloseWritePost}
							token={token}
							/>
					}
					{
						currentView !== 2 ? <GroupMore
							token={token}
							masterId={group && group.master.id}
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
						icon={dialogIcon}/>
					<DialogGroupApplicants
						open={dialogGroupApplicantsOpen}
						closeGroupApplicants={this.closeGroupApplicants}/>
			</MuiDialog>
		);
	}
}

const mapStateToProps = state => ({
	token: state.token,
	group: state.group,
	groupMembers: state.groupMembers,
	groupPosts: state.groupPosts,
	hasMorePages: state.groupHasMorePages,
	nextPageNum: state.groupNextPageNum,
})
const mapDispatchToProps = {
	openGroupPage,
	updateGroupPage,
	closeGroupPage,
	updateGroupMembers,
	clearGroupMembers,
	getGroupPosts,
	updateGroupPosts,
	clearGroupPosts,
	setGroupNextPageNum,
	setGroupHasMorePages
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Group)));