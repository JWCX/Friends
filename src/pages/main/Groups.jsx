import React, { Component } from 'react';

import { Filter, Group } from 'containers';

export class Groups extends Component {
  render() {
	return (
	  <React.Fragment>
		  <Filter path="groups">그룹명</Filter>
		  <div style={{
				position: "relative",
				height: "760px",
				width: "950px",
				background: "url('https://images.unsplash.com/photo-1501768245077-ebcc4a1f83b1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjcwOTV9&s=fc2b11af56e8799b9a2a51896e15536e')",
				borderRadius: "10px",
				backgroundSize: "cover",
				backgroundPosition: "right"
				}}>
			</div>
	  </React.Fragment>
	)
  }
}

export default Groups;
