import React from 'react';
import 'rc-slider/assets/index.css';
import Nouislider from "react-nouislider";
import '../assets/scss/material-kit-react.css';
import wNumb from 'wnumb';

export default ({ minAge, maxAge, label, margin, handleSlider }) => {
	return (
		<React.Fragment>
			<div style={{marginTop:"-3px", fontSize: "0.8em", color:"rgb(140,140,140)"}}>{label}</div>
			<div style={{padding:"0px 8px 15px 8px"}}>
				<div style={{width:"180px", height:"30px", position: "relative", top:"10px", margin:0}} className="slider slider-info">
					<Nouislider
						onChange={handleSlider}
						start={[minAge, maxAge]}
						connect={[false, true, false]}
						step={1}
						tooltips={[wNumb({ decimals: 0}),wNumb({ decimals: 0})]}
						range={{ min: 0, max: 100 }}
						/>
				</div>
			</div>
		</React.Fragment>
	)
}



