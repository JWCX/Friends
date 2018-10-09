import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Fade } from '@material-ui/core';
import Axios from 'axios';
import _ from 'lodash';

import { updateGroupPage } from 'actions';
import { LabelGroup,
		Button,
		Carousel,
		Dialog,
		DialogYN,
		DialogGroupJoinForm } from 'components';
import { InterestChip } from 'components/Chips';
import { NumberBadge } from 'components/Badges';
import { NanoMapIcon,
		NanoCakeIcon,
		NanoStarIcon,
		NanoMegaphoneIcon,
		NanoCrownIcon,
		NanoGroupNameIcon,
		NanoMembersIcon,
		NanoTargetIcon,
		NanoMarsIcon,
		NanoVenusIcon } from 'components/AppBarIcons';
class GroupMain extends Component {
	state = {
		dialogOpen: false,
		dialogIcon: 0,
		dialogTitle: "",
		dialogContent: "",
		dialogRedirect: "",

		dialogYnOpen: false,
		dialogYnTitle: "",
		dialogYnContent: "",
		dialogYnProcess: false,
		dialogYnSubmit: null,

		dialogJoinOpen: false,
		dialogJoinTitle: "",
		dialogJoinContent: "",
		dialogJoinMsg: "",
		dialogJoinAvatar: null,
		dialogJoinProcess: false,
	}
	componentDidMount(){

	}
	componentWillReceiveProps(nextProps) {

	}
	handleInputChange = ({target})=> {
		this.setState({[target.id]: target.value})
	}
	handleSendRequestClick = () => {
		this.setState({
			dialogJoinOpen: true,
			dialogJoinTitle: "그룹 가입 신청",
			dialogJoinContent: `[ ${this.props.group.groupName} ] 그룹에 가입을 신청합니다.`,
			dialogJoinAvatar: this.props.myInfo.images[0],
		})
	}
	handleJoinSubmit = () => {
		this.setState({dialogJoinProcess: true});
		Axios.post(`${process.env.REACT_APP_DEV_API_URL}/group/request`, {
			token: this.props.token,
			id: this.props.group.id,
			message: this.state.dialogJoinMsg
		}).then(resp => {
			console.log(resp);	// FIXME: 지워주세용
			this.setState({
				dialogJoinProcess: false,
				dialogJoinOpen: false,
				dialogJoinMsg: "",
				dialogJoinAvatar: null,
				dialogOpen: true,
				dialogIcon: 1,
				dialogTitle: "신청이 완료되었습니다",
			});
			this.props.updateGroupPage({...this.props.group, isMyGroup: 1});
		}).catch(err => {
			console.log(err.response);	// FIXME: REMOVE
			let errorTitle, errorMessage;
			// if(!err.response || !err.response.data) {
				errorTitle = "서버와 연결할 수 없습니다";
				errorMessage = "잠시후 다시 시도해 주세요...";
			// }
			// else {
			// 	errorTitle = err.response.data;
			// }
			this.setState({
				dialogJoinProcess: false,
				dialogJoinOpen: false,
				dialogJoinMsg: "",
				dialogJoinAvatar: null,
				dialogOpen: true,
				dialogIcon: 2,
				dialogTitle: errorTitle,
				dialogContent: errorMessage
			});
		}); // FIXME: REMOVE LOG
	}
	handleDropOutClick = () => {
		this.setState({
			dialogYnOpen: true,
			dialogYnTitle: "그룹 탈퇴를 선택하였습니다",
			dialogYnContent: `[ ${this.props.group.groupName} ] 그룹을 정말 탈퇴하시겠습니까?`,
			dialogYnSubmit: this.handleDropOutSubmit
		})
	}
	handleDropOutSubmit = () => {
		this.setState({dialogYnProcess: true});
		Axios.delete(`${process.env.REACT_APP_DEV_API_URL}/group/request`, {
			token: this.props.token,
			id: this.props.group.id
		}).then(resp => {
			console.log(resp);	// FIXME: 지워주세용
			this.setState({
				dialogYnProcess: false,
				dialogYnOpen: false,
				dialogYnSubmit: null,
				dialogOpen: true,
				dialogIcon: 1,
				dialogTitle: "그룹을 탈퇴하였습니다",
				dialogContent: "",
				dialogRedirect: `${this.props.match.params[0]}`
			});
		}).catch(err => {
			console.log(err.response);	// FIXME: REMOVE
			let errorTitle, errorMessage;
			// if(!err.response || !err.response.data) {
				errorTitle = "서버와 연결할 수 없습니다";
				errorMessage = "잠시후 다시 시도해 주세요...";
			// }
			// else {
			// 	errorTitle = err.response.data;
			// }
			this.setState({
				dialogYnProcess: false,
				dialogYnOpen: false,
				dialogYnSubmit: null,
				dialogOpen: true,
				dialogIcon: 2,
				dialogTitle: errorTitle,
				dialogContent: errorMessage
			});
		}); // FIXME: REMOVE LOG
	}
	handleDialogYnCancel = () => {
		this.setState({
			dialogYnOpen: false,
			dialogYnTitle: "",
			dialogYnContent: "",
			dialogYnSubmit: null
		});
	};
	handleJoinCancel = () => {
		this.setState({
			dialogJoinOpen: false,
			dialogJoinTitle: "",
			dialogJoinContent: "",
			dialogJoinMsg: "",
			dialogJoinAvatar: null,
		});
	}
	handleDialogClose = () => {
		this.setState({
			dialogOpen: false,
			dialogTitle: "",
			dialogContent: "",
			dialogIcon: 0
		})
	}
	render() {
		const { dialogYnOpen, dialogYnTitle, dialogYnContent, dialogYnProcess, dialogYnSubmit,
			dialogOpen, dialogIcon, dialogTitle, dialogContent, dialogRedirect,
			dialogJoinOpen, dialogJoinTitle, dialogJoinContent, dialogJoinProcess, dialogJoinMsg, dialogJoinAvatar
		 } = this.state;
		const { dataInterest, dataSi, dataGu, group, myInfo, token, notifications, openGroupApplicants } = this.props;
		const {
			groupName,
			master,
			minAge,
			maxAge,
			gender,
			intro,
			memberCnt,
			maxMember,
			avgAge,
			isMyGroup
		} = group ? group : "";
		const estDate = group && group.estDate ? group.estDate._i : "";
		const si = group && dataSi[group.si] ? dataSi[group.si].name : "전국";
		const gu = group && dataGu[group.si] ? dataGu[group.si][group.gu] ? dataGu[group.si][group.gu].name : "" : "";
		const interests = group && group.interests.length ? group.interests.map(interest => dataInterest[interest].name) : [];
		const images = group && group.images.length ? group.images : [];
		let restrict;
		if(group && myInfo) {
			if(gender != 0 && myInfo.gender != gender)
				restrict = true;
			if((minAge !== 1 || maxAge !== 100) && (myInfo.age < minAge || myInfo.age > maxAge))
				restrict = true;
		}
		return (
			<Fade in={group} timeout={{enter: 500, exit: 500}}>
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
						<Grid item>		{/* 그룹 사진 */}
							<Carousel
								images={images}
								width="500px"
								autoplay
								isGroup/>

						</Grid>
						<Grid item>		{/* 그룹명 */}
							<LabelGroup
								icon={<NanoGroupNameIcon fill="#9966ff"/>}
								label={<React.Fragment>
										{groupName}
									</React.Fragment>}/>
						</Grid>
						<Grid item>		{/* 그룹 소개 */}
							<LabelGroup
								icon={<NanoMegaphoneIcon fill="#33adff"/>}
							label={intro}/>
						</Grid>
						<Grid item>		{/* 그룹장 */}
							<LabelGroup
								icon={<NanoCrownIcon fill="#ffa64d"/>}
								label={master.nickName}/>
						</Grid>
						<Grid item>		{/* 관심사 리스트 */}
							<LabelGroup
								icon={<NanoStarIcon fill="#ffd633"/>}
								label={ interests.map( (interest,i) => <InterestChip key={i} label={interest}/>) }/>
						</Grid>
						<Grid item>		{/* 주요 활동 지역(시, 구) */}
							<LabelGroup
								icon={<NanoMapIcon fill="#66ff66"/>}
								label={`${si} ${gu}`}
								/>
						</Grid>
						<Grid item>		{/* 그룹 맴버수 */}
							<LabelGroup
								icon={<NanoMembersIcon fill="#527a7a"/>}
								label={<React.Fragment>{memberCnt} / {maxMember}&nbsp;<span style={{fontSize:"0.8em", color:"rgb(120,120,120)"}}>( 평균 연령 : {avgAge}세 )</span></React.Fragment>}
								/>
						</Grid>
						<Grid item>		{/* 그룹 개설일 */}
							<LabelGroup
								icon={<NanoCakeIcon fill="#ff6666"/>}
								label={estDate}
								/>
						</Grid>
						{
							isMyGroup !== 2 &&
							<Grid item>		{/* 가입조건 */}
								<LabelGroup
									icon={<NanoTargetIcon fill="#5c5c8a"/>}
									label={<React.Fragment>
										{
											gender==0 && minAge===1 && maxAge===100 ? <span style={{fontSize: "0.8em", color: "rgb(120,120,120)"}}>누구나 가입할 수 있습니다.</span>
											: <React.Fragment>
												<span style={{color: "rgb(120,120,120)"}}>이 그룹은 <span style={{color:"rgb(220,70,100)"}}>가입 조건</span>이 있습니다.</span>
												{ gender != 0 && <span style={{fontSize: "0.8em", color:"rgb(220,70,100)"}}>&nbsp;&nbsp;성별제한:{gender == 1 ? <NanoMarsIcon /> : < NanoVenusIcon />}</span>}
												{ !(minAge === 1 && maxAge === 100) && <span style={{fontSize: "0.8em", color:"rgb(220,70,100)"}}>&nbsp;&nbsp;연령제한: <span style={{color: "rgb(120,120,120)"}}>{minAge} ~ {maxAge}세</span></span> }
											</React.Fragment>
										}
									</React.Fragment>}
									/>
							</Grid>
						}
					</Grid>
					<Grid container
						direction="column"
						justify="center"
						alignItems="center"
						spacing={8}>
						<Grid item>		{/* 가입신청 버튼 */}
						{
							_.filter(notifications, notification => notification.gubun === 1).length ?
								<NumberBadge button content={_.filter(notifications, notification => notification.gubun === 1).length}>
									<Button
										type="button"
										onClick={token === master.id ? openGroupApplicants : isMyGroup === 0 ? this.handleSendRequestClick : this.handleDropOutClick }
										disabled={isMyGroup===1 || restrict}
										margin="15px 5px 5px 5px">
										{isMyGroup===0 && "가입 신청"}
										{isMyGroup===1 && "가입 대기중"}
										{isMyGroup===2 ? token === master.id ? "가입신청목록" : "그룹 탈퇴" : ""}
									</Button>
								</NumberBadge>
								: <Button
									type="button"
									onClick={token === master.id ? openGroupApplicants : isMyGroup === 0 ? this.handleSendRequestClick : this.handleDropOutClick }
									disabled={isMyGroup===1 || restrict}
									margin="15px 5px 5px 5px">
									{isMyGroup===0 && "가입 신청"}
									{isMyGroup===1 && "가입 대기중"}
									{isMyGroup===2 ? token === master.id ? "가입신청목록" : "그룹 탈퇴" : ""}
								</Button>
						}
						</Grid>
					</Grid>
					<DialogGroupJoinForm open={dialogJoinOpen}
						title={dialogJoinTitle}
						content={dialogJoinContent}
						dialogJoinMsg={dialogJoinMsg}
						dialogJoinAvatar={dialogJoinAvatar}
						onSubmit={this.handleJoinSubmit}
						handleInputChange={this.handleInputChange}
						onCancel={this.handleJoinCancel}
						process={dialogJoinProcess}
						disableBackdrop/>
					<DialogYN open={dialogYnOpen}
						title={dialogYnTitle}
						content={dialogYnContent}
						onSubmit={dialogYnSubmit}
						onCancel={this.handleDialogYnCancel}
						process={dialogYnProcess}
						disableBackdrop/>
					<Dialog
						open={dialogOpen}
						onClose={this.handleDialogClose}
						title={dialogTitle}
						content={dialogContent}
						icon={dialogIcon}
						redirect={dialogRedirect}
						disableBackdrop/>
				</Grid>
			</Fade>
		)
	}
}

const mapStateToProps = state => ({
	dataInterest: state.dataInterest,
	dataSi: state.dataSi,
	dataGu: state.dataGu,
	group: state.group,
	token: state.token,
	myInfo: state.myInfo,
	notifications: state.notifications,
})
const mapDispatchToProps = {
	updateGroupPage
}
export default connect(mapStateToProps, mapDispatchToProps)(GroupMain);