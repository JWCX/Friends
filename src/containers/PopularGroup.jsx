import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Grid } from '@material-ui/core';
import styled from 'styled-components';

import { NanoGroupNameIcon } from 'components/AppBarIcons';
import { PopularGroupAvatar } from 'components/Avatars';
import { LabelMini } from 'components';

const StyledCard = styled(Card)`
	width: 210px;
	padding: 5px 0;
	margin: 5px;
	transition: all .2s ease-in-out;
	cursor: pointer;
	box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
	&:hover {
		box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.3), 0px 2px 5px 0px rgba(0, 0, 0, 0.2), 0px 3px 4px -2px rgba(0, 0, 0, 0.15);
		background: rgb(200,230,255);
	}
`

export class PopularGroup extends Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.nickName !== nextProps.nickName)
			return true;
		return false;
	}
	handleClick = () => {
		this.props.history.push(`/group/${this.props.id}`);
	}
	render() {
		const { groupName, image } = this.props;
		return (
			<StyledCard
				style={{borderRadius: "10px"}}
				onClick={this.handleClick}>
				<Grid container
					direction="column"
					justify="space-around"
					alignItems="center"
					spacing={0}>
					<Grid item>
						<PopularGroupAvatar
							src={image}
							center/>
					</Grid>
					<Grid item style={{padding: "3px 8px 3px 0"}}>
						<LabelMini
							icon={ <NanoGroupNameIcon fill="#9966ff"/> }
							label={groupName}/>
					</Grid>
				</Grid>
			</StyledCard>
		)
	}
}

export default withRouter(PopularGroup);