import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Axios from 'axios';
import moment from 'moment';
import { Grid, CircularProgress } from '@material-ui/core';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import { EditorState,
	convertFromRaw } from 'draft-js';

import { updateMainPosts,
	setHasMorePages,
	setNextPageNum } from 'actions';
import { Dialog,
	PostHeader,
	WritePostButton } from 'components';
import { ExpansionPost,
	PostForm } from 'containers';
import { NanoExpandIcon } from 'components/AppBarIcons';

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
const imagePlugin = createImagePlugin({decorator});
const videoPlugin = createVideoPlugin({decorator});

export class Board extends Component {
	state = {
		loadingContents: false,

		postFormOpen: false,

		dialogOpen: false,
		dialogIcon: null,
		dialogTitle: "",
		dialogContent: ""
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
		this.setState(state => ({[`expanded${id}`]: !state[`expanded${id}`]}));
		this.setState({[`editorState${id}`]: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.posts[id].content)))})
		console.log(this.state);
	}
	loadMore = () => {
		this.setState({loadingContents: true});
		console.log("loadMore");

		Axios.get("http://192.168.0.200:8080/board", { params: {token: this.props.token, page: this.props.nextPageNum} })
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
	render() {
		const { posts, hasMorePages, contentStyles, token } = this.props;
		const { loadingContents,
			postFormOpen,
			dialogOpen,
			dialogIcon,
			dialogTitle,
			dialogContent,
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
							_.map(posts, post =>
								<Grid item
									style={{width: "100%", minWidth: "390px"}}>
									<ExpansionPost
										id={post.id}
										onClick={this.expandPost}
										expanded={this.state[`expanded${post.id}`]}
										icon={<NanoExpandIcon fill="rgb(150,150,150)"/>}
										summary={
											<PostHeader
												expanded={this.state[`expanded${post.id}`]}
												title={post.title}
												writedate={moment(post.writedate).fromNow()}
												user={post.user}
												views={post.views}
												comments={_.values(post.comments).length}
												likes={post.likes}/>
										}>
										{
											this.state[`expanded${post.id}`] &&
												<div className={editorStyles.reader} onClick={this.focus}>
													<Editor editorState={this.state[`editorState${post.id}`]}
													 	onChange={editorState =>{ this.setState({[`editorState${post.id}`]: editorState}) } }
														plugins={[
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
										{
											// TODO: 댓글 및 따봉은 이곳에 ..
											// TODO: 댓글 및 따봉은 이곳에 ..
											// TODO: 댓글 및 따봉은 이곳에 ..
										}
									</ExpansionPost>
								</Grid>
							)
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
	updateMainPosts,
	setHasMorePages,
	setNextPageNum
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board));
