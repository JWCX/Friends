import React, { Component } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.div`
		background: ${props => props.lock ? " rgb(235,235,235)" : "linear-gradient(180deg, #FFFFFF 30%, #FFFFFF 300%)"};
		padding: 0 5px;
		overflow-wrap: break-word;
		overflow: hidden;
`

export class LabelTiny extends Component {
	render() {
		const { label, lock, width, hidden } = this.props;
		return (
			<StyledLabel lock={lock} hidden={hidden}>
				<div style={{display:"inline-block", fontSize:"0.9em", verticalAlign: "middle", width: width ? width : "150px"}}>
					{label}
				</div>
			</StyledLabel>
		)
	}
}

export default LabelTiny;