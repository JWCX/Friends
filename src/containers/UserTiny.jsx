import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Grid } from '@material-ui/core';
import styled from 'styled-components';

import { MiniUserAvatar } from 'components/Avatars';
import { LabelTiny } from 'components';

const StyledCard = styled(Card)`
	width: 220px;
	padding: 5px 0;
	transition: all .1s ease-in-out;
	cursor: pointer;
	/* box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12); */
	&:hover {
		box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.3), 0px 2px 5px 0px rgba(0, 0, 0, 0.2), 0px 3px 4px -2px rgba(0, 0, 0, 0.15);
	}
`

export class UserTiny extends Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.nickName !== nextProps.nickName)
			return true;
		return false;
	}
	render() {
		const { nickName, image } = this.props;
		return (
			<StyledCard>
				<Grid container
					direction="row"
					justify="center"
					alignItems="center"
					spacing={8}>
					<Grid item>
						<MiniUserAvatar src={image}/>
					</Grid>
					<Grid item>
						<LabelTiny label={nickName}/>
					</Grid>
				</Grid>
			</StyledCard>
		)
	}
}

export default withRouter(UserTiny);