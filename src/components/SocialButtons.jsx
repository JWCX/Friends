import React from 'react';
import styled, { keyframes } from 'styled-components';

const fade = keyframes`
	from {
		transform: scale(1.0, 1.0);
	}
	to {
		transform: scale(1.25, 1.25);
	}
`;
const StyledSocialButton = styled.div`
	width: 40px;
	height: 40px;
	background-color: white;
	border-radius: 20px;
	padding: 5px;
	border-bottom: 1px solid rgba(0,0,0,0.2);
	box-shadow: 0 6px 12px -3px rgba(0,0,0,0.3);
	margin: 10px;
	transition: all .2s ease-in-out;
	cursor: pointer;
	&:hover {
		transform: scale(1.25);
	}
`;

export const GoogleButton = props => {
	return (
		<StyledSocialButton {...props}>
			<svg viewBox="0 0 512 512">
				<path fill="#FBBB00" d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
					c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
					C103.821,274.792,107.225,292.797,113.47,309.408z"/>
				<path fill="#518EF8" d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
					c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
					c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"/>
				<path fill="#28B446" d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
					c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
					c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"/>
				<path fill="#F14336" d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
					c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
					C318.115,0,375.068,22.126,419.404,58.936z"/>
			</svg>
		</StyledSocialButton>
	)
}
export const FacebookButton = props => {
	return (
		<StyledSocialButton {...props}>
			<svg viewBox="0 0 167.657 167.657">
				<g><path fill="#2d5ba3" d="M83.829,0.349C37.532,0.349,0,37.881,0,84.178c0,41.523,30.222,75.911,69.848,82.57v-65.081H49.626
						v-23.42h20.222V60.978c0-20.037,12.238-30.956,30.115-30.956c8.562,0,15.92,0.638,18.056,0.919v20.944l-12.399,0.006
						c-9.72,0-11.594,4.618-11.594,11.397v14.947h23.193l-3.025,23.42H94.026v65.653c41.476-5.048,73.631-40.312,73.631-83.154
						C167.657,37.881,130.125,0.349,83.829,0.349z"/></g>
			</svg>
		</StyledSocialButton>
	)
}
export const NaverButton = props => {
	return (
		<StyledSocialButton {...props}>
			<svg viewBox="0 0 512 512">
				<g><circle fill="#54d14b" cx="255.999" cy="256" r="246.455"/></g>
				<g><path fill="#FFFFFF" d="M124.152,139.41h91.746c0,0,83.332,125.871,85.793,129.246c2.52,3.41,2.812,0,2.812,0
						c-3.844-19.477-8.016-28.219-8.016-59.379V139.41h91.359v233.18h-91.359c0,0-81.621-119.156-84.082-122.449
						c-2.473-3.316-2.801,0-2.801,0c3.141,16.078,5.918,18.762,5.918,46.688v75.762h-91.371V139.41L124.152,139.41z"/></g>
			</svg>
		</StyledSocialButton>
	)
}