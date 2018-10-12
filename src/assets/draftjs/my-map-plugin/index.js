import unionClassNames from 'union-class-names';
import React, { Component } from 'react';

export default class Image extends Component {
	state = {
		marker: null,
	}
	t_movePin = null;
	componentDidMount = () => {
		const d = window.daum.maps;
		//맵 생성
		const map = new d.Map(document.getElementById('map'), {
			center: new d.LatLng(37.480692, 127.132750),
			level: 5
		});
		// SET COPYTIGHT
		map.setCopyrightPosition(window.daum.maps.CopyrightPosition.BOTTOMRIGHT, true);
		// 지도,스카이뷰 전환 컨트롤 생성
		const mapTypeControl = new window.daum.maps.MapTypeControl();
		map.addControl(mapTypeControl, window.daum.maps.ControlPosition.TOPRIGHT);
		// 줌 컨트롤 생성
		const zoomControl = new window.daum.maps.ZoomControl();
		map.addControl(zoomControl, window.daum.maps.ControlPosition.RIGHT);
		//좌표 -> 주소 변환 객체
		const geocoder = new d.services.Geocoder();
		//마커들을 담을 배열
		const markers = [];
		// 커스텀 오버레이를 생성
		const mapCustomOverlay = new window.daum.maps.CustomOverlay({
			clickable: true,
			xAnchor: 0.5,
			yAnchor: 1.1
		});
		this.setState({d, map, geocoder, markers, mapCustomOverlay});
	}
	//인포윈도우 생성
	displayInfowindow = (marker, data) => {
		const content = `<div class="overlay_info">
			    <a href=${data.place_url} target="_blank"><strong>${data.place_name}</strong></a>
				<div class="desc">
					<span class="address">
						<span style="font-size: 0.5em; color: rgb(150,150,150)">
							${data.category_name}
						</span>
						</br>
						${data.road_address_name}
					</span>
			    </div>
			</div>`;

		// 커스텀 오버레이를 지도에 표시합니다
		this.state.mapCustomOverlay.setPosition(marker.getPosition());
		this.state.mapCustomOverlay.setContent(content);
		this.state.mapCustomOverlay.setMap(this.state.map);
		this.state.mapCustomOverlay.setVisible(true);
	}
	//마커 생성 후 지도 위에 표시
	addMarker = (position, idx) => {
		let imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url
			imageSize = new this.state.d.Size(36,37),
			imgOpation = {
				spriteSize : new this.state.d.Size(36, 691), // 스프라이트 이미지의 크기
				spriteOrigin : new this.state.d.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
				offset: new this.state.d.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
			},
			markerImage = new this.state.d.MarkerImage(imageSrc, imageSize, imgOpation),
			marker = new this.state.d.Marker({
				position: position,
				image: markerImage,
			});
			marker.setMap(this.state.map);
			this.state.markers.push(marker);

			return marker;
	}
	render() {
		const {
			block,
			className,
			theme = {},
			...otherProps } = this.props;
		// leveraging destructuring to omit certain properties from props
		const {
			blockProps, // eslint-disable-line no-unused-vars
			customStyleMap, // eslint-disable-line no-unused-vars
			customStyleFn, // eslint-disable-line no-unused-vars
			decorator, // eslint-disable-line no-unused-vars
			forceSelection, // eslint-disable-line no-unused-vars
			offsetKey, // eslint-disable-line no-unused-vars
			selection, // eslint-disable-line no-unused-vars
			tree, // eslint-disable-line no-unused-vars
			contentState,
			blockStyleFn,
			...elementProps } = otherProps;
		const combinedClassName = unionClassNames(theme.image, className);
		const { src } = contentState.getEntity(block.getEntityAt(0)).getData();
		return (
			// <img
			// {...elementProps}
			// src={src}
			// role="presentation"
			// className={combinedClassName}
			// />
			<div className="map_wrap">
				<div id="map"
					style={{
						width: "1200px",
						height: "800px",
						margin: "0 15px",
						borderRadius: "10px",
						boxShadow: "0 1px 10px -1px rgba(120,120,120,0.5)",
						position: "relative",
						overflow: "hidden"
					}}>
				</div>
			</div>
		);
	}
}