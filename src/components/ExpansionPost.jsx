import React from 'react'
import { ExpansionPanel,
		ExpansionPanelSummary,
		ExpansionPanelDetails,
	} from '@material-ui/core';
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


export default class ExpansionFriendRequest extends React.Component {

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
				<ExpansionPanelSummary onClick={()=>{onClick(id)}} expandIcon={icon}>
					{summary}
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					{children}
				</ExpansionPanelDetails>
			</MyExPan>
		)
	}
}

