import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Grid, Chip } from '@material-ui/core';
import styled from 'styled-components';

import { openMe } from 'actions';
import { LoggedInBadge, ManagerBadge, SubManagerBadge } from 'components/Badges';
import { NanoMarsIcon, NanoVenusIcon, NanoMysteryIcon } from 'components/AppBarIcons';
import { SmallAvatar } from 'components/Avatars';

const StyledCard = styled(Card)`
	width: 1000px;
	padding: 10px;
	transition: all .1s ease-in-out;
	margin: 10px;
	cursor: pointer;
	box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
	&:hover {
		box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.3), 0px 2px 5px 0px rgba(0, 0, 0, 0.2), 0px 3px 4px -2px rgba(0, 0, 0, 0.15);
	}
`

export class User extends Component {

	handleClick = () => {
		this.props.openMe(this.props.id);
	}

	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<StyledCard onClick={this.handleClick}>
					<Grid container
						direction="row"
						justify="center"
						alignItems="center"
						spacing={16}>
						<Grid item>
							<SubManagerBadge>
								<SmallAvatar
									alt="Adelle Charles"
									src={`https://picsum.photos/50/50?random`}/>
							</SubManagerBadge>
						</Grid>
						<Grid item>
							<NanoMarsIcon/>
							<div>이름은 세글자</div>
							<div>29</div>
						</Grid>
					</Grid>
				</StyledCard>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = {
	openMe
}

export default connect(mapStateToProps, mapDispatchToProps)(User);