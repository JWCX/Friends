import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Axios from 'axios';
import { Dialog as MuiDialog,
	DialogTitle,
	DialogContent,
	Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { removeNotification } from 'actions';
import { Button,
		ChatBubble,
		ExpansionFriendRequest,
		LabelTiny,
		FriendAcceptButton,
		FriendRejectButton,
		Dialog
	} from 'components';

const styles = {
	paper: {
		padding: "30px 20px 30px 20px",
		width: "550px",
		maxHeight: "900px",
		borderRadius: "10px",
		margin: "0",
		textAlign: "center"
	},
	paperWidthXs: {
		width: "100%",
		background: "red",
	}
}

class DialogGroupApplicants extends React.Component {
	state = {
		// notifications의 개수에 맞게 `expand${id}`의 state가 생성됨

		dialogOpen: false,
		dialogTitle: "",
		dialogContent: "",
	}
	expandRequest = id => {
		this.setState(state => ({[`expanded${id}`]: !state[`expanded${id}`]}));
		console.log(this.state);
	}
	accpetRequest = id => {
		Axios.post(`${process.env.REACT_APP_DEV_API_URL}/group/accept`, {
			token: this.props.token,
			id: this.props.notifications[id].id,
			groupId: this.props.notifications[id].groupId,
			notification: this.props.notifications[id].notification
		})
		.then(resp => {
			console.log(resp);
			this.props.removeNotification(this.props.notifications, this.props.notifications[id].notification);
			this.setState({
				dialogOpen: true,
				dialogIcon: 1,
				dialogTitle: "가입신청을 수락했습니다!",
			});
		}).catch(err => {
			console.log(err);
			let errorTitle, errorMessage;
			// if(!err.response || !err.response.data) {
				errorTitle = "서버와 연결할 수 없습니다";
				errorMessage = "잠시후 다시 시도해 주세요...";
			// }
			// else {
			// 	errorTitle = err.response.data;
			// }
			this.setState({
				dialogOpen: true,
				dialogIcon: 2,
				dialogTitle: errorTitle,
				dialogContent: errorMessage
			});
		})
	}
	rejectRequest = id => {
		Axios.post(`${process.env.REACT_APP_DEV_API_URL}/group/reject`, {
			token: this.props.token,
			id: this.props.notifications[id].id,
			groupId: this.props.notifications[id].groupId,
			notification: this.props.notifications[id].notification
		})
		.then(resp => {
			console.log(resp);
			this.props.removeNotification(this.props.notifications, this.props.notifications[id].notification);
			this.setState({
				dialogOpen: true,
				dialogIcon: 1,
				dialogTitle: "가입신청을 거절했습니다.",
			});
		}).catch(err => {
			console.log(err);
			let errorTitle, errorMessage;
			// if(!err.response || !err.response.data) {
				errorTitle = "서버와 연결할 수 없습니다";
				errorMessage = "잠시후 다시 시도해 주세요...";
			// }
			// else {
			// 	errorTitle = err.response.data;
			// }
			this.setState({
				dialogOpen: true,
				dialogIcon: 2,
				dialogTitle: errorTitle,
				dialogContent: errorMessage
			});
		})
	}
	handleDialogClose = () => {
		this.setState({
			dialogOpen: false,
			dialogTitle: "",
			dialogContent: "",
		})
	}
	render() {
		const { id,
			dialogOpen,
			dialogTitle,
			dialogContent,
			dialogIcon
		} = this.state;
		const { notifications,
			classes, closeGroupApplicants, open, process } = this.props;
		return (
			<MuiDialog
				classes={{paper: classes.paper, paperWidthXs: classes.paperWidthXs}}
				disableBackdropClick={true}
				aria-labelledby="simple-dialog-title"
				open={open}>
					<Grid container
						direction="column"
						justify="center"
						alignItems="center"
						spacing={0}
						wrap="nowrap">
						<Grid item>
							<DialogTitle
								id="simple-dialog-title">
								가입신청자 목록
							</DialogTitle>
						</Grid>
						{
							_.filter(notifications, notification => notification.gubun === 1).length ?
								<Grid item>
								{
									_.filter(notifications, notification => notification.gubun === 1)
									 .map(notification => {
										if(!notification) return;
										return <ExpansionFriendRequest
											key={notification.notification}
											id={notification.notification}
											onClick={this.expandRequest}
											expanded={this.state[`expanded${id}`]}
											icon={null}
											summary={
												<LabelTiny
													width="350px"
													label={`[ ${notification.nickName} ] 님이 그룹 가입을 신청하였습니다.`}
													/>
											}>
											<Grid contianer
												direction="column"
												justify="center"
												alignItems="center"
												spacing={0}>
												<Grid item>
													<ChatBubble
														width={280}
														// nickName={notification.nickName}
														avatar={notification.image}
														msg={notification.message}
														/>
												</Grid>
												<Grid item>
													<FriendAcceptButton
														onClick={()=>{this.accpetRequest(notification.notification)}}/>
													<FriendRejectButton
														onClick={()=>{this.rejectRequest(notification.notification)}}/>
												</Grid>
											</Grid>
										</ExpansionFriendRequest>
									})
								}
								</Grid>
								:	<Grid item>
										<DialogContent
											style={{padding: "5px"}}>
											가입신청자가 없습니다.
										</DialogContent>
									</Grid>
						}
						<Grid item>
							<Button
								autoFocus
								disabled={process}
								onClick={closeGroupApplicants}
								margin="50px 5px 0 5px">
								닫기
							</Button>
						</Grid>
					</Grid>
					<Dialog
						open={dialogOpen}
						onClose={this.handleDialogClose}
						title={dialogTitle}
						content={dialogContent}
						icon={dialogIcon}
						disableBackdrop/>
			</MuiDialog>
		);
	}
}

const mapStateToProps = state => ({
	notifications: state.notifications,
	token: state.token
})
const mapDispatchToProps = {
	removeNotification
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DialogGroupApplicants));