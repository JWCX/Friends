import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import { MiniUserAvatar } from 'components/Avatars';
import { NanoLikeIcon,
	NanoCommentIcon,
	NanoViewIcon,
	NanoTimeIcon } from 'components/AppBarIcons';

const Common = styled.div`
	padding: 0 3px;
	transition: all .1s ease-in-out;
	height: 40px;
	line-height: 40px;
	border-radius: 5px;
	/* box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12); */
`
const TitleContainer = styled(Common)`
	width: 41%;
	font-size: 0.9em;
`
const UserContainer = styled(Common)`
	width: 20%;
	font-size: 0.8em;
	&:hover{
		color: rgb(100,100,255);
		/* transform: scale(1.1); */
	}
`
const WriteDateContainer = styled(Common)`
	width: 15%;
	font-size: 0.8em;
`
const CountsContainer = styled(Common)`
	width: 8%;
	font-size: 0.8em;
`

export class PostHeader extends Component {
	shouldComponentUpdate(nextProps) {
		if( this.props.writedate !== nextProps.writedate ||
			this.props.views !== nextProps.views ||
			this.props.comments !== nextProps.comments ||
			this.props.likes !== nextProps.likes ||
			this.props.expanded !== nextProps.expanded ) {
				console.log("postheader:writedate : ", this.props.writedate !== nextProps.writedate)
				console.log("postheader:views : ", this.props.views !== nextProps.views)
				console.log("postheader:comments : ", this.props.comments !== nextProps.comments)
				console.log("postheader:likes : ", this.props.likes !== nextProps.likes)
				console.log("postheader:expanded : ", this.props.expanded !== nextProps.expanded)
				return true;
		}
		return false;
	}
	render() {
		const { title, writedate, user, views, comments, likes, expanded } = this.props;
		return (
			<React.Fragment>
				<TitleContainer>
					{title}
				</TitleContainer>
				<UserContainer onClick={this.props.handleLink}>
					<Grid container
						direction="row"
						wrap="nowrap"
						spacing={8}>
						<Grid item>
							<MiniUserAvatar src={user.image}/>
						</Grid>
						<Grid item>
							<span>{user.nickName}</span>
						</Grid>
					</Grid>
				</UserContainer>
				<WriteDateContainer>
					<NanoTimeIcon fill={ expanded ? "rgb(80,80,80)" : "rgb(180,180,180)"}/>
					<span style={{verticalAlign:"top"}}>{writedate}</span>
				</WriteDateContainer>
				<CountsContainer>
					<NanoViewIcon fill={ expanded ? "rgb(80,80,80)" : "rgb(180,180,180)"}/>
					<span style={{verticalAlign:"top"}}>{views}</span>
				</CountsContainer>
				<CountsContainer>
					<NanoLikeIcon fill={ expanded ? "rgb(255,100,100)" : "rgb(180,180,180)"}/>
					<span style={{verticalAlign:"top"}}>{likes}</span>
				</CountsContainer>
				<CountsContainer>
					<NanoCommentIcon fill={ expanded ? "rgb(100,100,255)" : "rgb(180,180,180)"}/>
					<span style={{verticalAlign:"top"}}>{comments}</span>
				</CountsContainer>
				<div>
				</div>
			</React.Fragment>
		)
	}
}

export default withRouter(PostHeader);