import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Grid } from '@material-ui/core';
import styled from 'styled-components';

import { openMePage } from 'actions';
import { SmallGroupAvatar } from 'components/Avatars';
import { GroupLabelMini } from 'components';

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

export class GroupMini extends Component {

	handleClick = () => {
		this.props.openMePage(this.props.id);
	}

	render() {
		const { groupName, image } = this.props;
		return (
			<StyledCard onClick={this.handleClick}>
				<Grid container
					direction="row"
					justify="flex-start"
					alignItems="center"
					spacing={8}>
					<Grid item>
						<SmallGroupAvatar
							alt={groupName}
							src={image}/>
					</Grid>
					<Grid item>
						<GroupLabelMini
							label={groupName}
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupMini);