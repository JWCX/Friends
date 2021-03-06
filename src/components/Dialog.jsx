import React from 'react';
import { withRouter } from 'react-router-dom';
import { Dialog as MuiDialog,
	DialogTitle,
	DialogContent,
	Fade,
	Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MtSvgLines from 'react-mt-svg-lines';

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

class Dialog extends React.Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.open !== nextProps.open ||
			this.props.title !== nextProps.title ||
			this.props.content !== nextProps.content ||
			this.props.icon !== nextProps.icon)
			return true;
		else return false;
	}
	handleClose = () => {
		if(this.props.redirect)
			setTimeout(() => this.props.history.push(this.props.redirect), 0);
		this.props.onClose();
	}
	render() {	// Dialog icon은 각각 0:none, 1:success(v), 2:failed(x)
		const { classes, onClose, title, content, disableBackdrop, icon, open } = this.props;
		return (
			<MuiDialog
				classes={{paper: classes.paper, paperWidthXs: classes.paperWidthXs}}
				disableBackdropClick={disableBackdrop}
				onClose={onClose}
				aria-labelledby="simple-dialog-title"
				open={open}>
					<Grid container direction="column" justify="center" alignItems="center" spacing={0}>
						{
							icon ?
							<Grid item>
								{
									icon===1 &&		// v 아이콘 출력
									<Fade in={true} timeout={{enter: 1000, exit: 1000}}>
										<div style={{background: "linear-gradient(135deg, #03a9f4 10%, #00e600 270%)",
													height: "50px",
													width: "50px",
													borderRadius: "25px",
													boxShadow: "0 1px 10px 0 rgba(102, 180, 180, 0.9)"}}>
											<MtSvgLines animate={500} duration={1000}>
													<svg viewBox="0 0 100 100">
														<path stroke="white" strokeWidth="7" fill="none" d="M20.8,51c0,0,20.8,18.2,21.5,18.2c0.6,0,33.3-38.5,33.3-38.5" />
													</svg>
											</MtSvgLines>
										</div>
									</Fade>
								}
								{
									icon===2 &&		// x 아이콘 출력
									<Fade in={true} timeout={{enter: 1000, exit: 1000}}>
										<div style={{background: "linear-gradient(135deg, #ff1a1a 10%, #ffff99 270%)",
												height: "50px",
												width: "50px",
												borderRadius: "25px",
												boxShadow: "0 1px 10px 0 rgba(255, 102, 102, 0.9)"}}>
											<MtSvgLines animate={500} duration={1000}>
													<svg viewBox="0 0 100 100">
														<path stroke="white" strokeWidth="7" fill="none" d="M50,50 L25,25 M50,50 L25,75"/>
														<path stroke="white" strokeWidth="7" fill="none" d="M50,50 L75,25 M50,50 L75,75"/>
													</svg>
											</MtSvgLines>
										</div>
									</Fade>
								}
							</Grid> : ""
						}
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
							<Button
								autoFocus
								onClick={this.handleClose}
								margin="50px 0 0 0">
								확인
							</Button>
						</Grid>
					</Grid>
			</MuiDialog>
		);
	}
}

export default withRouter(withStyles(styles)(Dialog));