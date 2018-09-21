import React from 'react';
import { withRouter } from 'react-router-dom';
import { Dialog as MuiDialog,
	DialogTitle,
	DialogContent,
	Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Button } from 'components';

const styles = {
	paper: {
		padding: "30px 20px 30px 20px",
		width: "500px",
		borderRadius: "10px",
		margin: "0",
	},
	paperWidthXs: {
		width: "100%",
		background: "red",
	}
}

class DialogYN extends React.Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.open !== nextProps.open ||
		this.props.title !== nextProps.title ||
		this.props.content !== nextProps.content ||
		this.props.process !== nextProps.process)
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
		const { classes, onSubmit, onCancel, title, content, disableBackdrop, open, process } = this.props;
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
								style={{padding: "10px", textAlign: "center"}}>
								{content}
							</DialogContent>
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

export default withRouter(withStyles(styles)(DialogYN));