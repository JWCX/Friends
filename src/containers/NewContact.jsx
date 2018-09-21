import React from 'react';
import { Dialog as MuiDialog,
	DialogContent,
	Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Button,
		SelectContact } from 'components';

const styles = {
	paper: {
		padding: "30px 20px 30px 20px",
		height: "350px",
		width: "400px",
		borderRadius: "10px",
		margin: "0",
	},
	paperWidthXs: {
		width: "100%",
		background: "red",
	}
}

class NewContact extends React.Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.open !== nextProps.open ||
		this.props.process !== nextProps.process ||
		this.props.selectedFriend !== nextProps.selectedFriend ||
		this.props.disabled !== nextProps.disabled )
			return true;
		else return false;
	}
	render() {
		const { classes,
			onSubmit,
			onCancel,
			disableBackdrop,
			open,
			process,
			handleSelectContact,
			selectedFriend,
			disabled } = this.props;
		return (
			<MuiDialog
				classes={{paper: classes.paper, paperWidthXs: classes.paperWidthXs}}
				disableBackdropClick={disableBackdrop}
				aria-labelledby="simple-dialog-title"
				open={open}>
					<Grid container
					direction="column"
					justify="space-evenly"
					alignItems="center"
					wrap="nowrap"
					spacing={8}>
						<Grid item>
							<DialogContent
								style={{padding: "10px"}}>
								채팅을 시작할 친구를 선택하세요
							</DialogContent>
						</Grid>
						<Grid item>
							<SelectContact
								selectedFriend={selectedFriend}
								handleSelectContact={handleSelectContact}
								disabled={process}/>
						</Grid>
						<Grid item>
							<div style={{height:"90px"}}>
							</div>
						</Grid>
						<Grid item>
							<Button
								disabled={process || disabled}
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

export default withStyles(styles)(NewContact);