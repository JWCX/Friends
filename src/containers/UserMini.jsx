import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Grid } from '@material-ui/core';
import styled from 'styled-components';

import { LoggedInBadge } from 'components/Badges';
import { NanoMarsIcon, NanoVenusIcon, NanoMysteryIcon } from 'components/AppBarIcons';
import { SmallUserAvatar } from 'components/Avatars';
import { LabelMini } from 'components';

const StyledCard = styled(Card)`
	width: 300px;
	padding: 5px 10px;
	transition: all .1s ease-in-out;
	cursor: pointer;
	box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
	&:hover {
		box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.3), 0px 2px 5px 0px rgba(0, 0, 0, 0.2), 0px 3px 4px -2px rgba(0, 0, 0, 0.15);
	}
`

export class UserMini extends Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.nickName !== nextProps.nickName)
			return true;
		return false;
	}
	handleClick = () => {
		this.props.history.push(`${this.props.match.params[0]}/me/${this.props.id}`);
	}
	render() {
		const { nickName, image, gender, online } = this.props;
		return (
			<StyledCard onClick={this.handleClick}>
				<Grid container
					direction="row"
					justify="flex-start"
					alignItems="center"
					spacing={8}>
					<Grid item>
					{
						online ? <LoggedInBadge>
									<SmallUserAvatar
										alt={nickName}
										src={image}/>
									</LoggedInBadge>
								: <SmallUserAvatar
									alt={nickName}
									src={image}/>
					}
					</Grid>
					<Grid item>
						<LabelMini
							icon={
								!gender || gender=="0" ? <NanoMysteryIcon padding="0 0 6px 0"/> :
								gender=="1" ? <NanoMarsIcon padding="0 0 1px 0"/> :
								<NanoVenusIcon padding="0 0 1px 0"/>}
							label={nickName}
						/>
					</Grid>
				</Grid>
			</StyledCard>
		)
	}
}

export default withRouter(UserMini);