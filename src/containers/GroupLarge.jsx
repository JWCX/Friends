import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Grid } from '@material-ui/core';
import styled from 'styled-components';

import { NanoStarIcon,
	NanoGroupNameIcon,
	NanoMegaphoneIcon,
	NanoMapIcon
} from 'components/AppBarIcons';
import { InterestChip } from 'components/Chips';
import { LargeGroupAvatar } from 'components/Avatars';
import { LabelMini } from 'components';

const StyledCard = styled(Card)`
	/* width: 400px; */
	/* min-width: 400px;
	width: 100%; */
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

export class GroupLarge extends Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.nickName !== nextProps.nickName)
			return true;
		return false;
	}
	handleClick = () => {
		this.props.history.push(`${this.props.match.path}/group/${this.props.id}`);
	}
	render() {
		const {
			dataInterest,
			dataSi,
			dataGu,
			groupName,
			image,
			memberCnt,
			maxMember,
			intro,
		} = this.props;
		const interests =  this.props.interests && this.props.interests.length ? this.props.interests.map(interest => dataInterest[interest].name) : [];
		const si = dataSi[this.props.si] ? dataSi[this.props.si].name : "전국";
		const gu = dataGu[this.props.si] ? dataGu[this.props.si][this.props.gu] ? dataGu[this.props.si][this.props.gu].name : "" : "";

		return (
			<StyledCard
				style={{borderRadius: "10px"}}
				onClick={this.handleClick}>
				<Grid container
					direction="row"
					justify="space-around"
					alignItems="center"
					wrap="nowrap"
					spacing={8}>
					<Grid item>
						<LargeGroupAvatar
							src={image}/>
					</Grid>
					<Grid item container
						direction="column"
						justify="center"
						alignItems="flex-start"
						wrap="nowrap"
						spacing={0}>
						<Grid item style={{padding: "3px 15px 3px 0"}}>
							<LabelMini
								icon={ <NanoGroupNameIcon fill="#9966ff"/> }
								label={
									<React.Fragment>
										{groupName}
										<span style={{color:"rgb(120,120,120)", fontSize:"0.8em"}}>
											&nbsp;({memberCnt}/{maxMember})
										</span>
									</React.Fragment>
								}/>
						</Grid>
						<Grid item style={{padding: "3px 15px 3px 0"}}>
							<LabelMini
								icon={ <NanoStarIcon fill="#ffd633"/> }
								// width="270px"
								label={ interests.map((interest,i) => <InterestChip key={i} label={interest} height="21px"/>) }
								/>
						</Grid>
						<Grid item style={{padding: "3px 15px 3px 0"}}>
							<LabelMini
								icon={ <NanoMapIcon fill="#66ff66"/> }
								// width="270px"
								label={ `${si} ${gu}` }
								/>
						</Grid>
						<Grid item style={{padding: "3px 15px 3px 0"}}>
							<LabelMini
								icon={ <NanoMegaphoneIcon fill="#33adff"/> }
								label={intro}/>
						</Grid>
					</Grid>
				</Grid>
			</StyledCard>
		)
	}
}

const mapStateToProps = state => ({
  dataInterest: state.dataInterest,
  dataSi: state.dataSi,
  dataGu: state.dataGu
})
const mapDispatchToProps = {
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupLarge));