import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Axios from 'axios';
import { Dialog as MuiDialog,
	DialogTitle,
	DialogContent,
	Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { updateMyFriends, removeNotification } from 'actions';
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

class DialogFriendRequests extends React.Component {
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
		Axios.post("http://192.168.0.200:8080/friend/accept", {
			token: this.props.token,
			id: this.props.notifications[id].id,
			notification: this.props.notifications[id].notification
		})
		.then(resp => {
			console.log(resp);
			this.props.updateMyFriends(resp.data);
			this.props.removeNotification(this.props.notifications, this.props.notifications[id].notification);
			this.setState({
				dialogOpen: true,
				dialogIcon: 1,
				dialogTitle: "친구요청을 수락했습니다!",
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
		Axios.post("http://192.168.0.200:8080/friend/reject", {
			token: this.props.token,
			id: this.props.notifications[id].id,
			notification: this.props.notifications[id].notification
		})
		.then(resp => {
			console.log(resp);
			this.props.removeNotification(this.props.notifications, this.props.notifications[id].notification);
			this.setState({joinProcess: false,
				dialogOpen: true,
				dialogIcon: 1,
				dialogTitle: "요청을 거절했습니다.",
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
			dialogContent
		} = this.state;
		const { notifications,
			classes, closeFriendRequests, open, process } = this.props;
		return (
			<MuiDialog
				classes={{paper: classes.paper, paperWidthXs: classes.paperWidthXs}}
				disableBackdropClick={true}
				aria-labelledby="simple-dialog-title"
				open={open}>
					<Grid container direction="column" justify="center" alignItems="center" spacing={0}>
						<Grid item>
							<DialogTitle
								id="simple-dialog-title">
								친구요청 목록
							</DialogTitle>
						</Grid>
						{
							_.values(notifications).length ?
								<Grid item>
								{
									_.map(notifications, notification => {
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
													label={`${notification.nickName} 님의 친구요청을 확인하세요!`}
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
														nickName={notification.nickName}
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
											받은 요청이 없습니다..!
										</DialogContent>
									</Grid>
						}
						<Grid item>
							<Button
								autoFocus
								disabled={process}
								onClick={closeFriendRequests}
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
	updateMyFriends,
	removeNotification
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DialogFriendRequests));