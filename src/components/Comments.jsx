import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import Editor from 'draft-js-plugins-editor';
import { EditorState,
	convertFromRaw } from 'draft-js';

import { MiniUserAvatar } from 'components/Avatars';

import createEmojiPlugin from 'draft-js-emoji-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createAnchorPlugin from 'draft-js-anchor-plugin';
import createMentionPlugin from 'draft-js-mention-plugin';

import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-anchor-plugin/lib/plugin.css';
import 'assets/draftjs/draft-js-emoji-plugin/styles.css';
import 'assets/draftjs/draft-js-mention-plugin/styles.css';
import editorStyles from 'assets/draftjs/editorStyles.css';

const emojiPlugin = createEmojiPlugin();
const linkifyPlugin = createLinkifyPlugin();
const anchorPlugin = createAnchorPlugin();

const Common = styled.span`
	padding: 0 3px;
	transition: all .1s ease-in-out;
	height: 40px;
	line-height: 40px;
	border-radius: 5px;
	/* box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12); */
`
const UserContainer = styled(Common)`
	font-size: 0.8em;
	&:hover{
		color: rgb(100,100,255);
		cursor: pointer;
		/* transform: scale(1.1); */
	}
`

export class Comments extends Component {
	state = {
	}
	componentDidMount = () => {
		this.setState({content: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.comment.content)))})
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
			// else if(this.props.match.params[0] === "/")
			// 	path = "";
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
	handleLink = () => {
		let path;
		if(!this.props.match.params[0]) {
			if(this.props.location.pathname === "/")
				path = `me/${this.props.comment.user.id}`;
			else
				path = `${this.props.location.pathname}/me/${this.props.comment.user.id}` ;
		}
		// else if(this.props.match.params[0] === "/")
		// 	path = "";
		else
			path = `${this.props.match.params[0]}/me/${this.props.comment.user.id}`;
		this.props.history.push(path);
	}
	render() {
		const { comment, group } = this.props;
		return (
			<div>
			<UserContainer onClick={this.handleLink}>
				<MiniUserAvatar src={comment.user.image}/>
				&nbsp;&nbsp;
				<span>{comment.user.nickName}</span>
			</UserContainer>
			&nbsp;&nbsp;
			<span style={{color: "rgb(120,120,120)", fontSize: "0.7em"}}>{moment(comment.writedate).fromNow()}</span>
			{
				this.state.content &&
				<div className={group ? editorStyles.readerGroup : editorStyles.reader}>
					<Editor editorState={this.state.content}
						onChange={editorState => { this.setState({content: editorState}) } }
						plugins={[
							emojiPlugin,
							linkifyPlugin,
							anchorPlugin,
							this.mentionPlugin,
						]}
						readOnly={true}/>
				</div>
			}
			</div>
		)
	}
}

export default withRouter(Comments);