import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import styled from 'styled-components';
import { Fade, Typography, Grid } from '@material-ui/core';

import { TextField, Button, Dialog } from 'components';
import { GoogleButton, NaverButton, FacebookButton } from 'components/SocialButtons';
import { userLoggedIn } from 'actions';

const Anchor = styled.div`
	color: rgb(160,160,250);
	transition: all .2s ease-in-out;
	cursor: pointer;
	font-size: 13px;
	padding: 8px 0;
	&:hover {
		color: rgb(80,80,255);
	}
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
		mount: false,
		dialogOpen: false,	// true : Dialog 팝업
		dialogIcon: 0,		// dialog에 표시할 아이콘. 0:none, 1:v, 2:x
		dialogTitle: "",
		dialogContent: "",
		dialogRedirect: "",
	};
	t_checkId = null;	// ID 유효성 검사 Timeout 객체. 설정값 700 ms
	t_checkPw = null;	// PW 유효성 검사 Timeout 객체. 설정값 500 ms

	componentWillMount() {
		setTimeout(() => {
			this.setState({mount: true, showPage: true});
		}, 230);
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
				this.props.countError({idError: 0});
				this.t_checkId = setTimeout(() => {
					if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)){
						this.setState({idOk: true});
					}
					else {
						if(value) {
							this.setState({idError: true, idErrorMessage: "잘못된 형식 입니다"})
							this.props.countError({idError: 1});
						}
						else {
							this.setState({idError: false, idErrorMessage: ""});
							this.props.countError({idError: 0});
						}
					}
				}, 500);
				break;
			case "pw":
				clearTimeout(this.t_checkPw);
				this.setState({pwError: false, pwOk: false});
				this.props.countError({pwError: 0});
				this.t_checkPw = setTimeout(() => {
					if(value.length >= 8 && value.length <= 20){
						this.setState({pwOk: true, pwError: false});
						this.props.countError({pwError: 0});
					}
					else {
						if(value) {
							this.setState({pwOk: false, pwError: true,
							pwErrorMessage: (value.length >= 20) ? "비밀번호는 20자를 넘을 수 없습니다" : "비밀번호는 8자 이상 입력해주세요"});
							this.props.countError({pwError: 1});
						}
						else {
							this.setState({pwOk: false, pwError: false, pwErrorMessage: ""});
							this.props.countError({pwError: 0});
						}
					}
				}, 500);
			break;
			default:
		}
	}
	handleSubmit = e => {
		e.preventDefault();
		this.setState({loginProcess: true});
		Axios.post('http://192.168.0.201:8080/login', {
			email: this.state.id,
			pw: this.state.pw
		}).then(resp => {
			console.log("Logged in: ", resp);	// FIXME: REMOVE
			this.props.userLoggedIn({
				dataInterest: resp.data.dataInterest,
				dataSi: resp.data.dataSi,
				dataGu: resp.data.dataGu,
				token: resp.data.token,
				myInfo: resp.data.myInfo,
			});
			this.handleRedirect("/");
		}).catch(err => {
			console.log(err.response);	// FIXME: REMOVE
			let errorTitle, errorMessage;
			if(!err.response || !err.response.data) {
				errorTitle = "서버와 연결할 수 없습니다";
				errorMessage = "잠시후 다시 시도해 주세요...";
			}
			else {
				errorTitle = err.response.data;
			}
			this.setState({
				loginProcess: false,
				dialogOpen: true,
				dialogIcon: 2,
				dialogTitle: errorTitle,
				dialogContent: errorMessage
			});
		});
	}
	handleClick = (e, url) => {
		e.preventDefault();
		this.handleRedirect(url);
	}
	handleSocialClick = type => {
		window.open(`http://192.168.0.201:8080/login?name=${type}`);
	}
	handleDialogClose = () => {		// Dialog 닫기시 호출 이벤트
		this.setState({ dialogOpen: false,
			dialogIcon: 0,
			dialogTitle:"",
			dialogContent:"" });
	  };
	handleRedirect = url => {	// 페이지 이동
		this.props.countError({idError:0, pwError: 0});
		this.setState({showPage: false});
		setTimeout(() => {
			this.setState({mount: false});
			setTimeout(() => {
				this.props.history.push(url);
			}, 50);
		}, 200);
	}
	render() {
		const { id, pw,
				idError, pwError,
				idOk, pwOk,
				idErrorMessage, pwErrorMessage,
				loginProcess,
				showPage, mount,
				dialogOpen, dialogIcon, dialogTitle, dialogContent, dialogRedirect
			} = this.state;
		return (
			<Fade in={showPage} timeout={{enter: 300, exit: 300}}>
			{
				mount ?
				<form onSubmit={this.handleSubmit} noValidate autoComplete="off">
					<Grid container direction="column" justify="center" alignItems="center" spacing={8}>
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
								ok={pwOk}
								disabled={loginProcess}
								autoComplete="current-password"
								margin="dense"
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
								onClick={e => this.handleClick(e, "/join")}
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
						<Grid item container direction="row" justify="center" alignItems="center" spacing={16}>
							<Grid item>
								<Anchor
									onClick={e => this.handleClick(e, "/amnesia")}>
									비밀번호를 잊어버렸어요!
								</Anchor>
							</Grid>
							<Grid item>
								<span style={{borderRight:"1px solid rgb(200,200,200)"}}></span>
							</Grid>
							<Grid item>
								<Anchor onClick={e => this.handleClick(e, "/info")}>
									사이트 소개
								</Anchor>
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
				</form> : <span></span>
			}
			</Fade>
		);
	}
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = {
	userLoggedIn
}
export default connect(mapStateToProps, mapDispatchToProps)(JoinForm);