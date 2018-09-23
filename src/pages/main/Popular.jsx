import React, { Component } from 'react';

export class Popular extends Component {
  render() {
	return (
		<div style={{
			position: "relative",
			height: "100%",
			width: "100%",
			background: "url('https://d3cbihxaqsuq0s.cloudfront.net/images/37060215_xl.jpg')",
			borderRadius: "10px",
			backgroundSize: "cover",
			backgroundPosition: "right",
			textAlign: "center",
			display: "table"
			}}>
			<div style={{
				verticalAlign: "middle",
				display:"table-cell",
				color: "white",
				fontSize: "10em",
				background: "rgba(0,0,0,0.4)",
				}}>
				공사중 ...
			</div>
		</div>
	)
  }
}

export default Popular;
