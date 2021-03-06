import React from 'react';
import Axios from 'axios';
import { Fade, Typography, Grid } from '@material-ui/core';

import { TextField, Button, Dialog } from 'components';

class JoinForm extends React.Component {
	state = {
		id: "",	pw: "",	pw2: "",	// ID, PW, PW2 입력정보
		idError: false,	pwError: false,	pw2Error: false,	// ID, PW, PW2 형식일치? false : true;
		idOk: false, pwOk: false, pw2Ok: false,		// ID, PW, PW2 형식일치? true : false; 모두 사용 가능해야 submit 버튼 활성
		idProcess: false, pwProcess: false, pw2Process: false,	// 현재 타이핑 중인 경우 true. Process Spinner를 표시
		idErrorMessage: "",		// ID 형식불일치, 중복아이디시 출력할 에러 메세지
		pwErrorMessage: "",		// PW 자리수 허용범위 초과시 출력할 에러 메세지
		joinProcess: false,		// 확인버튼 클릭시 Process Spinner 및 버튼 Disable처리를 위한 state
		showPage: false,	// FadeIn/Out Animaition 처리를 위한 변수
		dialogOpen: false,	// true : Dialog 팝업
		dialogIcon: 0,		// dialog에 표시할 아이콘. 0:none, 1:v, 2:x
		dialogTitle: "",
		dialogContent: "",
		dialogRedirect: "",	// dialog에서 Redirect할 url
	};
	t_checkId = null;	// ID 유효성 검사 Timeout 객체. 설정값 700 ms
	t_checkPw = null;	// PW 유효성 검사 Timeout 객체. 설정값 500 ms
	t_checkPw2 = null;	// PW2 유효성 검사 Timeout 객체. 설정값 500 ms

