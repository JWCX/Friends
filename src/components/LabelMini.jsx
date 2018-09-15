import React, { Component } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.div`
		background: ${props => props.lock ? " rgb(235,235,235)" : "linear-gradient(180deg, #FFFFFF 30%, #FFFFFF 300%)"};
		padding: 0 5px;
`

export class LabelMini extends Component {
	render() {
		const { icon, label, lock } = this.props;
		return (
			<StyledLabel lock={lock}>
				<div style={{display:"inline-block", verticalAlign: "middle", width:"25px"}}>
					{icon}
				</div>
				<div style={{display:"inline-block", fontSize:"0.9em", verticalAlign: "middle", width:"185px"}}>
					{label}
				</div>
			</StyledLabel>
		)
	}
}

export default LabelMini;