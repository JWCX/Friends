import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Grid } from '@material-ui/core';
import _ from 'lodash';
import styled from 'styled-components';

import { LoggedInBadge, UnreadChatBadge } from 'components/Badges';
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
			this.props.messages !== nextProps.messages ||
			this.props.currentid !== nextProps.currentid )
			return true;
		return false;
	}
	render() {
		const { id, currentid, roomid, nickName, image, online, openChatbox, handleOpenChatbox, messages } = this.props;
		const unreadCount = _.filter(messages, message => message.roomid == roomid && message.readyn === 0).length;
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
						online ? <UnreadChatBadge content={currentid === 0 ? 0 : unreadCount}>
									<LoggedInBadge>
										<SmallUserAvatar
											// alt={nickName}
											src={image}/>
									</LoggedInBadge>
								</UnreadChatBadge>
								: <UnreadChatBadge content={currentid === 0 ? 0 : unreadCount}>
									<SmallUserAvatar
									// alt={nickName}
									src={image}/>
								</UnreadChatBadge>
					}
					</Grid>
					<Grid item>
						<LabelTiny
							hidden={openChatbox}
							width="295px"
							label={nickName}/>
					</Grid>
					{
						!openChatbox && unreadCount!==0 && <Grid item>
							<div style={{
								display: "inline-block",
								position: "relative",
								right: "5px",
								width: "22px",
								height: "22px",
								border: "1px solid rgba(255,255,255,0.5)",
								borderRadius: "100%",
								boxShadow: "0 0 10px -2px rgba(255,100,100)",
								background: "linear-gradient(45deg, #ff4f4f 5%, #fff74f 200%)",
								color: "white",
								textAlign: "center",
								fontSize: "0.8em"
							}}>
								{unreadCount}
							</div>
						</Grid>
					}
				</Grid>
			</StyledCard>
		)
	}
}

const mapStateToProps = state => ({
	messages: state.messages
})
const mapDispatchToProps = {

}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserMini));