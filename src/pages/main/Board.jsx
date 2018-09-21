import React, { Component } from 'react';

export class Board extends Component {
  render() {
	return (
		<div style={{
			position: "relative",
			height: "100%",
			width: "100%",
			background: "url('https://farm4.staticflickr.com/3931/15532327436_991de2a31e_z.jpg')",
			borderRadius: "10px",
			backgroundSize: "cover",
			backgroundPosition: "right"
			}}>
		</div>
	)
  }
}

export default Board;
