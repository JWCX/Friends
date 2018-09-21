import React from 'react';
import { Dialog as MuiDialog,
	DialogTitle,
	DialogContent,
	Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Button,
		ChatBubble,
		ChatBubbleMe } from 'components';

const styles = {
	paper: {
		padding: "30px 20px 30px 20px",
		width: "550px",
		borderRadius: "10px",
		margin: "0",
	},
	paperWidthXs: {
		width: "100%",
		background: "red",
	}
}

class DialogFriendRequestForm extends React.Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.open !== nextProps.open ||
		this.props.title !== nextProps.title ||
		this.props.content !== nextProps.content ||
		this.props.process !== nextProps.process ||
		this.props.dialogFrMyMsg !== nextProps.dialogFrMyMsg)
			return true;
		else return false;
	}
	handleClose = e => {
		console.log(e.target.id);
		// if(this.props.redirect)
		// 	setTimeout(() => this.props.history.push(this.props.redirect), 0);
		// else
		// 	this.props.onClose();
	}
	render() {
		const { classes, onSubmit, onCancel, title, content, disableBackdrop, open, process,
			dialogFrMsg, dialogFrMyMsg, dialogFrAvatar, dialogFrMyAvatar, handleInputChange
		} = this.props;
		return (
			<MuiDialog
				classes={{paper: classes.paper, paperWidthXs: classes.paperWidthXs}}
				disableBackdropClick={disableBackdrop}
				aria-labelledby="simple-dialog-title"
				open={open}>
					<Grid container direction="column" justify="center" alignItems="center" spacing={0}>
						<Grid item>
							<DialogTitle
								id="simple-dialog-title">
								{title}
							</DialogTitle>
						</Grid>
						<Grid item>
							<DialogContent
								style={{padding: "10px"}}>
								{content}
							</DialogContent>
						</Grid>
						<Grid item>
							<ChatBubble
								width={350}
								avatar={dialogFrAvatar}
								msg={dialogFrMsg}/>
						</Grid>
						<Grid item>
							<ChatBubbleMe
								width={350}
								msg={dialogFrMyMsg}
								inputId="dialogFrMyMsg"
								avatar={dialogFrMyAvatar}
								label="친구신청 메세지"
								disabled={process}
								onChange={handleInputChange}/>
						</Grid>
						<Grid item>
							<Button
								disabled={process}
								process={process}
								onClick={onSubmit}
								margin="50px 5px 0 5px">
								확인
							</Button>
							<Button
								autoFocus
								disabled={process}
								onClick={onCancel}
								margin="50px 5px 0 5px">
								취소
							</Button>
						</Grid>
					</Grid>
			</MuiDialog>
		);
	}
}

export default withStyles(styles)(DialogFriendRequestForm);