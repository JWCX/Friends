import React from 'react'
import { Button as MuiButton,
	Fade,
	CircularProgress, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

const styles = {
	root: {
		background: "linear-gradient(135deg, #667cff 10%, #66ffff 270%)",
		height: 40,
		width: 120,
		padding: "11px",
		color: "white",
		border: 0,
		borderRadius: 5,
		boxShadow: "0 0 15px 0 rgba(102, 124, 255, 0.9)",
		// margin: "10px",
	},
	disabled: {
		background: "linear-gradient(135deg, #8c98d9 10%, #66ffff 270%)",
		boxShadow: "0 0 10px 0 rgba(102, 124, 255, 0.5)",
		opacity: "0.85",
	}
};

const Button = (props) => {
	const { children, classes, type, margin, width, height, disabled, process, onClick } = props;
	return (
		<MuiButton type={type}
		classes={{ root: classes.root,
			disabled: classes.disabled }}
		disabled={disabled}
		onClick={onClick}
		style={{margin, width, height}}
		>
			{!process ? children : "processing"}
			<Fade in={process}>
				<CircularProgress style={{ position: "absolute", color:"#3352ff" }} size={20} thickness={6} />
			</Fade>
		</MuiButton>
	);
}

export default withStyles(styles)(Button);