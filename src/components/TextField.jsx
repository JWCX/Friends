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

const TextField = ({ id, type, label, placeholder, value, onChange,
	autoComplete, disabled, margin, ok, process, error, errorMessage }) => {
	return (
		<FormControl error={error} aria-describedby={`${id}-text`} margin="dense">
			<MyInputLabel htmlFor={id}>
				{label}
			</MyInputLabel>
			<MyInput
			id={id}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			autoComplete={autoComplete}
			type={type}
			disabled={disabled}
			margin={margin}
			endAdornment={
				<InputAdornment position="end">
					<StatusContainer>
						{
							ok ?
							<Fade in={ok}>
								{/* 체크(v) SVG Animation */}
								<MtSvgLines animate={ok} duration={1000}>
									<svg viewBox="0 0 100 100">
										<path stroke="#00e600" strokeWidth="7" fill="none" d="M20.8,51c0,0,20.8,18.2,21.5,18.2c0.6,0,33.3-38.5,33.3-38.5" />
									</svg>
								</MtSvgLines>
							</Fade> : ""
						}
						{
							process ?
							<Fade in={process}>
								{/* Spinning Process Animation */}
								<CircularProgress style={{ position: "absolute", right:"7px", top:"5px", color:"#667cff" }} size={17} thickness={6} />
							</Fade> : ""
						}
					</StatusContainer>
				</InputAdornment>}
			/>
			<Collapse in={error} timeout={{enter: 300, exit: 600}}>
				<Fade in={error}>
					<FormHelperText id={`${id}-text`}>
						{errorMessage}
					</FormHelperText>
				</Fade>
			</Collapse>
		</FormControl>
	)
}

export default TextField;