import React from 'react';
import 'rc-slider/assets/index.css';
import Nouislider from "react-nouislider";
import '../assets/scss/material-kit-react.css';
import wNumb from 'wnumb';

export default ({ value, label, margin, handleSlider }) => {
	return (
		<React.Fragment>
			<div style={{marginTop:"-3px", fontSize: "0.8em", color:"rgb(140,140,140)"}}>{label}</div>
			<div style={{padding:"20px 8px 0px 8px"}}>
				<div style={{width:"180px", height:"30px", position: "relative", top:"10px", margin:0}} className="slider slider-info">
					<Nouislider
						onChange={handleSlider}
						start={[value]}
						connect={[true, true]}
						step={50}
						tooltips={[wNumb({ decimals: 0})]}
						range={{ min: 50, max: 300 }}
						/>
				</div>
			</div>
		</React.Fragment>
	)
}



