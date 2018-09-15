import React, { Component } from 'react';
import Slick from 'react-slick';
import defaultImage from 'assets/user_default.png';
import { DeleteButton, AddImageButton } from 'components';

class Carousel2 extends Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.images !== nextProps.images ||
			this.props.disabled !== nextProps.disabled)
			return true;
		return false;
	}
	render() {
		const { width, height, borderRadius, openImageUploader, handleDeleteImage, disabled } = this.props;
		const images = this.props.images && this.props.images.length ?  this.props.images : [String(defaultImage)];
		return (
			<div style={{
				transform: "scale(0.9)",
				width: width || "300px",
				height: height || "300px",
				borderRadius: borderRadius || "5px",
				overflow: "hidden",
				boxShadow: "0 3px 10px 0 rgba(80,80,80,0.3)"}}>
				<Slick
					dots
					infinite
					speed={500}
					slidesToShow={1}
					slidesToScroll={1}>
					{ images.map( (src, index) =>
						<div key={index}>
							<img
								src={typeof src === 'object' ? src.src : src}
								alt="프사 로딩 실패!"
								className="slick-image"/>

							<div className="slick-caption">
							{
								images.length < 8 && <AddImageButton
									onClick={openImageUploader}
									fill="rgba(255,255,255,0.8)"
									sfill="white"
									background="rgba(0,0,0,0.2)"
									className="slick-icons"
									disabled={disabled}/>
							}
								&nbsp;
								<DeleteButton
									onClick={()=>{handleDeleteImage(index)}}
									fill="rgba(255,255,255,0.8)"
									sfill="rgb(255,10,10)"
									background="rgba(0,0,0,0.2)"
									className="slick-icons"
									disabled={disabled}/>
							</div>
						</div>
					) }
				</Slick>
			</div>
		)
	}
}
export default Carousel2;
