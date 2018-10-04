import React, { Component } from 'react';
import Slick from 'react-slick';
import defaultUserImage from 'assets/user_default.png';
import defaultGroupImage from 'assets/group_default.png';

class Carousel extends Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.images !== nextProps.images)
			return true;
		return false;
	}
	render() {
		const { width, height, borderRadius, autoplay, isGroup } = this.props;
		const images = this.props.images && this.props.images.length ?  this.props.images : isGroup ? [String(defaultGroupImage)] : [String(defaultUserImage)];
		return (
			<div style={{
				width: width || "300px",
				height: height || "300px",
				borderRadius: borderRadius || "5px",
				overflow:"hidden",
				boxShadow: "0 3px 10px 0 rgba(80,80,80,0.3)"}}>
				<Slick
					dots
					infinite
					speed={500}
					slidesToShow={1}
					slidesToScroll={1}
					autoplay={autoplay}
					autoplaySpeed={5000}
					pauseOnFocus
					pauseOnDotsHover
					pauseOnHover>
					{ images.map((src, index) =>
						<div key={index}>
							<img
								src={src}
								alt="프사 로딩 실패!"
								className="slick-image"/>
							{/* <div className="slick-caption">hlwd</div> */}
						</div>
					) }
				</Slick>
			</div>
		)
	}
}
export default Carousel;
