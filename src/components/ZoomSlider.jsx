import React from 'react';
import 'rc-slider/assets/index.css';
import Nouislider from "react-nouislider";
import '../assets/scss/material-kit-react.css';
import wNumb from 'wnumb';

export default ({ zoomLevel, label, margin, handleSlider }) => {
	return (
		<React.Fragment>
			<div style={{marginTop:"-3px", fontSize: "0.8em", color:"rgb(140,140,140)"}}>{label}</div>
				<div style={{left:"50%", transform: "translateX(-50%)", width:"400px", height:"30px", position: "relative", padding:"25px 0 35px 0", margin:0}} className="slider slider-info">
					<Nouislider
						onSlide={handleSlider}
						start={[zoomLevel]}
						connect={[true, false]}
						step={0.01}
						// tooltips
						tooltips={[wNumb({ decimals: 2, suffix: "x" })]}
						range={{ min: 1, max: 3 }}
						/>
				</div>
		</React.Fragment>
	)
}



