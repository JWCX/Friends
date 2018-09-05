import React from 'react';
import Axios from 'axios';
import { Fade, Typography, Grid } from '@material-ui/core';

import { TextField, Button, Dialog } from 'components';

class SiteInfo extends React.Component {
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
						console.log("is email", value);
							Axios.get('http://192.168.0.26:8080/email/check', { params : { email : value } })
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
		Axios.post('http://192.168.0.26:8080/join', {
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
	handleClick = e => {
		e.preventDefault();
		this.setState({showPage: false});
		this.redirectToLogin();
	}
	redirectToLogin = () => {
		setTimeout(() => this.props.history.push('/login'), 300);
	}
	render() {
		const {
				showPage,
			} = this.state;
		return (
			<Fade in={showPage} timeout={{enter: 300, exit: 300}}>
					<Grid container direction="column" justify="center" alignItems="center" spacing={16}>
						<Grid item>
							<Typography variant="headline">FRIENDS</Typography>
						</Grid>
						<Grid item>
							<Typography variant="subheading">내용은</Typography>
							<Typography variant="body2">Lorem ipsum dolor sit amet,
							consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
							 consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
							 nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
							  mollit anim id est laborum.
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="subheading">이곳에</Typography>
							<Typography variant="body2">Lorem ipsum dolor sit amet,
							consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
							 consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
							 nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
							  mollit anim id est laborum.
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="subheading">입력</Typography>
							<Typography variant="body2">Lorem ipsum dolor sit amet,
							consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
							 consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
							 nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
							  mollit anim id est laborum.
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="subheading">개발자들</Typography>
							<Grid container direction="row" justify="center" alignItems="center" spacing={24}>
								<Grid item>
									<Typography variant="body2">AVATAR는 이곳에</Typography>
								</Grid>
								<Grid item>
									<Typography variant="body2">AVATAR는 이곳에</Typography>
								</Grid>
								<Grid item>
									<Typography variant="body2">AVATAR는 이곳에</Typography>
								</Grid>
								<Grid item>
									<Typography variant="body2">AVATAR는 이곳에</Typography>
								</Grid>
								<Grid item>
									<Typography variant="body2">AVATAR는 이곳에</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Button
							type="button"
							onClick={this.handleClick}
							margin="30px 5px 5px 5px">
								돌아가기
							</Button>
						</Grid>
					</Grid>
			</Fade>
		);
	}
}

export default SiteInfo;