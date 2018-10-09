import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import _ from 'lodash';
import { ClickAwayListener,
	Grow,
	Paper,
	Popper,
	MenuItem,
	MenuList } from '@material-ui/core';

import { removeNotification } from 'actions';
import { CancelButton } from 'components';

class Notifications extends React.Component {
	handleClose = e => {
		if (this.props.anchorEl.contains(e.target)) return;  // 버튼을 클릭한 경우 toggle 메소드와 중복처리 되지 않도록 return
		this.props.handleNotificationSelect();
	}
	handleNotificationRemove = id => {
		Axios.post(`${process.env.REACT_APP_DEV_API_URL}/notification`, {
			notification: this.props.notifications[id].notification,
			receiveyn: true,
		}).then(resp => {
			console.log(resp);	// FIXME: 지워주세용
			this.props.removeNotification(this.props.notifications, this.props.notifications[id].notification);
		}).catch(err => {
			console.log(err.response);
		}); // FIXME: REMOVE LOG
	}
	render() {
		const { notifications,
			anchorEl, open, handleNotificationSelect } = this.props;
		return (
			<Popper open={open} anchorEl={anchorEl} transition disablePortal>
				{
					({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						id="menu-list-grow"
						style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
						<Paper>
							<ClickAwayListener onClickAway={this.handleClose}>
							<MenuList>
							{
								_.filter(notifications, notification => notification.gubun !== 0)
								.map(notification => {
									switch(notification.gubun) {
										case 1:
											return <MenuItem style={{padding: "5px 15px"}} id={notification.groupId} onClick={handleNotificationSelect}>[<span style={{color:"rgb(80,100,200)", cursor:"pointer"}}>{notification.nickName}</span>] 님의 그룹 가입신청을 확인하세요.</MenuItem>
										case 2:
											return <div style={{padding: "5px 15px", height: "34px"}}>
												[<span style={{color:"rgb(80,100,200)"}}>{notification.nickName}</span>] 님과 친구가 되었습니다.&nbsp;
												<CancelButton align
													onClick={() => {this.handleNotificationRemove(notification.notification)}}/>
											</div>
										case 3:
											return <div style={{padding: "5px 15px", height: "34px"}}>
												[<span style={{color:"rgb(80,100,200)"}}>{notification.groupName}</span>] 그룹에 가입되었습니다.&nbsp;
												<CancelButton align
													onClick={() => {this.handleNotificationRemove(notification.notification)}}/>
											</div>
										default:
									}
								})
							}
								{/* <MenuItem style={{fontSize: "0.8em", height: "15px"}} id="report" onClick={handleNotificationSelect}>신고하기</MenuItem> */}
							</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		);
	}
}

const mapStateToProps = state => ({
	notifications: state.notifications
})
const mapDispatchToProps = {
	removeNotification
}
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);