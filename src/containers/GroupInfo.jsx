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
		Button,
		Carousel2,
		ImageUploader,
		Dialog,
		Slider,
		Slider2
	} from 'components';

export class GroupInfo extends Component {
	state = {
		showPage: true,

		minAge: 0,
		maxAge: 100,
		maxMember: 300,

		groupNameOk: false,		// 특수문자, 공백 제외 2글자 이상 true
		interestOk: false,		// 관심사 정보 최소 1개 입력시 true

		updateProcess: false,

		groupNameError: false,

		dialogOpen: false,
		dialogIcon: 0,
		dialogTitle: "",
		dialogContent: "",

		// groupName,
		// si,
		// gu,
		// minAge,
		// maxAge,
		// maxMember,
		// gender,
		// intro,

		openImageUploader: false,	// true시 이미지 업로더 modal을 띄움
	}
	t_checkGroupName = null;

	componentDidMount() {
		const { group, dataInterest } = this.props;
		this.setState({
			groupName: "",
			intro: "",
			si: 0,
			gu: 0,
			minAge: 0,
			maxAge: 100,
			maxMember: 300,
			images: [],
			...group,
			gender: group && group.gender ? group.gender.toString() : "0",
			interests: group && group.interests ? group.interests.map( x => ({label: dataInterest[x].name, value: x})) : null,
			groupNameOk: group && group.groupName ? true : false,
			interestOk: group && group.interests.length ? true : false
		});
	}
	handleReset = () => {
		const { group, dataInterest } = this.props;
		this.setState({
			groupName: "",
			intro: "",
			si: 0,
			gu: 0,
			minAge: 0,
			maxAge: 100,
			maxMember: 300,
			images: [],
			...group,
			gender: group && group.gender ? group.gender.toString() : "0",
			interests: group && group.interests ? group.interests.map( x => ({label: dataInterest[x].name, value: x})) : null,
			groupNameOk: group && group.groupName ? true : false,
			interestOk: group && group.interests.length ? true : false,
			groupNameError: false
		});
	}
	handleChange = ({target}) => {
		const { id, value } = target;
		this.setState({[id]: value});
		switch(id) {
			case "groupName":
				clearTimeout(this.t_checkGroupName);
				this.setState({groupNameError: false, groupNameOk: false});
				if(!value.length)
					return;
				this.t_checkGroupName = setTimeout(() => {
					if(value.length < 2 || /[^a-zA-Z가-힣0-9\s]/.test(value))
						this.setState({groupNameError: true, groupNameOk: false});
					else
						this.setState({groupNameOk: true});
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
	handleInterestChange = value => {
		const interestOk = value.length ? true : false;
		this.setState({interests: value, interestOk });
	}
	handleSlider = (values, e) => {
		this.setState({minAge: parseInt(values[0], 10), maxAge: parseInt(values[1], 10)});
	}
	handleSlider2 = (values, e) => {
		this.setState({maxMember: parseInt(values[0], 10)});
	}
	handleSubmit = e => {
		e.preventDefault();
		this.setState({updateProcess: true});
		const { token } = this.props;
		const { id, groupName, si, gu, minAge, maxAge, maxMember, gender, intro, images } = this.state;
		const interests = _.map(this.state.interests, interest => interest.value);

		Axios.post('http://192.168.0.200:8080/group/info', {
			token, id, groupName, si, gu, minAge, maxAge, maxMember, gender, intro, images, interests
		}).then(resp => {
			console.log(resp);	// FIXME: 지워주세용

			// this.props.updateMyInfo(resp.data.myInfo);	// TODO: store.myInfo 업데이트 데이터를 받아서 업데이트 할 것.

			this.setState({
				updateProcess: false,
				dialogOpen: true,
				dialogIcon: 1,
				dialogTitle: "그룹 개설",
				dialogContent: "그룹을 개설하였습니다.",
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
			groupNameOk, interestOk,
			dialogOpen, dialogIcon, dialogTitle, dialogContent,
			updateProcess,
			groupNameError,
			groupName,
			si,
			gu,
			minAge,
			maxAge,
			maxMember,
			gender,
			intro,
			openImageUploader } = this.state;
		const images = this.state.images ? this.state.images : [];
		const interests = this.state.interests ? this.state.interests : [];
		const { dataSi, dataGu, establish } = this.props;
		console.log(this.state);
		console.log(!(groupNameOk && interestOk));
		return (
			<Fade in={showPage} timeout={{enter: 500, exit: 500}}>
					<Grid container
						direction="row"
						justify="center"
						alignItems="flex-start"
						spacing={0}>
						<Grid item container
							direction="row"
							justify="center"
							alignItems="flex-start"
							spacing={8}
							style={{width:"650px", padding:"0px 10px 10px 10px", margin:"0 5px", boxShadow:"0 1px 10px -2px rgb(150,150,150)", borderRadius:"10px"}}>
							<Grid item>		{/* 프로필사진 */}
								<Carousel2
									openImageUploader={this.openImageUploader}
									handleDeleteImage={this.handleDeleteImage}
									images={images}
									disabled={updateProcess}
									width="500px"
									isGroup={true}
									/>
								{
									openImageUploader && <ImageUploader
										open={openImageUploader}
										handleAddImage={this.handleAddImage}
										closeImageUploader={this.closeImageUploader}
										isGroup={true}
										/>
								}
							</Grid>
							<Grid item container
								direction="column"
								justify="flex-start"
								alignItems="center"
								spacing={8}
								style={{height: "380px", width:"300px", padding:"15px 10px 15px 10px", margin:"5px 5px 10px 5px", boxShadow:"0 1px 10px -2px rgb(150,150,150)", borderRadius:"10px"}}>
								<Grid item>		{/* 그룹명 */}
									<TextField
										id="groupName"
										value={groupName}
										type="text"
										onChange={this.handleChange}
										label="그룹명 *"
										shrink
										disabled={updateProcess}
										error={groupNameError}
										errorMessage="사용할 수 없는 형식 입니다"
										width="260px"
										margin="dense"/>
								</Grid>
								<Grid item>		{/* 그룹소개 */}
									<TextField
										id="intro"
										value={intro}
										onChange={this.handleChange}
										label="그룹소개"
										shrink
										multiline
										rows={6}
										rowsMax={6}
										disabled={updateProcess}
										margin="dense"
										width="260px"/>
								</Grid>
								<Grid item>		{/* 주요 활동 지역(시) */}
									<Select
										name="si"
										value={si}
										label="주요 활동 지역(시)"
										displayEmpty
										emptyLabel="전체"
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
										label="주요 활동 지역(구)"
										displayEmpty
										emptyLabel="전체"
										width="260px"
										disabled={updateProcess}
										shrink
										handleChange={this.handleLocationChange}>
										{_.map(dataGu[si], gu => <MenuItem value={gu.gucode} key={`${gu.sicode}${gu.gucode}`}>{gu.name}</MenuItem>)}
									</Select>
								</Grid>
							</Grid>
							<Grid item container
								direction="column"
								justify="flex-start"
								alignItems="center"
								spacing={8}
								style={{height: "380px", width:"300px", padding:"15px 10px 15px 10px", margin:"5px 5px 10px 5px", boxShadow:"0 1px 10px -2px rgb(150,150,150)", borderRadius:"10px"}}>
								{
									interests ? <Grid item>		{/* 관심사 */}
										<SelectInterest
											disabled={updateProcess}
											interests={interests}
											handleInterestChange={this.handleInterestChange}/>
									</Grid> : ""
								}
								<Grid item>		{/* 성별 제한 */}
									<RadioGroup
										name="gender"
										value={gender}
										label="성별제한"
										disabled={updateProcess}
										row
										handleChange={this.handleGenderChange}
										data={[{label: "전체", value: "0"}, {label: "남성", value: "1"}, {label: "여성", value: "2"}]}/>
								</Grid>
								<Grid item>
									<Slider
										minAge={minAge}
										maxAge={maxAge}
										label="연령제한"
										disabled={updateProcess}
										handleSlider={this.handleSlider}
										/>
								</Grid>
								<Grid item>
									<Slider2
										value={maxMember}
										label="최대 인원"
										disabled={updateProcess}
										handleSlider={this.handleSlider2}
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
								disabled={!(groupNameOk && interestOk) || updateProcess}
								margin="30px 5px 5px 5px">
								{establish ? "그룹개설" : "확인"}
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
	group: state.group,
	token: state.token,
})
const mapDispatchToProps = {
	updateMyInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupInfo);