import React, { Component } from 'react';
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
	width: ${props => props.width ? props.width : "300px" };
	padding-left: 5px;
`;
const MyInputLabel = styled(InputLabel)`
	margin-left: 3px;
`;
const StatusContainer = styled.div`
	height: 29px;
	width: 29px;
`;

class TextField extends Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.value !== nextProps.value ||
			this.props.ok !== nextProps.ok ||
			this.props.process !== nextProps.process ||
			this.props.error !== nextProps.error ||
			this.props.disabled !== nextProps.disabled)
			return true;
		else return false;
	}
	render() {
		const { id, type, label, placeholder, value, onChange, multiline, rows, rowsMax, style,
			autoComplete, disabled, shrink, margin, width, ok, process, error, errorMessage } = this.props;
		return (
			<FormControl error={error} aria-describedby={`${id}-text`} margin="none" style={style}>
				<MyInputLabel shrink={shrink} htmlFor={id}>
					{label}
				</MyInputLabel>
				<MyInput
					id={id}
					placeholder={placeholder}
					value={value || ""}
					onChange={onChange}
					autoComplete={autoComplete}
					type={type}
					disabled={disabled}
					multiline={multiline}
					rows={rows}
					rowsMax={rowsMax}
					margin={margin}
					width={width}
					endAdornment={
					ok || process ?
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
								</Fade> : null
							}
							{
								process ?
								<Fade in={process}>
									{/* Spinning Process Animation */}
									<CircularProgress style={{ position: "absolute", right:"7px", top:"5px", color:"#667cff" }} size={17} thickness={6} />
								</Fade> : null
							}
						</StatusContainer>
					</InputAdornment> : null
				}
				/>
				{
					errorMessage && <Collapse in={error} timeout={{enter: 200, exit: 200}}>
						<FormHelperText id={`${id}-text`}>
							{errorMessage}
						</FormHelperText>
					</Collapse>
				}
			</FormControl>
		)
	}
}

export default TextField;