	componentWillMount() {
		this.setState({showPage: true});
	}
	handleChange = e => {
		// ============================ 입력정보 STATE에 저장 ===========================
		const { id, value } = e.target;
		this.setState({[id]: value});
		// ============================ ID / PW 유효성 검사 ===========================
		switch(id){
			case "id":
				clearTimeout(this.t_checkId);
				this.setState({idError: false, idOk: false, idProcess: true});
				this.props.countError({idError: 0});
				this.t_checkId = setTimeout(() => {
					if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)){
							Axios.get(`${process.env.REACT_APP_DEV_API_URL}/email/check`, { params : { email : value } })
								.then(resp => {
									console.log(resp.status); // FIXME: REMOVE ME
									this.setState({idOk: true, idProcess: false});
								})
								.catch(err => {
									console.log(err.response); // FIXME: REMOVE ME
									if(!err.response || !err.response.data) {
										this.setState({
											idProcess: false,
											dialogOpen: true,
											dialogIcon: 2,
											dialogTitle: "서버와 연결할 수 없습니다",
											dialogContent: "잠시후 다시 시도해 주세요..."
										});
									}
									else {
										this.setState({idError: true, idProcess: false, idErrorMessage: "사용중인 아이디 입니다"});
										this.props.countError({idError: 1});
									}
								});
					}
					else {
						if(value) {
							this.setState({idError: true, idProcess: false, idErrorMessage: "사용할 수 없는 형식 입니다"})
							this.props.countError({idError: 1});
						}
						else {
							this.setState({idError: false, idProcess: false, idErrorMessage: ""});
							this.props.countError({idError: 0});
						}
					}
				}, 700);
				if(!value) this.setState({idProcess: false});
				break;
			case "pw":
				clearTimeout(this.t_checkPw);
				this.setState({pwError: false, pwOk: false, pwProcess: true});
				this.props.countError({pwError: 0});
				this.t_checkPw = setTimeout(() => {
					if(value.length >= 8 && value.length <= 20){
						if(this.state.pw2 === value) {
							this.setState({pwOk: true, pw2Ok: true, pwError: false, pw2Error: false});
							this.props.countError({pwError: 0, pw2Error: 0});
						}
						else {
							this.setState({pwOk: true, pw2Ok: false, pwError: false, pw2Error: this.state.pw2 ? true : false});
							this.props.countError({pwError: 0, pw2Error: this.state.pw2 ? 1 : 0});
						}
					}
					else {
						if(value) {
							this.setState({pwOk: false, pw2Ok: false, pwError: true, pw2Error: this.state.pw2 ? true : false,
							pwErrorMessage: (value.length >= 20) ? "비밀번호는 20자를 넘을 수 없습니다" : "비밀번호는 8자 이상 입력해주세요"});
							this.props.countError({pwError: 1, pw2Error: this.state.pw2 ? 1 : 0});
						}
						else {
							this.setState({pwOk: false, pwError: false, pwErrorMessage: "", pw2Error: this.state.pw2 ? true : false, pw2Ok: false});
							this.props.countError({pwError: 0, pw2Error: this.state.pw2 ? 1 : 0});
						}
					}
					this.setState({pwProcess: false});
				}, 500);
				if(!value) this.setState({pwProcess: false});
			break;
			case "pw2":
				clearTimeout(this.t_checkPw2);
				this.setState({pw2Error: false, pw2Ok: false, pw2Process: true});
				this.props.countError({pw2Error: 0});
				this.t_checkPw2 = setTimeout(() => {
					if(this.state.pwOk && value === this.state.pw) {
						this.setState({pw2Ok: true, pw2Error: false});
						this.props.countError({pw2Error: 0});
					}
					else {
						if(value) {
							this.setState({pw2Ok: false, pw2Error: true});
							this.props.countError({pw2Error: 1});
						}
						else {
							this.setState({pw2Ok: false, pw2Error: false});
							this.props.countError({pw2Error: 0});
						}
					}
					this.setState({pw2Process: false});
				}, 500);
				if(!value) this.setState({pw2Process: false});
			break;
			default:
		}
	}
	handleSubmit = e => {
		e.preventDefault();
		this.setState({joinProcess: true});
		Axios.post(`${process.env.REACT_APP_DEV_API_URL}/join`, {
			email: this.state.id,
			pw: this.state.pw
		}).then(resp => {
			console.log(resp);	// FIXME: 지워주세용
			this.setState({joinProcess: false,
				dialogOpen: true,
				dialogIcon: 1,
				dialogTitle: "가입이 완료되었습니다",
				dialogContent: "가입하신 이메일로 전송된 인증 메일을 확인해주세요!",
				dialogRedirect: "/login"
			});
		}).catch(err => {
			console.log(err.response);
			this.setState({joinProcess: false,
				dialogOpen: true,
				dialogIcon: 2,
				dialogTitle: "서버와 연결할 수 없습니다",
				dialogContent: "잠시후 다시 시도해주세요..",
			});
		}); // FIXME: REMOVE LOG
	}
	handleCancel = e => {
		e.preventDefault();
		this.redirectToLogin();
	}
	handleDialogClose = () => {
		this.setState({ dialogOpen: false,
			dialogIcon: 0,
			dialogTitle:"",
			dialogContent:"" });
	  };
	redirectToLogin = () => {
		// 화면전환 애니메이션. 300ms 후 Login페이지로 이동
		this.setState({showPage: false});
		this.props.countError({idError:0, pwError: 0, pw2Error: 0});
		setTimeout(() => this.props.history.push('/login'), 300);
	}
	render() {
		const { id, pw, pw2,
				idError, pwError, pw2Error,
				idOk, pwOk, pw2Ok,
				idProcess, pwProcess, pw2Process,
				idErrorMessage, pwErrorMessage,
				joinProcess,
				showPage,
				dialogOpen, dialogIcon, dialogTitle, dialogContent, dialogRedirect
			} = this.state;
		return (
			<Fade in={showPage} timeout={{enter: 300, exit: 300}}>
				<form onSubmit={this.handleSubmit} noValidate autoComplete="off">
					<Grid container direction="column" justify="center" alignItems="center" spacing={8}>
						<Grid item>
							<Typography variant="headline">회원가입</Typography>
						</Grid>
						<Grid item>
							<TextField
								id="id"
								value={id}
								type="email"
								onChange={this.handleChange}
								placeholder="이메일 주소를 입력해주세요"
								label="아이디"
								error={idError}
								errorMessage={idErrorMessage}
								process={idProcess}
								disabled={joinProcess}
								ok={idOk}
								margin="dense"
							/>
						</Grid>
						<Grid item>
							<TextField
								id="pw"
								value={pw}
								type="password"
								onChange={this.handleChange}
								placeholder="비밀번호를 입력해주세요"
								label="비밀번호"
								error={pwError}
								errorMessage={pwErrorMessage}
								process={pwProcess}
								disabled={joinProcess}
								ok={pwOk}
								autoComplete="current-password"
								margin="dense"
							/>
						</Grid>
						<Grid item>
							<TextField
								id="pw2"
								value={pw2}
								type="password"
								onChange={this.handleChange}
								placeholder="비밀번호를 입력해주세요"
								label="비밀번호 재확인"
								error={pw2Error}
								errorMessage="비밀번호가 일치하지 않습니다"
								process={pw2Process}
								disabled={joinProcess}
								ok={pw2Ok}
								autoComplete="current-password"
								margin="dense"
							/>
						</Grid>
						<Grid item>
							<Button
								type="submit"
								process={joinProcess}
								disabled={!(idOk && pwOk && pw2Ok) || joinProcess}
								margin="30px 5px 5px 5px">
								확인
							</Button>
							<Button
								type="button"
								onClick={this.handleCancel}
								disabled={joinProcess}
								margin="30px 5px 5px 5px">
								취소
							</Button>
						</Grid>
					</Grid>
					<Dialog
						open={dialogOpen}
						onClose={this.handleDialogClose}
						title={dialogTitle}
						content={dialogContent}
						disableBackdrop={true}
						icon={dialogIcon}
						redirect={dialogRedirect}
					/>
				</form>
			</Fade>
		);
	}
}

export default JoinForm;