import React from 'react';
import { Input,
	InputLabel,
	InputAdornment,
	FormControl,
	FormHelperText,
	Fade,
	CircularProgress,
	Collapse } from '@material-ui/core';
import MtSvgLines from 'react-mt-svg-lines';
import styled from 'styled-components';

const MyInput = styled(Input)`
	width: 300px;
	padding-left: 5px;
`;
const MyInputLabel = styled(InputLabel)`
	margin-left: 3px;
`;
const StatusContainer = styled.div`
	height: 29px;
	width: 29px;
`;

const TextField = (props) => {
	return (
		<FormControl error={props.error} aria-describedby={`${props.id}-text`} margin="dense">
			<MyInputLabel htmlFor={props.id}>
				{props.label}
			</MyInputLabel>
			<MyInput
			id={props.id}
			placeholder={props.placeholder}
			value={props.value}
			onChange={props.onChange}
			autoComplete={props.autoComplete}
			type={props.type}
			margin={props.margin}
			endAdornment={
				<InputAdornment position="end">
					<StatusContainer>
						<Fade in={props.ok}>
							{/* 체크(v) SVG Animation */}
							<MtSvgLines animate={props.ok} duration={1000}>
								<svg viewBox="0 0 100 100">
									<path stroke="#00e600" strokeWidth="7" fill="none" d="M20.8,51c0,0,20.8,18.2,21.5,18.2c0.6,0,33.3-38.5,33.3-38.5" />
								</svg>
							</MtSvgLines>
						</Fade>
						<Fade in={props.process}>
							{/* Spinning Process Animation */}
							<CircularProgress style={{ position: "absolute", right:"7px", top:"5px", color:"#667cff" }} size={17} thickness={6} />
						</Fade>
					</StatusContainer>
				</InputAdornment>}
			/>
			<Collapse in={props.error} timeout={{enter: 300, exit: 600}}>
				<Fade in={props.error}>
					<FormHelperText id={`${props.id}-text`} /* hidden={!props.error} */>
						{props.errorMessage}
					</FormHelperText>
				</Fade>
			</Collapse>
		</FormControl>
	)
}

export default TextField;