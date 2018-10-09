import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import _ from 'lodash';
import { Grid,
	Divider } from '@material-ui/core';
import moment from 'moment';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import { EditorState,
	convertFromRaw } from 'draft-js';

import { getPopularPosts } from 'actions';
import { PopularUser,
	PopularGroup,
	ExpansionPost } from 'containers';
import { PostHeader,
	LikeButton,
	ReplyButton,
	Comments,
	CommentForm } from 'components';
import { NanoMedalIcon,
	NanoExpandIcon } from 'components/AppBarIcons';

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
import transitions from '@material-ui/core/styles/transitions';

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

export class Popular extends Component {
	state = {
		openReply: false,
		postIdToReply: null
	}
	mentionPlugin = createMentionPlugin({
		mentionComponent: (mentionProps) =>
		<span
			className={mentionProps.className}
			onClick={() => this.props.history.push(`${this.props.match.path === "/" ? "" : this.props.match.path}/me/${mentionProps.mention.id}`)}>
			{mentionProps.children}
		</span>
	});
	expandPost = id => {
		if(!this.state[`expanded${id}`]) {
			Axios.post(`${process.env.REACT_APP_DEV_API_URL}/board/read`, {
				token: this.props.token,
				id: id
			}).then(resp => {
				console.log(resp);	// FIXME: 지워주세용
				if(resp.data.increment) {
					const readPost = this.props.posts[id];
					readPost.views = readPost.views+1;
					this.props.getPopularPosts({...this.props.posts, [id]: readPost});
				}
			}).catch(err => {
				console.log(err.response);
			}); // FIXME: REMOVE LOG
		}
		this.setState(state => ({[`expanded${id}`]: !state[`expanded${id}`]}));
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
				this.props.getPopularPosts({...this.props.posts, [id]: likedPost});
			}).catch(err => {
				console.log(err.response);
			}); // FIXME: REMOVE LOG
	}
	openReplyForm = id => {
		this.setState({openReply: true, postIdToReply: id});
	}
	handleCloseCommentForm = () => {
		this.setState({openReply: false, postIdToReply: null});
	}
  render() {
	const { openReply, postIdToReply } = this.state;
	const { contentStyles, users, groups, posts, token } = this.props;
	return (
		<React.Fragment>
			<div style={{position:"relative", paddingTop:"5px"}}>
				<span style={{
					position: "absolute",
					zIndex:"1000",
					top:"-1px",
					left: "25px",
					background:"white",
					padding:"3px 15px",
					borderRadius:"10px",
					boxShadow: "0 1px 10px -1px rgba(120,120,120,0.3)"}}>
					<NanoMedalIcon fill="#ffb366"/>
					&nbsp;이달의 인기 유저</span>
				<div style={{
						position: "relative",
						borderRadius: "10px",
						boxShadow: "0 1px 10px -1px rgba(120,120,120,0.5)",
						margin: "10px 5px",
						overflowY: "hidden",
						overflowX: "auto",
						height: "215px",
						padding: "20px 10px",
					}}>
					<Grid container
						direction="row"
						justify="flex-start"
						alignItems="center"
						wrap="nowrap"
						spacing={0}>
						{
							users && _.map(users, user =>
								<Grid item
									key={user.id}>
									<PopularUser
										id={user.id}
										nickName={user.nickName}
										image={user.image}
										age={user.age}
										gender={user.gender}/>
								</Grid>
							)
						}
					</Grid>
				</div>
			</div>
			<div style={{position:"relative", paddingTop:"5px"}}>
				<span style={{
					position: "absolute",
					zIndex:"1000",
					top:"-1px",
					left: "25px",
					background:"white",
					padding:"3px 15px",
					borderRadius:"10px",
					boxShadow: "0 1px 10px -1px rgba(120,120,120,0.3)"}}>
					<NanoMedalIcon fill="#ffb366"/>
					&nbsp;이달의 인기 그룹</span>
				<div style={{
						position: "relative",
						borderRadius: "10px",
						boxShadow: "0 1px 10px -1px rgba(120,120,120,0.5)",
						margin: "10px 5px",
						overflowY: "hidden",
						overflowX: "auto",
						height: "215px",
						padding: "20px 10px",
					}}>
					<Grid container
						direction="row"
						justify="flex-start"
						alignItems="center"
						wrap="nowrap"
						spacing={0}>
						{
							groups && _.map(groups, group =>
								<Grid item
									key={group.id}>
									<PopularGroup
										id={group.id}
										groupName={group.groupName}
										image={group.image}/>
								</Grid>
							)
						}
					</Grid>
				</div>
			</div>
			<div style={{position:"relative", paddingTop:"5px"}}>
				<span style={{
					position: "absolute",
					zIndex:"1100",
					top:"-1px",
					left: "25px",
					background:"white",
					padding:"3px 15px",
					borderRadius:"10px",
					boxShadow: "0 1px 10px -1px rgba(120,120,120,0.3)"}}>
					<NanoMedalIcon fill="#ffb366"/>
					&nbsp;이달의 인기 게시글</span>
				<div
					className="hide-scroll"
					style={{...contentStyles, padding: "25px 10px 10px 10px"}}>
					<Grid container
						style={{padding: "5px"}}
						direction="row"
						justify="flex-start"
						alignItems="center"
						spacing={0}>
						{
							_.map(posts, post =>
								<Grid item
									key={post.id}
									style={{width: "100%"}}>
									<ExpansionPost
										id={post.id}
										onClick={this.expandPost}
										expanded={this.state[`expanded${post.id}`]}
										icon={<NanoExpandIcon fill="rgb(150,150,150)"/>}
										summary={
											<PostHeader
												expanded={this.state[`expanded${post.id}`]}
												handleLink={()=>{this.props.history.push(`/me/${post.user.id}`)}}
												title={post.title}
												writedate={moment(post.writedate).fromNow()}
												user={post.user}
												views={post.views}
												comments={_.values(post.comments).length}
												likes={post.likes}/>
										}>
										<div>
											{
												// <div className={editorStyles.reader}>
												// </div>
												this.state[`expanded${post.id}`] &&
												<div className={editorStyles.reader}>
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
											<div style={{paddingTop: "15px"}}>
												{
													_.map(post.comments, comment => <React.Fragment>
															<Comments comment={comment}/>
															<Divider style={{margin: "15px 1px 5px 2px"}}/>
														</React.Fragment>
													)
												}
											</div>
											<div style={{position: "relative", height: "80px", width: "975px", textAlign: "center"}}>
												<LikeButton
													onClick={() => this.handleLike(post.id)}
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
								type="popular"
								token={token}
								postId={postIdToReply}
								open={openReply}
								handleClose={this.handleCloseCommentForm}/>
						}
					</Grid>
				</div>
			</div>
		</React.Fragment>
	)
  }
}

const mapStateToProps = state => ({
	token: state.token,
	users: state.popularUsers,
	groups: state.popularGroups,
	posts: state.popularPosts
})
const mapDispatchToProps = {
	getPopularPosts
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Popular));
