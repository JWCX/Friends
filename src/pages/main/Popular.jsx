import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import { composeDecorators } from 'draft-js-plugins-editor';
import { EditorState,
	convertFromRaw } from 'draft-js';

import { getPopularPosts } from 'actions';
import { PopularUser,
	PopularGroup,
	ExpansionPost } from 'containers';
import { CommentForm } from 'components';
import { NanoMedalIcon,
	NanoExpandIcon } from 'components/AppBarIcons';

import createMentionPlugin from 'draft-js-mention-plugin';

export class Popular extends Component {
	state = {
		openReply: false,
		postIdToReply: null,

		expanded: {}
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
		if(!this.state.expanded[id]) {
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
	const { contentStyles, users, groups, posts, index, token } = this.props;
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
							index.map(x =>
								<Grid item
									key={posts[x].id}
									style={{width: "100%"}}>
									<ExpansionPost
										popular
										id={posts[x].id}
										views={posts[x].views}
										likes={posts[x].likes}
										commentsCounter={_.values(posts[x].comments).length}
										post={posts[x]}
										editorState={this.state[`editorState${posts[x].id}`]}
										expanded={this.state.expanded[posts[x].id] === true}
										handleLike={()=>{this.handleLike(posts[x].id)}}
										openReplyForm={() => this.openReplyForm(posts[x].id)}
										onClick={this.expandPost}
										onChange={editorState =>{ this.setState({[`editorState${posts[x].id}`]: editorState}) }}
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
	posts: state.popularPosts,
	index: state.popularPostsIndex
})
const mapDispatchToProps = {
	getPopularPosts
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Popular));