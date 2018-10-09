import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import _ from 'lodash';
import { Dialog as MuiDialog,
	Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { getMainPosts,
	setNextPageNum,
	setHasMorePages } from 'actions';
import { Button,
	AddMapButton,
	Dialog } from 'components';

import { EditorState,
	convertToRaw } from 'draft-js';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';

import createEmojiPlugin from 'draft-js-emoji-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createAnchorPlugin from 'draft-js-anchor-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import { ItalicButton,
	BoldButton,
	UnderlineButton,
	HeadlineOneButton,
	HeadlineTwoButton,
	UnorderedListButton,
	OrderedListButton,
	BlockquoteButton,
} from 'draft-js-buttons';

import createVideoPlugin from 'draft-js-video-plugin';
import VideoAdd from 'assets/draftjs/draft-js-video-plugin/VideoAdd';

import createImagePlugin from 'draft-js-image-plugin';
import ImageAdd from 'assets/draftjs/draft-js-image-plugin/ImageAdd';

import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';

import createDragNDropUploadPlugin from 'assets/draftjs/draft-js-drag-n-drop-upload-plugin';
import mockUpload from 'assets/draftjs/draft-js-drag-n-drop-upload-plugin/utils/mockUpload';

import 'assets/draftjs/draft-js-emoji-plugin/styles.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js-focus-plugin/lib/plugin.css';
import 'draft-js-alignment-plugin/lib/plugin.css';
import 'draft-js-anchor-plugin/lib/plugin.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'assets/draftjs/draft-js-mention-plugin/styles.css';
import editorStyles from 'assets/draftjs/editorStyles.css';

const styles = {
	paper: {
		position: "relative",
		padding: "20px 20px 20px 20px",
		minWidth:"650px",
		width:"1025px",
		maxWidth: "1050px",
		// minWidth: "1800px",
		// minHeight: "850px",
		height: "760px",
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

const emojiPlugin = createEmojiPlugin();
const linkifyPlugin = createLinkifyPlugin();
const anchorPlugin = createAnchorPlugin();
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const inlineToolBarPlugin = createInlineToolbarPlugin({
	structure: [
		BoldButton,
		ItalicButton,
		UnderlineButton,
		HeadlineOneButton,
		HeadlineTwoButton,
		UnorderedListButton,
		OrderedListButton,
		BlockquoteButton,
		anchorPlugin.LinkButton,
	]
});

const { EmojiSuggestions } = emojiPlugin;
const { AlignmentTool } = alignmentPlugin;
const { InlineToolbar } = inlineToolBarPlugin;

const decorator = composeDecorators(
	resizeablePlugin.decorator,
	alignmentPlugin.decorator,
	focusPlugin.decorator,
	blockDndPlugin.decorator,
)
const imagePlugin = createImagePlugin({decorator});
const videoPlugin = createVideoPlugin({decorator});
const dragNDropUploadPlugin = createDragNDropUploadPlugin({
	handleUpload: mockUpload,
	addImage: imagePlugin.addImage,
});

export class PostForm extends Component {
	state = {
		open: true,
		title: "",
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
	mentionPlugin = (() => {
		const suggestions = this.state.suggestions;
		return createMentionPlugin({
			suggestions,
			mentionComponent: (mentionProps) =>
			<span
				className={mentionProps.className}
				onClick={() => this.props.history.push(`${this.props.match.path}/me/${mentionProps.mention.id}`)}>
				{mentionProps.children}
			</span>
		});
	})();
	handleSubmit = () => {
		console.log("token : ", this.props.token);
		console.log("TITLE : ", this.state.title);
		console.log("content : ", JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())));

		this.setState({process: true});

		Axios.post(`${process.env.REACT_APP_DEV_API_URL}/board`, {
			token: this.props.token,
			title: this.state.title,
			content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
		}).then(resp => {
			console.log(resp);	// FIXME: 지워주세용
			this.props.getMainPosts(resp.data.posts);
			this.props.setHasMorePages(resp.data.hasMorePages);
			this.props.setNextPageNum(2);
			this.setState({process: false,
				dialogOpen: true,
				dialogIcon: 1,
				dialogTitle: "글이 등록되었습니다",
				complete: true
			});
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
	handleTitleChange = ({target}) => {
		this.setState({title: target.value});
	}
	onChange = editorState => {
		this.setState({editorState});
	}
	onSearchChange = ({value}) => {
		this.setState({suggestions: defaultSuggestionsFilter(value, this.state.friends)});
	};
	focus = () => {
		this.editor.focus();
	}
	handleDialogClose = () => {
		this.setState({ dialogOpen: false,
			dialogIcon: 0,
			dialogTitle:"",
			dialogContent:"" });
		if(this.state.complete)
			this.props.handleClose();
	}
	render() {
		const { MentionSuggestions } = this.mentionPlugin;
		const { classes, disableBackdrop, open, handleClose } = this.props;
		const { dialogOpen,
			dialogIcon,
			dialogTitle,
			dialogContent,
			title,
			editorState,
			suggestions,
			process
		} = this.state;
		return (
			<MuiDialog
				classes={{paper: classes.paper, paperWidthXs: classes.paperWidthXs}}
				disableBackdropClick={disableBackdrop}
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
					<Grid item
					 	container
						direction="row"
						justify="center"
						alignItems="center"
						spacing={8}>
						<Grid item>
							<input
								className={editorStyles.title}
								id="title"
								placeholder="제목을 입력하세요.."
								value={title}
								readOnly={process}
								onChange={this.handleTitleChange}/>
						</Grid>
						<Grid item>
							<VideoAdd
								editorState={editorState}
								onChange={this.onChange}
								disabled={process}
								modifier={videoPlugin.addVideo}/>
						</Grid>
						<Grid item>
							<ImageAdd
								editorState={editorState}
								onChange={this.onChange}
								disabled={process}
								modifier={imagePlugin.addImage}/>
						</Grid>
						<Grid item>
							<AddMapButton
								onChange={this.onChange}
								disabled={process}
								modifier={imagePlugin.addImage}/>
						</Grid>
					</Grid>
					<Grid item>
						<div className={editorStyles.editor} onClick={this.focus}>
							<Editor editorState={editorState}
								onChange={this.onChange}
								plugins={[
									emojiPlugin,
									linkifyPlugin,
									videoPlugin,
									imagePlugin,
									focusPlugin,
									resizeablePlugin,
									blockDndPlugin,
									alignmentPlugin,
									dragNDropUploadPlugin,
									anchorPlugin,
									this.mentionPlugin,
									inlineToolBarPlugin
								]}
								ref={element => this.editor = element}
								readOnly={process}
								/>
							<InlineToolbar/>
							<EmojiSuggestions/>
							<AlignmentTool/>
							<MentionSuggestions
								onSearchChange={this.onSearchChange}
								suggestions={suggestions}/>
						</div>
					</Grid>
					<Grid item>
						<Button
							disabled={process}
							process={process}
							onClick={this.handleSubmit}
							margin="5px 5px 0 5px">
							작성
						</Button>
						<Button
							disabled={process}
							onClick={handleClose}
							margin="5px 5px 0 5px">
							취소
						</Button>
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

})
const mapDispatchToProps = {
	getMainPosts,
	setNextPageNum,
	setHasMorePages
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PostForm)));