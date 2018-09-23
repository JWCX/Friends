import React, { Component } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.div`
		padding: 0 5px;
		/* overflow-wrap: break-word; */

		text-overflow: clip;
		display: flex;
		flex-wrap: nowrap;
		overflow: hidden;
`

export class LabelMini extends Component {
	render() {
		const { icon, label, lock, width } = this.props;
		return (
			<StyledLabel lock={lock}>
				<div style={{display:"inline-block", verticalAlign: "middle", width:"25px"}}>
					{icon}
				</div>
				{/* <div style={{display:"inline-block", fontSize:"0.9em", verticalAlign: "middle", width: width ? width : "185px"}}> */}
				<div style={{display:"inline-block", fontSize:"0.9em", verticalAlign: "middle"}}>
					{label}
				</div>
			</StyledLabel>
		)
	}
}

export default LabelMini;