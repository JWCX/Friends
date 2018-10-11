import React, { Component } from 'react';
import { Fade,
	Paper,
	Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import 'assets/map.css';

import { CancelButton,
	SearchButton,
	Button,
	TextField,
	Dialog } from 'components';

const styles = {
	root : {
		zIndex: "1100",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		margin: "auto",
		width: "1250px",
		height: "860px",
		borderRadius: "10px",
		padding: "10px 10px",
		transition: "all 0.2s ease-in-out"
	},
}

export class MapEditor extends Component {
	state = {
		keyword: "",
		marker: null,

		dialogOpen: false,
		dialogTitle: "",
		dialogContent: "",
		dialogIcon: null,
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

		//장소 검색 객체
		const ps = new d.services.Places();

		//마커들을 담을 배열
		const markers = [];

		// 커스텀 오버레이를 생성
		const mapCustomOverlay = new window.daum.maps.CustomOverlay({
			clickable: true,
			xAnchor: 0.5,
			yAnchor: 1.1
		});

		this.setState({d, map, geocoder, ps, markers, mapCustomOverlay});
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
			bounds = new this.state.d.LatLngBounds();

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
				//마커를 클릭했을 때
				this.state.d.event.addListener(marker, 'click', () => {
					this.state.map.setLevel(4);
					this.state.map.panTo(marker.getPosition());
					this.setState({marker: marker});
					setTimeout(() => {
						this.displayInfowindow(marker, places[i]);
					}, 300);
				})
				//리스트 항목이 포커스를 얻었을 때
				itemEl.addEventListener('mouseover', () => {
					clearTimeout(this.t_movePin);
					this.t_movePin = setTimeout(() => {
						this.state.map.panTo(marker.getPosition());
					}, 300);
					itemEl.setAttribute("style", "transition: all 0.3s ease-in-out; background: rgb(200,230,255);");
				})
				itemEl.addEventListener('mouseout', () => {
					clearTimeout(this.t_movePin);
					if(this.state.marker)
						this.t_movePin = setTimeout(() => {
							this.state.map.panTo(this.state.marker.getPosition());
						}, 100);
					itemEl.setAttribute("style", "transition: all 0.3s ease-in-out; background: none;");

				})
				//리스트(타이틀)을 클릭했을 때
				itemEl.onclick = () => {
					this.state.map.setLevel(4);
					this.setState({marker: marker});
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
						this.state.mapCustomOverlay.setVisible(false);
						this.setState({marker: null});
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
			this.setState({
				dialogOpen: true,
				dialogIcon: 2,
				dialogContent: '검색 결과가 없습니다. 다시 검색해주세요.'
			});
			return;
		} else if(status === this.state.d.services.Status.ERROR){ //에러 발생시 실행
			this.setState({
				dialogOpen: true,
				dialogIcon: 2,
				dialogContent: '오류가 발생하였습니다 다시 시도해주시기 바랍니다.'
			});
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
			this.setState({
				dialogOpen: true,
				dialogIcon: 2,
				dialogContent: '검색어를 입력해주세요.'
			});
			return false;
		}
		this.state.ps.keywordSearch(keyword, this.placesSearchCB, searchOptions);
		this.state.mapCustomOverlay.setVisible(false);
		this.setState({marker: null});
	}


	handleChange = ({target}) => {
		this.setState({keyword: target.value});
	}
	handleDialogClose = () => {
		this.setState({
			dialogOpen: false,
			dialogIcon: null,
			dialogTitle:"",
			dialogContent:""
		});
	}
	render() {
		const { open, handleClose } = this.props;
		const { keyword,
			dialogOpen, dialogTitle, dialogContent, dialogIcon } = this.state;
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
										width: "1200px",
										height: "800px",
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
												style={{verticalAlign:"middle"}}
												id="keyword"
												value={keyword}
												type="text"
												onChange={this.handleChange}
												placeholder="검색어를 입력하세요"
												label="검색"
												margin="dense"
												width="190px"
												autoComplete="off"
												shrink/>
											<SearchButton
												type="submit"
												width="75px"
												height="40px">
												검색
											</SearchButton>
										</form>
									</div>
									<hr/>
									<ul id='placesList'></ul>
									<div id='pagination'></div>
								</div>
							</div>
						</Grid>
					</Grid>
					<Dialog
						open={dialogOpen}
						onClose={this.handleDialogClose}
						title={dialogTitle}
						content={dialogContent}
						disableBackdrop={true}
						icon={dialogIcon}/>
					<Fade in={this.state.marker !== null} timeout={{enter: 300, exit: 300}}>
						<div style={{
								position: "absolute",
								right: "50px",
								bottom: "50px",
								zIndex: "1000"
							}}>
							<Button>
								선택하기
							</Button>
						</div>
					</Fade>
				</Paper>
			</Fade>
		)
	}
}

export default withStyles(styles)(MapEditor);