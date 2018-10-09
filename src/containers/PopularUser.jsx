import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Grid } from '@material-ui/core';
import styled from 'styled-components';

import { NanoMarsIcon,
	NanoVenusIcon,
	NanoMysteryIcon,
} from 'components/AppBarIcons';
import { LargeUserAvatar } from 'components/Avatars';
import { LabelMini } from 'components';

const StyledCard = styled(Card)`
	width: 150px;
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

export class PopularUser extends Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.nickName !== nextProps.nickName)
			return true;
		return false;
	}
	handleClick = () => {
		this.props.history.push(`/me/${this.props.id}`);
	}
	render() {
		const { gender, nickName, age, image } = this.props;
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
						<LargeUserAvatar
							src={image}
							center/>
					</Grid>
					<Grid item style={{padding: "3px 5px 3px 0"}}>
						<LabelMini
							icon={
								!gender || gender=="0" ? <NanoMysteryIcon padding="0 0 6px 0"/> :
								gender=="1" ? <NanoMarsIcon padding="0 0 1px 0"/> :
								<NanoVenusIcon padding="0 0 1px 0"/>}
							label={<React.Fragment>
										{nickName}
										<span style={{color:"rgb(120,120,120)", fontSize:"0.8em"}}>
											&nbsp;( {!age ? <NanoMysteryIcon padding="0 0 3px 0"/> : age} )
										</span>
									</React.Fragment>}
							/>
					</Grid>
				</Grid>
			</StyledCard>
		)
	}
}

export default withRouter(PopularUser);