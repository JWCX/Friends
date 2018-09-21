/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Select from 'react-select';
import NoSsr from '@material-ui/core/NoSsr';
import { TextField, Paper, MenuItem, Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';
import { InterestChip } from 'components/Chips';

const styles = theme => ({
  root: {
    flexGrow: 1,
	width: "260px",
  },
  input: {
    display: 'flex',
	padding: "5px 0",
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
	flex: 1,
	alignItems: 'center',
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
	right: 0,
	width: "260px",
	transition: "all 0.2s ease-in-out",
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}
function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}
function Control(props) {
  return (
    <TextField
	  fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}
function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
	  component="div"
	  disabled={props.selectProps.value.length>=5}
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}
function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}
function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}
function MultiValue(props) {
  return (
    <InterestChip
      tabIndex={-1}
      label={props.children}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon style={{width:"15px", height:"15px", margin:"0 0 3px -15px"}} {...props.removeProps} />}
    />
  );
}
function Menu(props) {
  return (
    <Paper style={{background: props.selectProps.value.length>=5 && "rgb(240,240,240)"}} square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  ValueContainer,
};
class SelectInterest2 extends React.Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.interests !== nextProps.interests ||
			this.props.disabled !== nextProps.disabled)
			return true;
		return false;
	}
	render() {
		const { classes, dataInterest, handleInterestChange, interests, disabled } = this.props;
		return (
			<div className={classes.root}>
				<NoSsr>
					<Select
					classes={classes}
					textFieldProps={{
						label: '관심사 *',
						InputLabelProps: {
						shrink: true,
						style:{marginLeft:"3px"}
						},
					}}
					options={_.map(dataInterest, interest => ({label:interest.name, value:interest.code}))}
					value={interests}
					components={components}
					onChange={handleInterestChange}
					placeholder=""
					isMulti
					isDisabled={disabled}
					closeMenuOnSelect={false}
					captureMenuScroll={true}
					maxMenuHeight={300}
					menuPlacement="auto"
					/>
				</NoSsr>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	dataInterest: state.dataInterest
})
const mapDispatchToProps = {
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SelectInterest2));
