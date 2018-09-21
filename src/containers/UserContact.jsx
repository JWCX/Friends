import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Grid } from '@material-ui/core';
import styled from 'styled-components';

import { LoggedInBadge } from 'components/Badges';
import { SmallUserAvatar } from 'components/Avatars';
import { LabelTiny } from 'components';

const StyledCard = styled(Card)`
	position: relative;
	width: ${props => props.openChatbox ? "60px" : "415px" };
	padding: ${props => props.openChatbox ? "5px 5px" : "5px 20px" };
	opacity: ${props => props.openChatbox && props.id !== props.currentid ? "0.3" : "1" };
	margin: 5px;
	transition: all .1s ease-in-out;
	cursor: pointer;
	box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
	&:hover {
		box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.3), 0px 2px 5px 0px rgba(0, 0, 0, 0.2), 0px 3px 4px -2px rgba(0, 0, 0, 0.15);
		opacity: 1;
	}
`

export class UserMini extends Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.nickName !== nextProps.nickName ||
			this.props.online !== nextProps.online ||
			this.props.image !== nextProps.image ||
			this.props.openChatbox !== nextProps.openChatbox ||
			this.props.id !== nextProps.id ||
			this.props.currentid !== nextProps.currentid )
			return true;
		return false;
	}
	render() {
		const { id, currentid, roomid, nickName, image, online, openChatbox, handleOpenChatbox } = this.props;
		console.log("tt",openChatbox);
		return (
			<StyledCard
				openChatbox={openChatbox}
				id={id}
				currentid={currentid}
				onClick={() => handleOpenChatbox(id, roomid)}>
				<Grid container
					direction="row"
					justify="flex-start"
					alignItems="center"
					wrap="nowrap"
					spacing={0}>
					<Grid item>
					{
						online ? <LoggedInBadge>
									<SmallUserAvatar
										// alt={nickName}
										src={image}/>
									</LoggedInBadge>
								: <SmallUserAvatar
									// alt={nickName}
									src={image}/>
					}
					</Grid>
					<Grid item>
						<LabelTiny
							hidden={openChatbox}
							width="230px"
							label={nickName}/>
						{/* <LabelTiny
							width="230px"
							label={nickName}/> */}
					</Grid>
				</Grid>
			</StyledCard>
		)
	}
}

export default withRouter(UserMini);