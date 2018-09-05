import React from 'react';
import Axios from 'axios';
import { Fade, Typography, Grid } from '@material-ui/core';

import { TextField, Button, Dialog } from 'components';

class AmnesiaForm extends React.Component {
	state = {
		id: "",
		idError: false,
		idOk: false,
		idProcess: false,
		idErrorMessage: "",
		findProcess: false,
		showPage: false,
		dialogOpen: false,
		dialogIcon: 0,
		dialogTitle: "",
		dialogContent: "",
		dialogRedirect: "",
	};
	t_checkId = null;

	componentWillMount() {
		this.setState({showPage: true});
	}
	handleChange = e => {
		const { id, value } = e.target;
		this.setState({[id]: value});
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
	}
	handleSubmit = e => {
		e.preventDefault();
		this.setState({findProcess: true});
		Axios.get('http://192.168.0.26:8080/password', {
			params: { email: this.state.id }
		}).then(resp => {
			console.log(resp);	// FIXME: 지워주세용
			this.setState({findProcess: false,
				dialogOpen: true,
				dialogIcon: 1,
				dialogTitle: "임시 비밀번호가 발급되었습니다",
				dialogContent: "가입하신 이메일로 전송된 임시 비밀번호를 확인해주세요.",
				dialogRedirect: "/login"
			});
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
				findProcess: false,
				dialogOpen: true,
				dialogIcon: 2,
				dialogTitle: errorTitle,
				dialogContent: errorMessage
			});
		}); // FIXME: REMOVE LOG
	}
	handleCancel = e => {
		e.preventDefault();
		this.setState({showPage: false});
		this.redirectToLogin();
	}
	handleDialogClose = () => {
		this.setState({ dialogOpen: false,
			dialogIcon: 0,
			dialogTitle:"",
			dialogContent:"" });
	  };
	redirectToLogin = () => {
		this.props.countError({idError:0, pwError: 0, pw2Error: 0});
		setTimeout(() => this.props.history.push('/login'), 300);
	}
	render() {
		console.log(this.props);
		const { id,
				idError,
				idOk,
				idProcess,
				idErrorMessage,
				findProcess,
				showPage,
				dialogOpen, dialogIcon, dialogTitle, dialogContent, dialogRedirect
			} = this.state;
		return (
			<Fade in={showPage} timeout={{enter: 300, exit: 300}}>
				<form onSubmit={this.handleSubmit} noValidate autoComplete="off">
					<Grid container direction="column" justify="center" alignItems="center" spacing={0}>
						<Grid item>
							<Typography variant="headline">비밀번호 찾기</Typography>
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
								disabled={findProcess}
								ok={idOk}
								margin={"dense"}
							/>
						</Grid>
						<Grid item>
							<Button
								type="submit"
								process={findProcess}
								disabled={!idOk || findProcess}
								margin="30px 5px 5px 5px">
								확인
							</Button>
							<Button
							type="button"
							onClick={this.handleCancel}
							disabled={findProcess}
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

export default AmnesiaForm;