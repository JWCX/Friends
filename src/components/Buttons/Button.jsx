import React, { Component } from 'react'
import { Button as MuiButton,
	Fade,
	CircularProgress, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const styles = {
	root: {
		padding: "11px",
		color: "white",
		transition: "all .15s ease-in-out;"
		// margin: "10px",
	},
	disabled: {
		background: "linear-gradient(45deg, #8c98d9 10%, #66ffff 270%)",
		boxShadow: "0 3px 15px -2px rgba(3, 169, 244, 0.2)",
		opacity: "0.75",
	},
}

const StyledButton = styled(MuiButton)`
	background: linear-gradient(45deg, #03a9f4 40%, #ccffe6 200%);
	height: 40px;
	width: 120px;
	border: 0;
	border-Radius: 5;
	box-Shadow: 0 3px 15px -2px rgba(3, 169, 244, 0.6);
	transition: all .2s ease-in-out;
	&:hover {
		background: linear-gradient(45deg, #03a9f4 35%, #FFFFFF 160%);
		box-Shadow: 0 3px 15px -2px rgba(3, 169, 244, 0.8);
		transform: scale(1.03);
		border-radius: 8px;
	}
`
class Button extends Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.process !== nextProps.process ||
			this.props.disabled !== nextProps.disabled)
			return true;
		else return false;
	}
	render() {
		const { classes, type, children, margin, width, height, zIndex,
				disabled, process, onClick, autoFocus } = this.props;
		return (
			<StyledButton type={type}
			classes={{ root: classes.root,
				disabled: classes.disabled }}
			disabled={disabled}
			onClick={onClick}
			style={{margin, width, height, zIndex}}
			focusRipple={true}
			autoFocus={autoFocus}
			>
				{!process ? children : "processing"}
				{
					process ?
					<Fade in={process}>
						<CircularProgress style={{ position: "absolute", color:"#3352ff" }} size={20} thickness={6} />
					</Fade> : ""
				}
			</StyledButton>
		);
	}
}

export default withStyles(styles)(Button);