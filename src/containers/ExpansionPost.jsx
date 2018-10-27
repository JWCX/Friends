import React from 'react'
import _ from 'lodash';
import moment from 'moment';
import { ExpansionPanel,
		ExpansionPanelSummary,
		ExpansionPanelDetails,
		Divider
	} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

import { LikeButton,
		ReplyButton,
		Comments,
		PostHeader } from 'components';

import Editor, { composeDecorators } from 'draft-js-plugins-editor';

import createMyMapPlugin from 'assets/draftjs/draft-js-mymap-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createAnchorPlugin from 'draft-js-anchor-plugin';

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


const MyExPan = styled(ExpansionPanel)`
	width: 100%;
	display: inline-block;
	position: ${props => props.position};
	top: ${props => props.top};
	z-index:1000;
	&:hover {
		background: ${props => !props.expanded && "rgb(200,230,255)"};
	}
`

const styles = {
	root: {
		display: "flex",
		position: "relative",
		left: "50%",
		transform: "translateX(-50%)",
		width: "975px",
		padding: "0 0 15px",
	}
}

class ExpansionPost extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		if(this.props.expanded !== nextProps.expanded ||
			this.props.views !== nextProps.views ||
			this.props.likes !== nextProps.likes ||
			this.props.commentsCounter !== nextProps.commentsCounter ||
			this.props.editorState !== nextProps.editorState ||
			this.props.id !== nextProps.id)
			return true;
		return false;
	}
	render() {
		const { group, id, icon, commentsCounter,
			post, editorState, expanded, mentionPlugin,
			handleLike, openReplyForm,
			onChange, onClick,
			history, match } = this.props;
			console.log("HH",history)
			console.log("MM",match)
		return (
			<MyExPan style={{
					margin: expanded && "15px 0",
					borderRadius: "10px",
					transition: "all 0.2s ease-in-out",
				}}
				expanded={expanded}>
				<ExpansionPanelSummary
					onClick={()=>{onClick(id)}}
					expandIcon={icon}>
					<PostHeader
						expanded={expanded}
						handleLink={()=>{ group ? history.push(`${match.params[0]}/me/${post.user.id}`) : history.push(`${match.path}/me/${post.user.id}`) }}
						title={post.title}
						writedate={moment(post.writedate).fromNow()}
						user={post.user}
						views={post.views}
						comments={commentsCounter}
						likes={post.likes}/>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails
					classes={{root: this.props.classes.root}}
					style={{width: group ? "780px" : "975px" }}>
					{
						expanded === true &&
						<div>
							<div className={group ? editorStyles.readerGroup : editorStyles.reader}>
								<Editor editorState={editorState}
									onChange={onChange}
									plugins={[
										myMapPlugin,
										emojiPlugin,
										linkifyPlugin,
										videoPlugin,
										imagePlugin,
										resizeablePlugin,
										alignmentPlugin,
										anchorPlugin,
										mentionPlugin,
									]}
									readOnly={true}/>
							</div>
							<div style={{paddingTop: "15px"}}>
								{
									_.map(post.comments, comment => <React.Fragment>
											<Comments
												comment={comment}
												group={group}/>
											<Divider style={{margin: "15px 1px 5px 2px"}}/>
										</React.Fragment>
									)
								}
							</div>
							<div style={{position: "relative", height: "80px", width: group ? "780px" : "975px", textAlign: "center"}}>
								<LikeButton
									onClick={handleLike}
									selected={post.liked}/>
								&nbsp;&nbsp;&nbsp;&nbsp;
								<ReplyButton onClick={openReplyForm}/>
							</div>
						</div>
					}
				</ExpansionPanelDetails>
			</MyExPan>
		)
	}
}
export default withStyles(styles)(ExpansionPost);
