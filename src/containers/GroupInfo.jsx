import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Axios from 'axios';
import { MenuItem,
		Grid,
		Fade
	} from '@material-ui/core';

import { updateMyInfo } from 'actions';
import { TextField,
		Select,
		SelectInterest,
		RadioGroup,
		DateTimePicker,
		Button,
		Carousel2,
		ImageUploader,
		ExpSelectForm,
		Dialog,
	} from 'components';

export class GroupInfo extends Component {
	state = {
		showPage: true,

		nickNameOk: false,		// 특수문자, 공백 제외 2글자 이상 true
		locationOk: false,		// 시,구 정보를 모두 입력해야 true
		genderOk: false,		// 성별 선택시 true
		birthOk: false,			// 생년월일 정보 입력시 true
		interestOk: false,		// 관심사 정보 최소 1개 입력시 true

		updateProcess: false,

		pwError: false,
		pw2Error: false,
		nickNameError: false,

		pwErrorMessage: "",

		dialogOpen: false,
		dialogIcon: 0,
		dialogTitle: "",
		dialogContent: "",

		openImageUploader: false,	// true시 이미지 업로더 modal을 띄움
	}
	t_checkNickName = null;

	componentDidMount() {
		const myInfo = this.props.myInfo;
		this.setState({...myInfo,
			gender: this.props.myInfo.gender.toString(),
			interests: myInfo.interests.map( x =>
				({label: this.props.dataInterest[x].name, value: x})),
			nickNameOk: myInfo.nickName ? true : false,
			locationOk: myInfo.gu ? true : false,
			genderOk: myInfo.gender!=="0" ? true : false,
			birthOk: myInfo.birth ? true : false,
			interestOk: myInfo.interests.length ? true : false
		});
	}
	handleReset = () => {
		this.setState({ pw: "", pw2: "",
			nickNameOk: false, locationOk: false, genderOk: false, birthOk: false, interestOk: false,
			...this.props.myInfo,
			gender: this.props.myInfo.gender.toString(),
			interests: this.props.myInfo.interests.map( x =>
				({label: this.props.dataInterest[x].name, value: x}))
		});
	}
	handleChange = ({target}) => {
		const { id, value } = target;
		this.setState({[id]: value});
		switch(id) {
			case "nickName":
				clearTimeout(this.t_checkNickName);
				this.setState({nickNameError: false, nickNameOk: false});
				this.t_checkNickName = setTimeout(() => {
					if(value.length < 2 || /[^a-zA-Z가-힣0-9]/.test(value))
						this.setState({nickNameError: true, nickNameOk: false});
					else
						this.setState({nickNameOk: true});
				}, 700);
				break;
			default:
		}
	}
	handleGenderChange = ({target}) => {
			return this.setState({[target.name]: target.value, genderOk: true});
	}
	handleLocationChange = ({target}) => {
		switch(target.name){
			case "si":
				return this.setState({si: target.value, gu: "", locationOk: false});
			default:
				return this.setState({[target.name]: target.value, locationOk: true});
		}
	}
	handleExpChange = ({target}) => {
		this.setState({[target.id]: target.checked});
	}
	handleBirthChange = moment => {
		this.setState({birth: moment, birthOk: true});
	}
	handleInterestChange = value => {
		const interestOk = value.length ? true : false;
		this.setState({interests: value, interestOk });
	}
	handleSubmit = e => {
		e.preventDefault();
		this.setState({updateProcess: true});
		const { id, pw, nickName, si, gu, gender, images,
			intro, msg, areayn, birthyn, genderyn, friendsyn, groupsyn } = this.state;
		const { token } = this.props;
		const birth = this.state.birth._d;
		const interests = _.map(this.state.interests, interest => interest.value);

		Axios.post('http://192.168.0.200:8080/me/info', {
			token, id, pw, nickName, si, gu, birth, gender, interests, images,
			intro, msg, areayn, birthyn, genderyn, friendsyn, groupsyn
		}).then(resp => {
			console.log(resp);	// FIXME: 지워주세용

			this.props.updateMyInfo(resp.data.myInfo);	// TODO: store.myInfo 업데이트 데이터를 받아서 업데이트 할 것.

			this.setState({
				updateProcess: false,
				dialogOpen: true,
				dialogIcon: 1,
				dialogTitle: "회원정보를 업데이트",
				dialogContent: "회원정보 업데이트를 성공적으로 마쳤습니다.",
			});
		}).catch(err => {
			console.log(err);	// FIXME: REMOVE
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
				updateProcess: false,
				dialogOpen: true,
				dialogIcon: 2,
				dialogTitle: errorTitle,
				dialogContent: errorMessage
			});
		}); // FIXME: REMOVE LOG
	}
	openImageUploader = () => {
		this.setState({openImageUploader: true});
	}
	closeImageUploader = () => {
		this.setState({openImageUploader: false});
	}
	handleAddImage = newImage => {
		this.setState(state => ({images: [...state.images, newImage]}));
	}
	handleDeleteImage = index => {
		this.setState(state => ({images: state.images.filter((x,i) => i!==index)}))
	}
	handleDialogClose = () => {
		if(this.state.dialogIcon === 1) {
			this.setState({showPage: false});
			setTimeout(() => {
				this.props.handleSwitchView(0);
			}, 500);
		}
		this.setState({
			dialogOpen: false,
			dialogIcon: 0,
			dialogTitle:"",
			dialogContent:""
		});
	};
	render() {
		const { showPage,
			nickNameOk, locationOk, genderOk, birthOk, interestOk,
			pwOk, pw2Ok, pwError, pw2Error, pwErrorMessage,
			dialogOpen, dialogIcon, dialogTitle, dialogContent,
			updateProcess,
			nickNameError,
			id,
			pw,
			pw2,
			nickName,
			si,
			gu,
			birth,
			gender,
			intro,
			msg,
			areayn,
			birthyn,
			genderyn,
			friendsyn,
			groupsyn,
			openImageUploader } = this.state;
			const images = this.state.images ? this.state.images : [];
			const interests = this.state.interests ? this.state.interests : [];
		const { dataSi, dataGu } = this.props;
		return (
			<Fade in={showPage} timeout={{enter: 500, exit: 500}}>
				<Grid container
					direction="row"
					justify="space-between"
					alignItems="center"
					spacing={0}>
						<Grid container
							direction="row"
							justify="center"
							alignItems="flex-start"
							spacing={0}>
							<Grid item container
								direction="column"
								justify="center"
								alignItems="center"
								spacing={8}
								style={{width:"300px", padding:"0px 10px 10px 10px", margin:"0 5px", boxShadow:"0 1px 10px -2px rgb(150,150,150)", borderRadius:"10px"}}>
								<Grid item>		{/* 프로필사진 */}
									<Carousel2
										openImageUploader={this.openImageUploader}
										handleDeleteImage={this.handleDeleteImage}
										images={images}
										disabled={updateProcess}/>
									{
										openImageUploader && <ImageUploader
											open={openImageUploader}
											handleAddImage={this.handleAddImage}
											closeImageUploader={this.closeImageUploader}
											/>
									}
								</Grid>
								<Grid item>		{/* 아이디 */}
									<TextField
										id="id"
										value={id}
										label="아이디"
										disabled
										shrink
										width="260px"
										margin="dense"/>
								</Grid>
								<Grid item>		{/* 비밀번호 */}
									<TextField
										id="pw"
										value={pw}
										type="password"
										onChange={this.handleChange}
										label="비밀번호"
										shrink
										disabled={updateProcess}
										error={pwError}
										errorMessage={pwErrorMessage}
										autoComplete="current-password"
										margin="dense"
										width="260px"/>
								</Grid>
								<Grid item>		{/* 비밀번호2 */}
									<TextField
										id="pw2"
										value={pw2}
										type="password"
										onChange={this.handleChange}
										label="비밀번호 재입력"
										shrink
										disabled={updateProcess}
										error={pw2Error}
										errorMessage="비밀번호가 일치하지 않습니다"
										autoComplete="current-password"
										margin="dense"
										width="260px"/>
								</Grid>
								<Grid item>		{/* 닉네임 */}
									<TextField
										id="nickName"
										value={nickName}
										type="text"
										onChange={this.handleChange}
										label="닉네임 *"
										shrink
										disabled={updateProcess}
										error={nickNameError}
										errorMessage="사용할 수 없는 형식 입니다"
										width="260px"
										margin="dense"/>
								</Grid>
								<Grid item>		{/* 지역(시) */}
									<Select
										name="si"
										value={si}
										label="지역(시) *"
										width="260px"
										disabled={updateProcess}
										shrink
										handleChange={this.handleLocationChange}>
										{_.map(dataSi, si => <MenuItem value={si.code} key={si.code}>{si.name}</MenuItem>)}
									</Select>
								</Grid>
								<Grid item>		{/* 지역(구) */}
									<Select
										name="gu"
										value={gu}
										label="지역(구) *"
										width="260px"
										disabled={updateProcess}
										shrink
										handleChange={this.handleLocationChange}>
										{_.map(dataGu[si], gu => <MenuItem value={gu.gucode} key={`${gu.sicode}${gu.gucode}`}>{gu.name}</MenuItem>)}
									</Select>
								</Grid>
								<Grid item>		{/* 성별 */}
									<RadioGroup
										name="gender"
										value={gender}
										label="성별 *"
										disabled={updateProcess}
										row
										handleChange={this.handleGenderChange}
										data={[{label: "남성", value: "1"}, {label: "여성", value: "2"}]}/>
								</Grid>
							</Grid>
							<Grid item container
								direction="column"
								justify="center"
								alignItems="center"
								spacing={8}
								style={{width:"310px", padding:"10px", margin:"0 5px", boxShadow:"0 1px 10px -2px rgb(150,150,150)", borderRadius:"10px"}}>
								<Grid item>		{/* 생년월일 */}
									<DateTimePicker
										id="birth"
										label="생년월일 *"
										value={birth}
										viewMode="years"
										birth
										shrink
										disabled={updateProcess}
										onChange={this.handleBirthChange}/>
								</Grid>
								{
									interests ? <Grid item>		{/* 관심사 */}
										<SelectInterest
											disabled={updateProcess}
											interests={interests}
											handleInterestChange={this.handleInterestChange}/>
									</Grid> : ""
								}
								<Grid item>		{/* 자기소개 */}
									<TextField
										id="intro"
										value={intro}
										onChange={this.handleChange}
										label="자기소개"
										shrink
										multiline
										rows={6}
										rowsMax={6}
										disabled={updateProcess}
										margin="dense"
										width="260px"/>
								</Grid>
								<Grid item>		{/* 요청 응답 메세지 */}
									<TextField
										id="msg"
										value={msg}
										onChange={this.handleChange}
										label="친구요청 응답 기본메세지"
										shrink
										multiline
										rows={6}
										rowsMax={6}
										disabled={updateProcess}
										margin="dense"
										width="260px"/>
								</Grid>
								<Grid item>		{/* 공개여부 */}
									<ExpSelectForm
										birthyn={birthyn}
										areayn={areayn}
										genderyn={genderyn}
										friendsyn={friendsyn}
										groupsyn={groupsyn}
										disabled={updateProcess}
										onChange={this.handleExpChange}
										/>
								</Grid>
							</Grid>
						</Grid>
						<Grid container
							direction="row"
							justify="center"
							alignItems="flex-start"
							spacing={0}>
							<Button
								type="button"
								onClick={this.handleSubmit}
								process={updateProcess}
								disabled={!(nickNameOk && pwOk && pw2Ok && locationOk && genderOk && birthOk && interestOk) || updateProcess}
								margin="30px 5px 5px 5px">
								확인
							</Button>
							<Button
								type="button"
								onClick={this.handleReset}
								disabled={updateProcess}
								margin="30px 5px 5px 5px">
								초기화
							</Button>
						</Grid>
						<Dialog
							open={dialogOpen}
							onClose={this.handleDialogClose}
							title={dialogTitle}
							content={dialogContent}
							disableBackdrop={true}
							icon={dialogIcon}
						/>
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
	token: state.token,
})
const mapDispatchToProps = {
	updateMyInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupInfo);