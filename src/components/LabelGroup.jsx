import React, { Component } from 'react';
import styled from 'styled-components';

import { NanoMysteryIcon } from 'components/AppBarIcons';

const StyledLabel = styled.div`
	background: ${props => props.lock ? " rgb(235,235,235)" : "linear-gradient(180deg, #FFFFFF 30%, #FFFFFF 300%)"};
	box-shadow: 0 2px 10px -2px rgba(80,80,80,0.3);
	border-radius: 5px;
	width: 500px;
	padding: 8px 5px;
	height: 100%;

	max-height: 155px;
	overflow-wrap: break-word;
	overflow: hidden;
`

export class Label extends Component {
	render() {
		const { center, icon, label, lock } = this.props;
		return (
			<StyledLabel lock={lock}>
				<div style={{display:"inline-block", verticalAlign: "middle", width:"25px"}}>
					{icon}
				</div>
				<div style={{display:"inline-block", verticalAlign: "middle", width:"455px", textAlign: center && "center", filter: lock ? "blur(1px)" : "none"}}>
					{ lock ? <NanoMysteryIcon  padding="0 0 3px 0"/> : label }
				</div>
			</StyledLabel>
		)
	}
}

export default Label;