import React, { Component } from 'react';
import { Fade,
	Paper,
	Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import 'assets/map.css';

import { CancelButton,
	SearchButton,
	TextField } from 'components';

const styles = {
	root : {
		zIndex: "1100",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		margin: "auto",
		width: "950px",
		height: "660px",
		borderRadius: "10px",
		padding: "10px 10px",
		transition: "all 0.2s ease-in-out"
	},
}

export class MyMap extends Component {
	state = {
		keyword: "",
		keywordError: false,
	}
	t_keyword = null;
	componentDidMount = () => {
		const d = window.daum.maps;

		//맵 생성
		const map = new d.Map(document.getElementById('map'), {
			center: new d.LatLng(37.480692, 127.132750),
			level: 3
		});

		// 지도,스카이뷰 전환 컨트롤 생성
		const mapTypeControl = new window.daum.maps.MapTypeControl();
		map.addControl(mapTypeControl, window.daum.maps.ControlPosition.TOPRIGHT);

		// 줌 컨트롤 생성
		const zoomControl = new window.daum.maps.ZoomControl();
		map.addControl(zoomControl, window.daum.maps.ControlPosition.RIGHT);

		//좌표 -> 주소 변환 객체
		const geocoder = new d.services.Geocoder();

		//장소 검색 객체
		const ps = new d.services.Places();

		//마커들을 담을 배열
		const markers = [];

		//인포 윈도우 생성
		const infowindow =  new d.InfoWindow({
			zindex: 10,
			borderRadius: "10px",
			boxShadow: "0 1px 10px -1px rgba(120,120,120,0.5)"
		});





		var content = '<div class="overlay_info">';
		content += '    <a href="http://place.map.daum.net/17600274" target="_blank"><strong>월정리 해수욕장</strong></a>';
		content += '    <div class="desc">';
		content += '        <img src="http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/place_thumb.png" alt="">';
		content += '        <span class="address">제주특별자치도 제주시 구좌읍 월정리 33-3</span>';
		content += '    </div>';
		content += '</div>';

		// 커스텀 오버레이가 표시될 위치입니다
		var position = new window.daum.maps.LatLng(37.480692, 127.132750);

		// 커스텀 오버레이를 생성합니다
		var mapCustomOverlay = new window.daum.maps.CustomOverlay({
			position: position,
			content: content,
			xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
			yAnchor: 1.1 // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
		});

		// 커스텀 오버레이를 지도에 표시합니다
		mapCustomOverlay.setMap(map);






		this.setState({d, map, geocoder, ps, markers, infowindow});
	}
	initMap = () => {
		//좌표로 상세 주소 정보 요청
		let searchDetailAddrFromCoords = (coords, callback) => {
			this.state.geocoder.coord2coord2Address(coords.getLng(), coords.getLat(), callback);
		}
		//좌표로 주소 정보 요청
		this.state.d.event.addListener(this.state.map, 'idle', () => {
			this.state.geocoder.coord2RegionCode(this.state.map.getCenter().getLng(), this.state.map.getCenter().getLat(), this.displayCenterInfo)
		})
		//검색을 하지 않고 맵을 클릭했을 때
		this.state.d.event.addListener(this.state.map, 'click', () => {
			if(!document.querySelector('.info')){
				alert('검색해주세요');
			}
		})

		/* let zoomControl = new this.state.d.ZoomControl(); //줌 컨트롤러 생성
		this.state.map.addControl(zoomControl, this.state.d.ControlPosition.TOPRIGHT); //줌 컨트롤러 삽입 */


		let mapComplete = () => { //설정 완료
			this.state.map.setDraggable(false);
			this.state.map.setZoomable(false);
		};
		let mapSet = () => { //수정
			this.state.map.setDraggable(true);
			this.state.map.setZoomable(true);
		};

		setTimeout(() => {
			this.searchPlaces();
		}, 1000);
	}
	displayCenterInfo = (result, status) => {
			if(status === this.state.d.services.Status.OK){
				let infoDiv = document.getElementById('centerAddr');
				for(let i = 0; i < result.length; i++){
					if(result[i].region_type ==='H'){
						infoDiv.innerHTML = result[i].address_name;
						break;
					}
				}
			}
	}
	//인포윈도우 생성
	displayInfowindow = (marker, data) => {
		let content;
		const { infowindow } = this.state;
		if(document.getElementById('menu_wrap')){
			// content = '<div style="text-align: center"><button id="select">선택</button><div style="padding:5px;z-index:1; width: 150px">' + data.place_name + '</div></div>';
			content = '<div style="border-radius: 10px; box-shadow: 0 1px 10px -1px rgba(120,120,120,0.5)";><span style="padding:5px 10px;z-index:1;text-align: center;">' + data.place_name + '</span></div>';
		} else{
			content = '<div style="text-align: center"><div style="padding:5px;z-index:1; width: 150px">' + data.place_name + '</div></div>';
		}
		infowindow.setContent(content);
		infowindow.open(this.state.map, marker);

		this.setState({infowindow});

		//인포 윈도우의 선택 버튼 클릭시
		// document.getElementById('select').addEventListener('click', () => {
		// 	const { markers } = this.state;
		// 	for(let i = 0; i < markers.length; i++){ //자신을 제외한 나머지 마커 지움
		// 		if(markers[i] != marker){
		// 		markers[i].setVisible(false);
		// 		}
		// 	}
		// 	this.setState(state => ({markers}))
		// 	console.log(data);
		// 	document.getElementById('menu_wrap').remove(); //메뉴 리스트 지움
		// 	document.getElementById('select').remove();
		// 	document.getElementById('text').value = data.place_name;
		// 	alert(data.place_name) //마커의 좌표
		// 	/* window.close(); */
		// });
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
	removeMarker = () => {
		let { markers } = this.state;
		for(let i = 0; i < markers.length; i++){
			markers[i].setMap(null);
		}
		markers = [];
		this.setState({markers});
	}
	//검색 결과를 요소로 반환
	getListItem = (index, places) => {
		let el = document.createElement('li'),
			itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
						'<div class="info">' +
						'<h5>' + places.place_name + '</h5>';
		if(places.road_address_name){
			itemStr += '<span>' + places.road_address_name + '</span>' +
						'<span class="jibun gray">' +  places.address_name  + '</span>';
		} else{
			itemStr += '<span>' +  places.address_name  + '</span>';
		}
		itemStr += '<span class="tel">' + places.phone  + '</span>' +
					'</div>';

		el.innerHTML = itemStr;
		el.className = 'item';

		return el;
	}
	//검색 결과 목록의 자식 요소를 제거
	removeAllChildNods = el => {
		while(el.hasChildNodes()){
			el.removeChild(el.lastChild);
		}
	}
	//검색 결과 목록과 마커를 표시
	displayPlaces = places => {
		let listEl = document.getElementById('placesList'),
			menuEl = document.getElementById('menu_wrap'),
			fragment = document.createDocumentFragment(),
			bounds = new this.state.d.LatLngBounds(),
			listStr = '';

		//검색 결과 목록에 추가된 항목들 제거
		this.removeAllChildNods(listEl);
		//지도에 표시되고 있는 마커들 제거
		this.removeMarker();

		for(let i = 0; i< places.length; i++){
			let placePosition = new this.state.d.LatLng(places[i].y, places[i].x),
				marker = this.addMarker(placePosition, i),
				itemEl = this.getListItem(i, places[i]); //검색 결과 항목 요소 생성

			bounds.extend(placePosition);

			//마커와 목록의 항목에 대한 이벤트 리스너
				//마커가 포커스를 얻었을 때
				// this.state.d.event.addListener(marker, 'mouseover', () => {
				// 	this.displayInfowindow(marker, places[i]);
				// });
				//마커를 클릭했을 때
				this.state.d.event.addListener(marker, 'click', () => {
					this.state.map.setLevel(4);
					this.state.map.panTo(marker.getPosition());
					setTimeout(() => {
						this.displayInfowindow(marker, places[i]);
					}, 300);
				})
				//리스트 항목이 포커스를 얻었을 때
				itemEl.addEventListener('mouseover', () => {
					this.state.map.panTo(marker.getPosition());
				})
				//리스트(타이틀)을 클릭했을 때
				itemEl.onclick = () => {
					this.state.map.setLevel(4);
					this.displayInfowindow(marker, places[i]);
				}

			fragment.appendChild(itemEl);
		}

		listEl.appendChild(fragment);
		menuEl.scrollTop=0;

		this.state.map.setBounds(bounds);
	}
	//페이징
	displayPagination = (pagination) => {
		let paginationEl = document.getElementById('pagination'),
			fragment = document.createDocumentFragment();

		//기존에 추가된 페이지 번호 삭제
		while(paginationEl.hasChildNodes()){
			paginationEl.removeChild(paginationEl.lastChild);
		}

		for(let i = 1; i <= pagination.last; i++){
			let el = document.createElement('a');
			el.href = '#';
			el.innerHTML = i;

			if(i === pagination.current){
				el.className = 'on';
			} else{
				el.onclick = ((i) => {
					return () => {
						pagination.gotoPage(i);
					}
				})(i);
			}
			fragment.appendChild(el);
		}
		paginationEl.appendChild(fragment);
	}

	placesSearchCB = (data, status, pagination) => {
		if(status === this.state.d.services.Status.OK){ //검색 완료시 실행
			this.displayPlaces(data);
			this.displayPagination(pagination);
		} else if(status === this.state.d.services.Status.ZERO_RESULT){ //결과가 없으면 실행
			alert('검색 결과가 없습니다. 다시 검색해주세요.');
			return;
		} else if(status === this.state.d.services.Status.ERROR){ //에러 발생시 실행
			alert('오류가 발생하였습니다 다시 시도해주시기 바랍니다.');
			return;
		}
	}
	//키워드 검색 요청하는 함수
	searchPlaces = e => {
		e.preventDefault();
		let keyword = document.getElementById('keyword').value,
			searchOptions = {
			location: new window.daum.maps.LatLng(37.5662952, 126.97794509999994) //검색시 우선 순위 지역(해당 시의 시청을 중심으로)
		}
		if(!keyword.replace(/^\s+|\s+$/g, '')){ //아무것도 입력 안하면
			this.state.map.setCenter(new window.daum.maps.LatLng(37.5662952, 126.97794509999994)); //서울 시청(si.js에 리스트 있음))
			return false;
		}
		this.state.ps.keywordSearch(keyword, this.placesSearchCB, searchOptions);
	}
	handleChange = ({target}) => {
		clearTimeout(this.t_keyword);
		if(/[^0-9가-힣a-zA-Z\s]/.test(target.value)) {
			this.t_keyword = setTimeout(() => {
				return this.setState({keyword: target.value, keywordError: true});
			}, 300);
		}
		this.setState({keyword: target.value, keywordError: false});
	}
	render() {
		const { open, handleClose } = this.props;
		const { keyword, keywordError } = this.state;
		return (
			<Fade in={open} timeout={{enter: 300, exit: 300}}>
				<Paper elevation={10}
					classes={{root: this.props.classes.root}}>
					<Grid container
						direction="column"
						justify="space-between"
						alignItems="flex-end"
						spacing={8}>
						<Grid item
							style={{height:"30px"}}>
							<CancelButton onClick={handleClose}/>
						</Grid>
						<Grid item>
							<div className="map_wrap">
								<div id="map"
									style={{
										width: "900px",
										height: "600px",
										margin: "0 15px",
										borderRadius: "10px",
										boxShadow: "0 1px 10px -1px rgba(120,120,120,0.5)",
										position: "relative",
										overflow: "hidden"
									}}>
								</div>
								<div id="menu_wrap" className="bg_white hide-scroll">
									<div className='option'>
										<form onSubmit={this.searchPlaces}
											style={{paddingTop: "3px"}}>
											<TextField
												style={{verticalAlign:"top"}}
												id="keyword"
												value={keyword}
												type="text"
												onChange={this.handleChange}
												placeholder="검색어를 입력하세요"
												label="검색"
												error={keywordError}
												// errorMessage="잘못된 검색어 입니다"
												margin="dense"
												width="160px"
												autoComplete="off"
												shrink/>
											<SearchButton
												type="submit"
												disabled={keywordError}
												width="20px"
												height="45px">
												검색
											</SearchButton>
										</form>
									</div>
									<hr/>
									<ul id='placesList'></ul>
									<div id='pagination'></div>
								</div>
							</div>
							<div id='centerAddr'></div>
							<div id="clickLatlng"></div>
							<button onClick={this.initMap}>INIT MAP</button>
						</Grid>
					</Grid>
				</Paper>
			</Fade>
		)
	}
}

export default withStyles(styles)(MyMap);