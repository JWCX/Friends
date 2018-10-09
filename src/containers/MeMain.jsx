import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Fade } from '@material-ui/core';
import Axios from 'axios';

import { updateMePage } from 'actions';
import { Label,
		Button,
		Carousel,
		Dialog,
		DialogYN,
		DialogFriendRequestForm } from 'components';
import { InterestChip } from 'components/Chips';
import { NanoMysteryIcon,
		NanoMarsIcon,
		NanoVenusIcon,
		NanoMapIcon,
		NanoCakeIcon,
		NanoStarIcon,
		NanoMegaphoneIcon } from 'components/AppBarIcons';
class MeMain extends Component {
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

		dialogFrOpen: false,
		dialogFrTitle: "",
		dialogFrContent: "",
		dialogFrMsg: "",
		dialogFrAvatar: null,
		dialogFrMyMsg: "",
		dialogFrMyAvatar: null,
		dialogFrProcess: false,
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
			dialogFrOpen: true,
			dialogFrTitle: "친구신청",
			dialogFrMsg: this.props.me.msg,
			dialogFrAvatar: this.props.me.images[0],
			dialogFrMyAvatar: this.props.myInfo.images[0],
			dialogFrContent: `${this.props.me.nickName} 님에게 전할 친구신청 메세지를 입력해보세요.`,
		})
	}
	handleSendRequestSubmit = () => {
		this.setState({dialogFrProcess: true});
		Axios.post(`${process.env.REACT_APP_DEV_API_URL}/friend/request`, {
			token: this.props.token,
			id: this.props.me.id,
			message: this.state.dialogFrMyMsg
		}).then(resp => {
			console.log(resp);	// FIXME: 지워주세용
			this.setState({
				dialogFrProcess: false,
				dialogFrOpen: false,
				dialogFrMsg: "",
				dialogFrAvatar: null,
				dialogFrMyMsg: "",
				dialogFrMyAvatar: null,
				dialogOpen: true,
				dialogIcon: 1,
				dialogTitle: "신청이 완료되었습니다",
			});
			this.props.updateMePage({...this.props.me, isFriend: 1});
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
				dialogFrProcess: false,
				dialogFrOpen: false,
				dialogFrMsg: "",
				dialogFrAvatar: null,
				dialogFrMyMsg: "",
				dialogFrMyAvatar: null,
				dialogOpen: true,
				dialogIcon: 2,
				dialogTitle: errorTitle,
				dialogContent: errorMessage
			});
		}); // FIXME: REMOVE LOG
	}
	handleStalkClick = () => {
		this.setState({
			dialogYnOpen: true,
			dialogYnTitle: "관심친구로 설정합니다",
			dialogYnContent: `${this.props.me.nickName} 님을 관심친구로 설정하시겠습니까? 관심친구로 설정해도 상대방은 알지 못합니다.`,
			dialogYnSubmit: this.handleStalkSubmit
		})
	}
	handleStalkSubmit = () => {
		this.setState({dialogYnProcess: true});
		Axios.post(`${process.env.REACT_APP_DEV_API_URL}/curious`, {
			token: this.props.token,
			id: this.props.me.id
		}).then(resp => {
			console.log(resp);	// FIXME: 지워주세용
			this.setState({
				dialogYnProcess: false,
				dialogYnOpen: false,
				dialogYnSubmit: null,
				dialogOpen: true,
				dialogIcon: 1,
				dialogTitle: "설정이 완료되었습니다",
			});
			this.props.updateMePage({...this.props.me, isCurious: true});
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
	handleRemoveClick = () => {
		this.setState({
			dialogYnOpen: true,
			dialogYnTitle: "친구 삭제를 선택하였습니다",
			dialogYnContent: `${this.props.me.nickName}님을 정말 삭제하시겠습니까?`,
			dialogYnSubmit: this.handleRemoveSubmit
		})
	}
	handleRemoveSubmit = () => {
		this.setState({dialogYnProcess: true});
		Axios.delete(`${process.env.REACT_APP_DEV_API_URL}/friend`, {
			token: this.props.token,
			id: this.props.me.id
		}).then(resp => {
			console.log(resp);	// FIXME: 지워주세용
			this.setState({
				dialogYnProcess: false,
				dialogYnOpen: false,
				dialogYnSubmit: null,
				dialogOpen: true,
				dialogIcon: 1,
				dialogTitle: "친구삭제가 완료되었습니다",
				dialogContent: `${this.props.me.nickName}님과 더이상 친구가 아닙니다!`,
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
			dialogYnTitle:"",
			dialogYnContent:"",
			dialogYnSubmit:null
		});
	};
	handleDialogFrCancel = () => {
		this.setState({
			dialogFrOpen: false,
			dialogFrTitle: "",
			dialogFrContent: "",
			dialogFrMsg: "",
			dialogFrAvatar: null,
			dialogFrMyMsg: "",
			dialogFrMyAvatar: null,
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
			dialogFrOpen, dialogFrTitle, dialogFrContent, dialogFrProcess, dialogFrMsg, dialogFrAvatar, dialogFrMyMsg, dialogFrMyAvatar
		 } = this.state;
		const { dataInterest, dataSi, dataGu, me, token, match } = this.props;
		const {
			nickName,
			age,
			gender,
			intro,
			areayn,
			birthyn,
			genderyn,
			isFriend,
			isCurious
		} = me ? me : "";
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
								icon={!gender||gender=="0"||genderyn ? <NanoMysteryIcon padding="0 0 6px 0"/> : gender=="1" ? <NanoMarsIcon/> : <NanoVenusIcon/>}
								label={<React.Fragment>
										{nickName}
										<span style={{color:"rgb(120,120,120)", fontSize:"0.8em"}}>
											&nbsp;( {!age||birthyn ? <NanoMysteryIcon padding="0 0 3px 0"/> : age} )
										</span>
									</React.Fragment>}/>
						</Grid>
						<Grid item>		{/* 관심사 리스트 */}
							<Label
								icon={<NanoStarIcon fill="#ffd633"/>}
								label={ interests.map( (interest,i) => <InterestChip key={i} label={interest}/>) }/>
						</Grid>
						<Grid item>		{/* 지역(시, 구) */}
							<Label
								lock={areayn}
								icon={<NanoMapIcon fill="#66ff66"/>}
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
						{
							parseInt(match.params.id) === token ?
							<React.Fragment>
								<Button
									type="button"
									onClick={e => this.handleClick(e, "/join")}
									margin="20px 5px 5px 5px">
									친구요청 보기
								</Button>
							</React.Fragment>
							:
							<React.Fragment>
								<Button
									type="button"
									onClick={isFriend === 0 ? this.handleSendRequestClick : this.handleRemoveClick }
									disabled={isFriend===1}
									margin="20px 5px 5px 5px">
									{isFriend===0 && "친구신청"}
									{isFriend===1 && "수락대기중..."}
									{isFriend===2 && "친구삭제"}
								</Button>
							{
								!isFriend && !isCurious && <Button
									type="button"
									onClick={this.handleStalkClick}
									margin="20px 5px 5px 5px">
									관심친구로 설정
								</Button>
							}
							</React.Fragment>
						}
						</Grid>
					</Grid>
					<DialogFriendRequestForm open={dialogFrOpen}
						title={dialogFrTitle}
						content={dialogFrContent}
						dialogFrMsg={dialogFrMsg}
						dialogFrMyMsg={dialogFrMyMsg}
						dialogFrAvatar={dialogFrAvatar}
						dialogFrMyAvatar={dialogFrMyAvatar}
						onSubmit={this.handleSendRequestSubmit}
						handleInputChange={this.handleInputChange}
						onCancel={this.handleDialogFrCancel}
						process={dialogFrProcess}
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
	me: state.me,
	token: state.token,
	myInfo: state.myInfo
})
const mapDispatchToProps = {
	updateMePage
}
export default connect(mapStateToProps, mapDispatchToProps)(MeMain);