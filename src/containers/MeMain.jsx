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
		//TODO: IF ME NEEDS TO BE UPDATED AFTER SET INFO.
		console.log("cdnmmmm");
	}
	componentWillReceiveProps(nextProps){
		console.log(this.props.me=== nextProps.me);
	}
	render() {
		const { dataInterest, dataSi, dataGu, me } = this.props;
		const {
			nickName,
			age,
			gender,
			intro,
			areayn,
			birthyn,
			genderyn,
			isFriend,
			isCurious } = me ? me : "";
		const birth = me && me.birth ? me.birth._i : "";
		const si = me && dataSi[me.si] ? dataSi[me.si].name : "";
		const gu = me && dataGu[me.si] ? dataGu[me.si][me.gu] ? dataGu[me.si][me.gu].name : "" : "";
		const interests = me && me.interests.length ? me.interests.map(interest => dataInterest[interest].name) : [];
		const images = me && me.images.length ? me.images : [];
		return (
			<Fade in={me} timeout={{enter: 500, exit: 500}}>
				<Grid container
					style={{padding:"15px", boxShadow:"0 1px 10px -2px rgb(150,150,150)", borderRadius:"10px", minHeight:"787px", minWidth:"322px"}}
					direction="column"
					justify="space-between"
					alignItems="center"
					spacing={8}>
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
					</Grid>
					<Grid container
						direction="column"
						justify="center"
						alignItems="center"
						spacing={8}>
						<Grid item>		{/* 친구신청/스토킹 버튼 */}
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
				</Grid>
			</Fade>
		)
	}
}

const mapStateToProps = state => ({
	dataInterest: state.dataInterest,
	dataSi: state.dataSi,
	dataGu: state.dataGu,
	me: state.me,
})
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(MeMain);



