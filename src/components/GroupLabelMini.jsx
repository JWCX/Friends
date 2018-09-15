import React, { Component } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.div`
		background: ${props => props.lock ? " rgb(235,235,235)" : "linear-gradient(180deg, #FFFFFF 30%, #FFFFFF 300%)"};
		padding: 0 5px;
`

export class GroupLabelMini extends Component {
	render() {
		const { label, lock } = this.props;
		return (
			<StyledLabel lock={lock}>
				<div style={{display:"inline-block", fontSize:"0.9em", verticalAlign: "middle", width:"210px"}}>
					{label}
				</div>
			</StyledLabel>
		)
	}
}

export default GroupLabelMini;