import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dialog as MuiDialog,
	Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { closeMe } from 'actions';
import { MeInfo } from 'containers';
import { TextField, } from 'components';

const styles = {
	paper: {
		padding: "30px 20px 30px 20px",
		width: "800px",
		// minWidth: "800px",
		height: "800px",
		borderRadius: "10px",
		margin: "0",
	},
	paperWidthXs: {
		width: "100%",
		background: "red",
	}
}

class Me extends React.Component {
	handleClose = () => {
		this.props.closeMe();
	}

	render() {	// Dialog icon은 각각 0:none, 1:success(v), 2:failed(x)
		console.log(this.props);
		const { classes, onClose, disableBackdrop, icon, redirect, ...other } = this.props;
		return (
			<MuiDialog
				classes={{paper: classes.paper, paperWidthXs: classes.paperWidthXs}}
				disableBackdropClick={disableBackdrop}
				onClose={this.handleClose}
				aria-labelledby="simple-dialog-title"
				{...other}>
					<MeInfo/>
					{/* <Grid container direction="column" justify="center" alignItems="center" spacing={0}>
						<Grid item>
						</Grid>
						<Grid item>
						</Grid>
					</Grid> */}
			</MuiDialog>
		);
	}
}

const mapStateToProps = (state) => ({

})
const mapDispatchToProps = {
	closeMe
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Me)));