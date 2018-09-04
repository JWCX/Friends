import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Fade } from '@material-ui/core';
// import { connect } from 'react-redux';

import { TextField, Button } from 'components';

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
		id: "",	pw: "",	pw2: "",	// ID, PW, PW2 입력정보
		idError: false,	pwError: false,	pw2Error: false,	// ID, PW, PW2 형식일치? false : true;
		idOk: false, pwOk: false, pw2Ok: false,		// ID, PW, PW2 형식일치? true : false; 모두 사용 가능해야 submit 버튼 활성
		idProcess: false, pwProcess: false, pw2Process: false,	// 현재 타이핑 중인 경우 true. Process Spinner를 표시
		idErrorMessage: "",		// ID 형식불일치, 중복아이디시 출력할 에러 메세지
		pwErrorMessage: "",		// PW 자리수 허용범위 초과시 출력할 에러 메세지
		joinProcess: false,		// 확인버튼 클릭시 Process Spinner 및 버튼 Disable처리를 위한 state
		showPage: false,	// FadeIn/Out Animaition 처리를 위한 변수
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
				this.t_checkId = setTimeout(() => {
					if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)){
						console.log("is email", value);
							Axios.get('http://localhost:8080/email/check', { params : { email : value } })
								.then(resp => {
									console.log(resp.status); // FIXME: REMOVE ME
									this.setState({idOk: true});
									this.setState({idProcess: false});
								})
								.catch(err => {
									console.log(err.response); // FIXME: REMOVE ME
									this.setState({idError: true, idProcess: false, idErrorMessage: "사용중인 아이디 입니다"});
								});
					}
					else {
						if(value)
							this.setState({idError: true, idProcess: false, idErrorMessage: "사용할 수 없는 형식 입니다"})
						else this.setState({idError: false, idProcess: false, idErrorMessage: ""});
					}
				}, 700);
				if(!value) this.setState({idProcess: false});
				break;
			case "pw":
				clearTimeout(this.t_checkPw);
				this.setState({pwError: false, pwOk: false, pwProcess: true});
				this.t_checkPw = setTimeout(() => {
					if(value.length >= 8 && value.length <= 20){
						if(this.state.pw2 === value)
							this.setState({pwOk: true, pw2Ok: true, pwError: false, pw2Error: false});
						else
							this.setState({pwOk: true, pw2Ok: false, pwError: false, pw2Error: this.state.pw2 ? true: false});
					}
					else {
						if(value)
							this.setState({pwOk: false, pw2Ok: false, pwError: true, pw2Error: this.state.pw2 ? true : false,
							pwErrorMessage: (value.length >= 20) ? "비밀번호는 20자를 넘을 수 없습니다" : "비밀번호는 8자 이상 입력해주세요"});
						else this.setState({pwOk: false, pwError: false, pwErrorMessage: "", pw2Error: this.state.pw2 ? true : false, pw2Ok: false});
					}
					this.setState({pwProcess: false});
				}, 500);
				if(!value) this.setState({pwProcess: false});
			break;
			case "pw2":
				clearTimeout(this.t_checkPw2);
				this.setState({pw2Error: false, pw2Ok: false, pw2Process: true});
				this.t_checkPw2 = setTimeout(() => {
					if(this.state.pwOk && value === this.state.pw)
						this.setState({pw2Ok: true, pw2Error: false});
					else {
						if(value)
							this.setState({pw2Ok: false, pw2Error: true});
						else this.setState({pw2Ok: false, pw2Error: false});
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
		Axios.post('http://localhost:8080/join', {
			email: this.state.id,
			pw: this.state.pw
		}).then(resp => {
			console.log(resp);	// FIXME: 지워주세용
		}).catch(err => console.log(err.response)); // FIXME: REMOVE LOG
	}
	handleCancel = e => {
		e.preventDefault();
		this.setState({showPage: false});
		setTimeout(() => {
			this.props.history.push('/');	// 화면전환 애니메이션. 500ms 후 Login페이지로 이동
		}, 500);
	}
	render() {
		const { id, pw, pw2,
				idError, pwError, pw2Error,
				idOk, pwOk, pw2Ok,
				idProcess, pwProcess, pw2Process,
				idErrorMessage, pwErrorMessage,
				joinProcess,
				showPage
			} = this.state;
		return (
			<Fade in={showPage} timeout={{enter: 500, exit: 500}}>
				<Form onSubmit={this.handleSubmit} noValidate autoComplete="off">
				{/* <p>새 계정 만들기</p> */}
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
						ok={idOk}
						margin={"dense"}/>
					<br/>
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
						ok={pwOk}
						autoComplete="current-password"
						margin={"dense"}/>
					<br/>
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
						ok={pw2Ok}
						autoComplete="current-password"
						margin={"dense"}/>
					<br/>
					<br/>
					<Button
						type="submit"
						process={joinProcess}
						disabled={!(idOk && pwOk && pw2Ok) || joinProcess}
						margin="20px 5px 10px 5px">
						확인
					</Button>
					<Button
						type="button"
						onClick={this.handleCancel}
						margin="20px 5px 10px 5px">
						취소
					</Button>
				</Form>
			</Fade>
		);
	}
}

// const mapStateToProps = (state) => ({
// })

// const mapDispatchToProps = {
// }

export default withRouter(JoinForm);