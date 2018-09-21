/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Select from 'react-select';
import NoSsr from '@material-ui/core/NoSsr';
import { TextField, Paper, MenuItem, Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';
import { UserTiny } from 'containers';

const styles = theme => ({
  root: {
    flexGrow: 1,
	width: "270px",
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
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
	right: 0,
	width: "270px",
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
      <span>친구가 없습니다...<br/>친구를 먼저 추가해보세요!</span>
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
      style={{
		fontWeight: props.isSelected ? 500 : 400,
		height: "10px",
		fontSize: "0.9em",
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}
function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}
function SingleValue(props) {
	return (
		<UserTiny
			nickName={props.data.nickName}
			image={props.data.image}
		/>
  );
}
function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  SingleValue,
  NoOptionsMessage,
  Option,
  ValueContainer,
};
class SelectInterest2 extends React.Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.myFriends !== nextProps.myFriends ||
			this.props.disabled !== nextProps.disabled ||
			this.props.selectedFriend !== nextProps.selectedFriend ||
			this.props.disabled !== nextProps.disabled	)
			return true;
		return false;
	}
	render() {
		const { classes,
				disabled,
				selectedFriend,
				handleSelectContact,
				myFriends,
				contacts } = this.props;

		return (
			<div className={classes.root}>
				<NoSsr>
					<Select
					classes={classes}
					options={
						_.reject(myFriends, friend =>
							contacts[friend.id]
						).map(friend =>
							({
								id:friend.id,
								nickName:friend.nickName,
								image: friend.image,
								label:friend.nickName,
								value: friend.image
							})
						)
					}
					value={selectedFriend}
					components={components}
					onChange={handleSelectContact}
					isDisabled={disabled}
					closeMenuOnSelect={true}
					captureMenuScroll={false}
					maxMenuHeight={200}
					menuPlacement="auto"
					/>
				</NoSsr>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	myFriends: state.myFriends,
	contacts: state.contacts
})
const mapDispatchToProps = {
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SelectInterest2));
