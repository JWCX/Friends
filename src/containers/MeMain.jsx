import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Fade } from '@material-ui/core';


import { Label, Button, Carousel } from 'components';
import { InterestChip } from 'components/Chips';
import { NanoMysteryIcon,
		NanoMarsIcon,
		NanoVenusIcon,
		NanoMapIcon,
		NanoCakeIcon,
		NanoStarIcon,
		NanoMegaphoneIcon } from 'components/AppBarIcons';

class MeMain extends Component {
	componentDidMount(){
		//TODO: IF MYINFO NEEDS TO BE UPDATED AFTER SET INFO.
	}
	render() {
		const { dataInterest, dataSi, dataGu, myInfo } = this.props;
		const {
			nickName,
			age,
			gender,
			intro,
			areayn,
			birthyn,
			genderyn } = myInfo;
		const birth = myInfo.birth ? myInfo.birth._i : "";
		const si = dataSi[myInfo.si] ? dataSi[myInfo.si].name : "";
		const gu = dataGu[myInfo.si] ? dataGu[myInfo.si][myInfo.gu] ? dataGu[myInfo.si][myInfo.gu].name : "" : "";
		const interests = myInfo.interests.length ? myInfo.interests.map(interest => dataInterest[interest].name) : [];
		const images = myInfo.images.length ? myInfo.images : [];
		return (
			<Fade in={true} timeout={{enter: 500, exit: 500}}>
				<Grid container
					direction="column"
					justify="center"
					alignItems="center"
					spacing={8}>
					<Grid item>		{/* 프로필 사진 */}
						<Carousel
							images={images}
							autoplay/>
					</Grid>
					<Grid item>		{/* 성별 닉네임 나이 */}
						<Label
							icon={!gender||gender==="0"||genderyn ? <NanoMysteryIcon padding="0 0 6px 0"/> : gender==="1" ? <NanoMarsIcon/> : <NanoVenusIcon/>}
							label={<React.Fragment>
									{nickName}
									<span style={{color:"rgb(120,120,120)", fontSize:"0.8em"}}>
										&nbsp;( {!age||birthyn ? <NanoMysteryIcon padding="0 0 3px 0"/> : age} )
									</span>
								</React.Fragment>}/>
					</Grid>
					<Grid item>		{/* 관심사 리스트 */}
						<Label
							icon={<NanoStarIcon fill="#ffdb4d"/>}
							label={ interests.map( (interest,i) => <InterestChip key={i} label={interest}/>) }/>
					</Grid>
					<Grid item>		{/* 지역(시, 구) */}
						<Label
							lock={areayn}
							icon={<NanoMapIcon fill="#47d147"/>}
							label={`${si} ${gu}`}
							/>
					</Grid>
					<Grid item>		{/* 생년월일 */}
						<Label
							lock={birthyn}
							icon={<NanoCakeIcon fill="#ff6666"/>}
							label={birth}
							/>
					</Grid>
					<Grid item>		{/* 자기소개 */}
						<Label
							icon={<NanoMegaphoneIcon fill="#33adff"/>}
							label={intro}/>
					</Grid>
					<Grid item>		{/* 자기소개 */}
						<Button
							type="button"
							onClick={e => this.handleClick(e, "/join")}
							margin="20px 5px 5px 5px">
							친구신청
						</Button>
						<Button
							type="button"
							onClick={e => this.handleClick(e, "/join")}
							margin="20px 5px 5px 5px">
							스토킹
						</Button>
					</Grid>
				</Grid>
			</Fade>
		)
	}
}

const mapStateToProps = state => ({
	dataInterest: state.dataInterest,
	dataSi: state.dataSi,
	dataGu: state.dataGu,
	myInfo: state.myInfo,
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(MeMain);



