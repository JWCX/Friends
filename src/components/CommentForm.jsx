import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import _ from 'lodash';
import Editor from 'draft-js-plugins-editor';
import { EditorState,
	convertToRaw } from 'draft-js';
import { Grid,
	Dialog as MuiDialog } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { getMainPosts,
	getPopularPosts,
	getGroupPosts } from 'actions';
import { Dialog,
	MiniReplyButton,
	CancelButton } from 'components';

import createFocusPlugin from 'draft-js-focus-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';

import 'draft-js-linkify-plugin/lib/plugin.css';
import 'assets/draftjs/draft-js-emoji-plugin/styles.css';
import 'assets/draftjs/draft-js-mention-plugin/styles.css';
import editorStyles from 'assets/draftjs/editorStyles.css';

const focusPlugin = createFocusPlugin();
const emojiPlugin = createEmojiPlugin();
const linkifyPlugin = createLinkifyPlugin();
const { EmojiSuggestions } = emojiPlugin;

const styles = {
	paper: {
		position: "relative",
		padding: "20px 20px 20px 20px",
		minWidth:"650px",
		width:"1065px",
		maxWidth: "1065px",
		height: "140px",
		maxHeight: "100vh",
		overflow: "visible",
		borderRadius: "10px",
		margin: "0",
		transition: "all 0.2s ease-in-out"
	},
	groupPaper: {
		position: "relative",
		padding: "20px 20px 20px 20px",
		minWidth:"650px",
		width:"870px",
		maxWidth: "1065px",
		height: "140px",
		maxHeight: "100vh",
		overflow: "visible",
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


export class CommentForm extends Component {
	state = {
		editorState: EditorState.createEmpty(),

		friends: null,
		suggestions: null,

		process: false,

		dialogOpen: false,
		dialogIcon: null,
		dialogTitle: "",
		dialogContent: ""
	};
	componentDidMount() {
		this.setState({friends: _.map(this.props.myFriends, friend => ({name: friend.nickName, avatar: friend.image, id: friend.id}))});
		this.setState({suggestions: _.map(this.props.myFriends, friend => ({name: friend.nickName, avatar: friend.image, id: friend.id}))});
	}
	mentionPlugin = createMentionPlugin({
		mentionComponent: (mentionProps) => {
			let path;
			if(!this.props.match.params[0]) {
				if(this.props.location.pathname === "/")
					path = `me/${mentionProps.mention.id}`;
				else
					path = `${this.props.location.pathname}/me/${mentionProps.mention.id}` ;
			}
			else
				path = `${this.props.match.params[0]}/me/${mentionProps.mention.id}`;
			return (
				<span
					className={mentionProps.className}
					onClick={() => this.props.history.push(path)}>
					{mentionProps.children}
				</span>
			)
		}
	});
	onChange = editorState => {
		this.setState({editorState});
	}
	onSearchChange = ({value}) => {
		this.setState({suggestions: defaultSuggestionsFilter(value, this.state.friends)});
	};
	focus = () => {
		this.editor.focus();
	}
	handleSubmit = () => {
		const route = this.props.type === "group" ? `${process.env.REACT_APP_DEV_API_URL}/group/board/comment` : `${process.env.REACT_APP_DEV_API_URL}/board/comment`;

		console.log("type: ", this.props.type);
		console.log("route: ", route);
		console.log("token : ", this.props.token);
		console.log("postid : ", this.props.postId);
		console.log("content : ", JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())));

		// let newComments;	//TODO: TESTCODE>>DELETE
		// let updatedPost;	//TODO: TESTCODE>>DELETE
		// switch(this.props.type) {		//TODO: TESTCODE>>DELETE
		// 	case "board":
		// 		newComments = {
		// 			...this.props.mainPosts[this.props.postId].comments,//TODO: TESTCODE>>DELETE
		// 			1000: {id:1000, user:{id: 1, nickName:"새댓글맨", image:"https://picsum.photos/200/201"}, content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())), writedate: new Date()}
		// 		};
		// 		updatedPost = {...this.props.mainPosts[this.props.postId]};//TODO: TESTCODE>>DELETE
		// 		updatedPost.comments = newComments;
		// 		this.props.getMainPosts({...this.props.mainPosts, [this.props.postId]: updatedPost});
		// 		break;
		// 	case "popular"://TODO: TESTCODE>>DELETE
		// 		newComments = {
		// 			...this.props.popularPosts[this.props.postId].comments,//TODO: TESTCODE>>DELETE
		// 			1000: {id:1000, user:{id: 1, nickName:"새댓글맨", image:"https://picsum.photos/200/201"}, content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())), writedate: new Date()}
		// 		};
		// 		updatedPost = {...this.props.popularPosts[this.props.postId]};//TODO: TESTCODE>>DELETE
		// 		updatedPost.comments = newComments;//TODO: TESTCODE>>DELETE
		// 		this.props.getPopularPosts({...this.props.popularPosts, [this.props.postId]: updatedPost});
		// 		break;
		// 	case "group":
		// 		newComments = {//TODO: TESTCODE>>DELETE
		// 			...this.props.groupPosts[this.props.postId].comments,//TODO: TESTCODE>>DELETE
		// 			1000: {id:1000, user:{id: 1, nickName:"새댓글맨", image:"https://picsum.photos/200/201"}, content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())), writedate: new Date()}
		// 		};
		// 		updatedPost = {...this.props.groupPosts[this.props.postId]};
		// 		updatedPost.comments = newComments;//TODO: TESTCODE>>DELETE
		// 		this.props.getGroupPosts({...this.props.groupPosts, [this.props.postId]: updatedPost});
		// 		break;	//TODO: TESTCODE>>DELETE
		// 	default:	//TODO: TESTCODE>>DELETE
		// }				//TODO: TESTCODE>>DELETE
		// this.props.handleClose();	//TODO: TESTCODE>>DELETE

		this.setState({process: true});
		Axios.post(route, {
			token: this.props.token,
			id: this.props.postId,
			content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
		}).then(resp => {
			console.log(resp);	// FIXME: 지워주세용
			let updatedPost;
			switch(this.props.type) {
				case "board":
					updatedPost = {...this.props.mainPosts[this.props.postId]};
					updatedPost.comments = resp.data.comments;
					this.props.getMainPosts({...this.props.mainPosts, [this.props.postId]: updatedPost});
					break;
				case "popular":
					updatedPost = {...this.props.popularPosts[this.props.postId]};
					updatedPost.comments = resp.data.comments;
					this.props.getPopularPosts({...this.props.popularPosts, [this.props.postId]: updatedPost});
					break;
				case "group":
					updatedPost = {...this.props.groupPosts[this.props.postId]};
					updatedPost.comments = resp.data.comments;
					this.props.getGroupPosts({...this.props.groupPosts, [this.props.postId]: updatedPost});
					break;
				default:
			}
			this.props.handleClose();
		}).catch(err => {
			console.log(err.response);
			this.setState({process: false,
				dialogOpen: true,
				dialogIcon: 2,
				dialogTitle: "서버와 연결할 수 없습니다",
				dialogContent: "잠시후 다시 시도해주세요..",
			});
		}); // FIXME: REMOVE LOG
	}
	handleDialogClose = () => {
		this.setState({ dialogOpen: false,
			dialogIcon: 0,
			dialogTitle:"",
			dialogContent:"" });
	}
	render() {
		const { MentionSuggestions } = this.mentionPlugin;
		const { dialogOpen,
			dialogIcon,
			dialogTitle,
			dialogContent,
			editorState,
			suggestions,
			process
		} = this.state;
		const { classes, open, handleClose, type } = this.props;

		return (
			<MuiDialog
				classes={{paper: type === "group" ? classes.groupPaper : classes.paper, paperWidthXs: classes.paperWidthXs}}
				disableBackdropClick={true}
				onClose={null}
				aria-labelledby="simple-dialog-title"
				open={open}
				disableEscapeKeyDown={true}
				>
				<Grid container
					direction="column"
					justify="center"
					alignItems="center"
					spacing={16}>
					<Grid item>
						<div className={type === "group" ? editorStyles.editorCommentGroup : editorStyles.editorComment} onClick={this.focus}>
							<Editor editorState={editorState}
								onChange={this.onChange}
								plugins={[
									emojiPlugin,
									linkifyPlugin,
									focusPlugin,
									this.mentionPlugin,
								]}
								ref={element => this.editor = element}
								readOnly={process}
								/>
							<EmojiSuggestions/>
							<MentionSuggestions
								onSearchChange={this.onSearchChange}
								suggestions={suggestions}/>
						</div>
					</Grid>
					<Grid item>
						<MiniReplyButton
							onClick={this.handleSubmit}
							fill="rgb(120,120,120)"
							sfill="rgb(60,60,255)"
							align/>
					</Grid>
					<Grid item>
						<CancelButton
							onClick={handleClose}
							fill="rgb(120,120,120)"
							sfill="rgb(255,100,100)"
							align/>
					</Grid>
				</Grid>
				<Dialog
					open={dialogOpen}
					onClose={this.handleDialogClose}
					title={dialogTitle}
					content={dialogContent}
					icon={dialogIcon}
					/>
			</MuiDialog>
		)
	}
}

const mapStateToProps = state => ({
	myFriends: state.myFriends,
	mainPosts: state.mainPosts,
	popularPosts: state.popularPosts,
	groupPosts: state.groupPosts,
})
const mapDispatchToProps = {
	getMainPosts,
	getPopularPosts,
	getGroupPosts
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CommentForm)));