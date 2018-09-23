import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

const Common = styled.div`
	padding: 0 3px;
	transition: all .1s ease-in-out;
	/* height: 40px; */
	/* line-height: 40px; */
	border: red 1px solid;
	/* box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12); */
	border-radius: 5px;
`
const ContentContainer = styled(Common)`
	width: 100%;
	font-size: 0.9em;
`

export class PostContent extends Component {
	shouldComponentUpdate(nextProps) {
		if( this.props.writedate !== nextProps.writedate ||
			this.props.views !== nextProps.views ||
			this.props.comments !== nextProps.comments ||
			this.props.likes !== nextProps.likes ||
			this.props.expanded !== nextProps.expanded )
			return true;
		return false;
	}
	render() {
		const { children } = this.props;
		return (
			<ContentContainer>
				{children}
			</ContentContainer>
		)
	}
}

export default PostContent;