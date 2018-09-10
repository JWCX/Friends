import React, { Component } from 'react';

import { Filter, Group } from 'containers';

export class Groups extends Component {
  render() {
	return (
	  <div>
		  <Filter>그룹명</Filter>
		  <Group></Group>
	  </div>
	)
  }
}

export default Groups;
