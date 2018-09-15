import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Grid } from '@material-ui/core';
import styled from 'styled-components';

import { openMePage } from 'actions';
import { LoggedInBadge } from 'components/Badges';
import { NanoMarsIcon, NanoVenusIcon, NanoMysteryIcon } from 'components/AppBarIcons';
import { SmallUserAvatar } from 'components/Avatars';
import { LabelMini } from 'components';

const StyledCard = styled(Card)`
	width: 300px;
	padding: 5px 0;
	transition: all .1s ease-in-out;
	cursor: pointer;
	box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
	&:hover {
		box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.3), 0px 2px 5px 0px rgba(0, 0, 0, 0.2), 0px 3px 4px -2px rgba(0, 0, 0, 0.15);
	}
`

export class UserMini extends Component {

	handleClick = () => {
		this.props.openMePage(this.props.id);
		this.props.history.push(`${this.props.match.params[0]}/me/${this.props.id}`);
	}

	render() {
		const { nickName, image, gender, online } = this.props;
		return (
			<StyledCard onClick={this.handleClick}>
				<Grid container
					direction="row"
					justify="center"
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
							icon={!gender || gender==="0" ? <NanoMysteryIcon padding="0 0 6px 0"/> : gender==="1" ? <NanoMarsIcon padding="0 0 1px 0"/> : <NanoVenusIcon padding="0 0 1px 0"/>}
							label={nickName}
						/>
					</Grid>
				</Grid>
			</StyledCard>
		)
	}
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = {
	openMePage
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserMini));