import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Axios from 'axios';
import { Grid,
	CircularProgress } from '@material-ui/core';
import { EditorState,
	convertFromRaw } from 'draft-js';

import { getMainPosts,
	updateMainPosts,
	setHasMorePages,
	setNextPageNum } from 'actions';
import { Dialog,
	WritePostButton,
	CommentForm } from 'components';
import { ExpansionPost,
	PostForm } from 'containers';
import { NanoExpandIcon } from 'components/AppBarIcons';

import createMentionPlugin from 'draft-js-mention-plugin';

export class Board extends Component {
	state = {
		loadingContents: false,

		postFormOpen: false,

		openReply: false,
		postIdToReply: null,

		dialogOpen: false,
		dialogIcon: null,
		dialogTitle: "",
		dialogContent: "",

		expanded: {}
	}
	mentionPlugin = createMentionPlugin({
		mentionComponent: (mentionProps) =>
		<span
			className={mentionProps.className}
			onClick={() => this.props.history.push(`${this.props.match.path}/me/${mentionProps.mention.id}`)}>
			{mentionProps.children}
		</span>
	});

	componentDidMount = () => {
		console.log("component DID MOUNT");
		this.props.setNextPageNum(this.props.nextPageNum+1);
	}
	expandPost = id => {
		if(!this.state.expanded[id]) {
			Axios.post(`${process.env.REACT_APP_DEV_API_URL}/board/read`, {
				token: this.props.token,
				id: id
			}).then(resp => {
				console.log(resp);	// FIXME: 지워주세용
				if(resp.data.increment) {
					const readPost = this.props.posts[id];
					readPost.views = readPost.views+1;
					this.props.getMainPosts({...this.props.posts, [id]: readPost});
				}
			}).catch(err => {
				console.log(err.response);
			}); // FIXME: REMOVE LOG
			this.setState(state => ({expanded: {...state.expanded, [id]: true}}));
		}
		else {
			this.setState(state => ({expanded: {...state.expanded, [id]: false}}));
		}
		this.setState({[`editorState${id}`]: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.posts[id].content)))})
	}
	handleLike = id => {
		Axios.post(`${process.env.REACT_APP_DEV_API_URL}/board/like`, {
				token: this.props.token,
				id: id,
				liked: !this.props.posts[id].liked
			}).then(resp => {
				console.log(resp);	// FIXME: 지워주세용
				const likedPost = this.props.posts[id];
				likedPost.likes = likedPost.liked ? likedPost.likes-1 : likedPost.likes+1;
				likedPost.liked = !likedPost.liked;
				this.props.getMainPosts({...this.props.posts, [id]: likedPost});
			}).catch(err => {
				console.log(err.response);
			}); // FIXME: REMOVE LOG
	}
	loadMore = () => {
		this.setState({loadingContents: true});
		console.log("loadMore");

		Axios.get(`${process.env.REACT_APP_DEV_API_URL}/board`, { params: {token: this.props.token, page: this.props.nextPageNum} })
			.then(resp => {
				this.props.updateMainPosts(this.props.posts, resp.data.posts);
				this.props.setNextPageNum(this.props.nextPageNum+1);
				this.props.setHasMorePages(resp.data.hasMorePages);
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
		const visibleAreaHeight = this.props.contentStyles && parseInt(this.props.contentStyles.height);
		if(visibleAreaHeight + scrollTop + 150 >= scrollHeight)
			this.loadMore();
	}
	handleDialogClose = () => {
		this.setState({ dialogOpen: false,
			dialogIcon: 0,
			dialogTitle:"",
			dialogContent:"" });
	}
	handleWritePost = () => {
		this.setState({postFormOpen: true});
	}
	handleCloseWritePost = () => {
		this.setState({postFormOpen: false});
	}
	openReplyForm = id => {
		this.setState({openReply: true, postIdToReply: id});
	}
	handleCloseCommentForm = () => {
		this.setState({openReply: false, postIdToReply: null});
	}
	render() {
		const { posts, hasMorePages, contentStyles, token } = this.props;
		const { loadingContents,
			postFormOpen,
			dialogOpen,
			dialogIcon,
			dialogTitle,
			dialogContent,
			openReply,
			postIdToReply
		} = this.state;
		return (
			<React.Fragment>
				<div style={{height:"55px", textAlign:"end"}}>
					<WritePostButton
						onClick={this.handleWritePost}/>
				</div>
				<div
					ref={scrollContainer => this.scrollContainer = scrollContainer}
					onScroll={ !loadingContents && hasMorePages ? this.handleScroll : null}
					style={contentStyles}>
					<Grid container
						style={{padding: "5px"}}
						direction="row"
						justify="flex-start"
						alignItems="center"
						spacing={0}>
						{
							_.orderBy(posts, "id", "desc")
							.map(post =>
								<Grid item
									key={post.id}
									style={{width: "100%", minWidth: "390px"}}>
									<ExpansionPost
										id={post.id}
										views={post.views}
										likes={post.likes}
										commentsCounter={_.values(post.comments).length}
										post={post}
										editorState={this.state[`editorState${post.id}`]}
										expanded={this.state.expanded[post.id] === true}
										handleLike={()=>{this.handleLike(post.id)}}
										openReplyForm={() => this.openReplyForm(post.id)}
										onClick={this.expandPost}
										onChange={editorState =>{ this.setState({[`editorState${post.id}`]: editorState}) }}
										icon={<NanoExpandIcon fill="rgb(150,150,150)"/>}
										mentionPlugin={this.mentionPlugin}
										history={this.props.history}
										match={this.props.match}/>
								</Grid>
							)
						}
						{
							openReply &&
							<CommentForm
								type="board"
								token={token}
								postId={postIdToReply}
								open={openReply}
								handleClose={this.handleCloseCommentForm}/>
						}
						{
							postFormOpen &&
							<PostForm
								open={postFormOpen}
								handleClose={this.handleCloseWritePost}
								token={token}
								/>
						}
						{
							hasMorePages &&
								<Grid item style={{position: "relative", height: "100px", left: "50%", transform: "translateX(-50%)"}}>
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
				<Dialog
					open={dialogOpen}
					onClose={this.handleDialogClose}
					title={dialogTitle}
					content={dialogContent}
					icon={dialogIcon}
				/>
			</React.Fragment>
		)
	}
}



const mapStateToProps = state => ({
	token: state.token,
	nextPageNum: state.nextPageNum,
	hasMorePages: state.hasMorePages,
	posts: state.mainPosts,
	myFriends: state.myFriends
})
const mapDispatchToProps = {
	getMainPosts,
	updateMainPosts,
	setHasMorePages,
	setNextPageNum
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board));