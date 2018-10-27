import React from 'react'
import { ExpansionPanel,
		ExpansionPanelSummary,
		ExpansionPanelDetails,
	} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const MyExPan = styled(ExpansionPanel)`
	width: 100%;
	display: inline-block;
	position: ${props => props.position};
	top: ${props => props.top};
	z-index:1000;
	&:hover {
		background: ${props => !props.expanded && "rgb(200,230,255)"};
	}
`

const styles = {
	root: {
		display: "flex",
		position: "relative",
		left: "50%",
		transform: "translateX(-50%)",
		width: "975px",
		padding: "0 0 15px",
	}
}

class ExpansionPost extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		console.log("expanded", this.props.expanded !== nextProps.expanded)
		console.log("summary", this.props.summary !== nextProps.summary)
		console.log("children", this.props.children !== nextProps.children)
		console.log("id", this.props.id !== nextProps.id)

		if(this.props.expanded !== nextProps.expanded ||
			this.props.summary !== nextProps.summary ||
			this.props.children !== nextProps.children ||
			this.props.id !== nextProps.id)
			return true;
		return false;
	}
	render() {
		const {expanded, icon, summary, children, position,
			top, onClick, id, } = this.props;
		return (
			<MyExPan style={{
					margin: expanded && "15px 0",
					borderRadius: "10px",
					// width:"100%", display:"inline-block", position, top, zIndex:1000,
					transition: "all 0.2s ease-in-out",
				}}
				expanded={expanded}>
				<ExpansionPanelSummary
					onClick={()=>{onClick(id)}}
					expandIcon={icon}>
					{summary}
				</ExpansionPanelSummary>
				<ExpansionPanelDetails
					classes={{root: this.props.classes.root}}
					style={{width: this.props.group && "780px"}}>
					{children}
				</ExpansionPanelDetails>
			</MyExPan>
		)
	}
}
export default withStyles(styles)(ExpansionPost);
