import React from 'react'
import { Button as MuiButton,
	Fade,
	CircularProgress, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	root: {
		background: "linear-gradient(135deg, #03a9f4 15%, #00e600 300%)",
		height: 40,
		width: 120,
		padding: "11px",
		color: "white",
		border: 0,
		borderRadius: 5,
		boxShadow: "0 1px 10px 0 rgba(102, 180, 180, 0.7)",
		// margin: "10px",
	},
	disabled: {
		background: "linear-gradient(135deg, #8c98d9 10%, #66ffff 270%)",
		boxShadow: "0 1px 10px 0 rgba(102, 180, 180, 0.3)",
		opacity: "0.85",
	}
};

const Button = ({ classes, type, children, margin, width, height, disabled, process, onClick, autoFocus }) => {
	return (
		<MuiButton type={type}
		classes={{ root: classes.root,
			disabled: classes.disabled }}
		disabled={disabled}
		onClick={onClick}
		style={{margin, width, height}}
		autoFocus={autoFocus}
		>
			{!process ? children : "processing"}
			{
				process ?
				<Fade in={process}>
					<CircularProgress style={{ position: "absolute", color:"#3352ff" }} size={20} thickness={6} />
				</Fade> : ""
			}
		</MuiButton>
	);
}

export default withStyles(styles)(Button);