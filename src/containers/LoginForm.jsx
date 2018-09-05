import React from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { Fade, Typography, Grid } from '@material-ui/core';
import { connect } from 'react-redux';

import { TextField, Button, Dialog } from 'components';
import { GoogleButton, NaverButton, FacebookButton } from 'components/SocialButtons';
import { userLoggedIn } from 'actions';

const Form = styled.form`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 10px 20px;
	border-radius: 10px;
	text-align: center;
	background: white;
	margin: auto;
`;

class JoinForm extends React.Component {
	state = {
		id: "",	pw: "",		// ID, PW 입력정보
		idError: false,	pwError: false,		// ID, PW, 형식일치? false : true;
		idOk: false, pwOk: false, 	// ID, PW, 형식일치? true : false; 모두 사용 가능해야 submit 버튼 활성
		idErrorMessage: "",		// ID 형식불일치, 중복아이디시 출력할 에러 메세지
		pwErrorMessage: "",		// PW 자리수 허용범위 초과시 출력할 에러 메세지
		loginProcess: false,		// 확인버튼 클릭시 Process Spinner 및 버튼 Disable처리를 위한 state
		showPage: false,
		dialogOpen: false,	// true : Dialog 팝업
		dialogIcon: 0,		// dialog에 표시할 아이콘. 0:none, 1:v, 2:x
		dialogTitle: "",
		dialogContent: "",
		dialogRedirect: "",
	};
	t_checkId = null;	// ID 유효성 검사 Timeout 객체. 설정값 700 ms
	t_checkPw = null;	// PW 유효성 검사 Timeout 객체. 설정값 500 ms

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
				this.setState({idError: false, idOk: false});
				this.t_checkId = setTimeout(() => {
					if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)){
						this.setState({idOk: true});
					}
					else {
						if(value)
							this.setState({idError: true, idErrorMessage: "잘못된 형식 입니다"})
						else this.setState({idError: false, idErrorMessage: ""});
					}
				}, 500);
				break;
			case "pw":
				clearTimeout(this.t_checkPw);
				this.setState({pwError: false, pwOk: false});
				this.t_checkPw = setTimeout(() => {
					if(value.length >= 8 && value.length <= 20){
							this.setState({pwOk: true, pwError: false});
					}
					else {
						if(value)
							this.setState({pwOk: false, pwError: true,
							pwErrorMessage: (value.length >= 20) ? "비밀번호는 20자를 넘을 수 없습니다" : "비밀번호는 8자 이상 입력해주세요"});
						else this.setState({pwOk: false, pwError: false, pwErrorMessage: ""});
					}
				}, 500);
			break;
			default:
		}
	}
	handleSubmit = e => {
		e.preventDefault();
		this.setState({loginProcess: true});
		Axios.post('http://192.168.0.200:8080/login', {
			email: this.state.id,
			pw: this.state.pw
		}).then(resp => {
			console.log("Logged in: ", resp);	// FIXME: REMOVE
			this.props.userLoggedIn({		// redux store에 시,구,관심사정보, 유저 token 저장
				dataInterest: resp.data.dataInterest,
				dataSi: resp.data.dataSi,
				dataGu: resp.data.dataGu,
				token: resp.data.token
			});
			this.handleRedirect("/");
		}).catch(err => {
			console.log(err.response);	// FIXME: REMOVE
			this.setState({
				loginProcess: false,
				dialogOpen: true,
				dialogIcon: 2,
				dialogTitle: err.response.data
			});
		});
	}
	handleClick = e => {
		e.preventDefault();
		this.handleRedirect("/join");
	}
	handleSocialClick = type => {
		console.log(`http://192.168.0.26:8080/login?name=${type}`);
		window.open(`http://192.168.0.26:8080/login?name=${type}`);
	}
	handleDialogClose = () => {		// Dialog 닫기시 호출 이벤트
		this.setState({ dialogOpen: false,
			dialogIcon: 0,
			dialogTitle:"",
			dialogContent:"" });
	  };
	handleRedirect = url => {	// 페이지 이동
		this.setState({showPage: false});
			setTimeout(() => this.props.history.push(url), 300);
	}
	render() {
		const { id, pw,
				idError, pwError,
				idOk, pwOk,
				idErrorMessage, pwErrorMessage,
				loginProcess,
				showPage,
				dialogOpen, dialogIcon, dialogTitle, dialogContent, dialogRedirect
			} = this.state;
		return (
			<Fade in={showPage} timeout={{enter: 300, exit: 300}}>
				<Form onSubmit={this.handleSubmit} noValidate autoComplete="off">
					<Grid container direction="column" justify="center" alignItems="center" spacing={0}>
						<Grid item>
							<Typography variant="headline">로그인</Typography>
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
								ok={idOk}
								disabled={loginProcess}
								margin={"dense"}
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
								ok={pwOk}
								disabled={loginProcess}
								autoComplete="current-password"
								margin={"dense"}
							/>
						</Grid>
						<Grid item>
							<Button
								type="submit"
								process={loginProcess}
								disabled={!(idOk && pw.length <= 20 && pw.length >= 8) || loginProcess}
								margin="30px 5px 5px 5px">
								로그인
							</Button>
							<Button
								type="button"
								onClick={this.handleClick}
								disabled={loginProcess}
								margin="30px 5px 5px 5px">
								회원가입
							</Button>
						</Grid>
						<Grid item container direction="row" justify="center" alignItems="center" spacing={0}>
							<Grid item>
								<GoogleButton
									onClick={()=>{this.handleSocialClick("google")}}/>
							</Grid>
							<Grid item>
								<NaverButton
									onClick={()=>{this.handleSocialClick("naver")}}/>
							</Grid>
							<Grid item>
								<FacebookButton
									onClick={()=>{this.handleSocialClick("facebook")}}/>
							</Grid>
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
				</Form>
			</Fade>
		);
	}
}

const mapStateToProps = state => ({
	token : state.token,
	dataInterest : state.dataInterest,
	dataSi : state.dataSi,
	dataGu : state.dataGu,
})
const mapDispatchToProps = {
	userLoggedIn
}
export default connect(mapStateToProps, mapDispatchToProps)(JoinForm);