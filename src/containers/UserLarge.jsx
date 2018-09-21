import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Grid } from '@material-ui/core';
import styled from 'styled-components';

import { NanoMarsIcon,
	NanoVenusIcon,
	NanoMysteryIcon,
	NanoStarIcon,
	NanoMapIcon,
} from 'components/AppBarIcons';
import { InterestChip } from 'components/Chips';
import { LargeUserAvatar } from 'components/Avatars';
import { LabelMini } from 'components';

const StyledCard = styled(Card)`
	/* width: 400px; */
	/* min-width: 400px;
	width: 100%; */
	padding: 5px 0;
	/* margin: 5px; */
	transition: all .1s ease-in-out;
	cursor: pointer;
	box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
	&:hover {
		box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.3), 0px 2px 5px 0px rgba(0, 0, 0, 0.2), 0px 3px 4px -2px rgba(0, 0, 0, 0.15);
	}
`

export class UserLarge extends Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.nickName !== nextProps.nickName)
			return true;
		return false;
	}
	handleClick = () => {
		this.props.history.push(`${this.props.match.path}/me/${this.props.id}`);
	}
	render() {

		const { dataSi, dataGu, dataInterest,
			 gender, nickName, age, image } = this.props;
		const si = dataSi[this.props.si] ? dataSi[this.props.si].name : "";
		const gu = dataGu[this.props.si] ? dataGu[this.props.si][this.props.gu] ? dataGu[this.props.si][this.props.gu].name : "" : "";
		const interests =  this.props.interests && this.props.interests.length ? this.props.interests.map(interest => dataInterest[interest].name) : [];
		return (
			<StyledCard onClick={this.handleClick}>
				<Grid container
					direction="row"
					justify="flex-start"
					alignItems="center"
					wrap="nowrap"
					spacing={8}>
					<Grid item>
						<LargeUserAvatar
							src={image}/>
					</Grid>
					<Grid item>
						<Grid item>
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
						<Grid item>
							<LabelMini
								icon={ <NanoStarIcon fill="#ffdb4d"/> }
								width="270px"
								label={ interests.map((interest,i) => <InterestChip key={i} label={interest}/>) }/>
						</Grid>
						<Grid item>
							<LabelMini
								icon={ <NanoMapIcon fill="#47d147"/> }
								label={ `${si} ${gu}` }/>
						</Grid>
					</Grid>
				</Grid>
			</StyledCard>
		)
	}
}

const mapStateToProps = state => ({
  dataSi: state.dataSi,
  dataGu: state.dataGu,
  dataInterest: state.dataInterest
})

const mapDispatchToProps = {

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserLarge));