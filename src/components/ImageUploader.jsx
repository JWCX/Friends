import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Dialog as MuiDialog,
		Grid,
		Fade,
		CircularProgress
	 } from '@material-ui/core';
import Dropzone from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'
import ImageCompressor from 'image-compressor.js';
import { Button, ZoomSlider } from 'components';
import { LargeImageIcon } from 'components/AppBarIcons';

const styles = {
	paper: {
		padding: "30px 20px 30px 20px",
		width: "550px",
		height: "610px",
		maxHeight: "100vh",
		borderRadius: "10px",
		margin: "0",
	},
	paperWidthXs: {
		width: "100%",
		background: "red",
	}
}

class ImageUploader extends Component {
    constructor() {
		super()
		this.state = {
			showImage: false,
			proccess: false,	// 등록중일시 true
			imageCompressingProcess: false,	// 이미지 선택시(while uploading&compressing) true
			editing: false,	// 현재 편집중인지 여부
			rejected: [],	// 이미지 포맷이 아닌 파일을 올렸을 때 파일 데이터를 이곳에 저장(file object)
			src: null,		// 현재 편집중인 이미지 데이터(base64)
			file: null,		// 현재 편집중인 이미지(file object)
			zoomLevel: 1.0,
		}
	}
	handleSubmit = () => {
		this.setState({process: true});
		if (this.editor) {
			this.editor.getImage().toBlob( blob =>{
				console.log("BLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL", blob);
				const reader = new FileReader();
				reader.readAsDataURL(blob);
				reader.addEventListener('load', () => {
					this.props.handleAddImage({src: reader.result});
					this.props.closeImageUploader();
				}, false)
			});
		}
	}
	handleSlider = (values, e) => {
		this.setState(state => ({zoomLevel: parseFloat(values[0])}));
	}
	dropAccepted = files => {
		if (files && files.length > 0) {
			this.setState({imageCompressingProcess: true});
			new ImageCompressor(files[0], {
				maxWidth: 2000,
				maxHeight: 2000,
				success: (compressedFile) => {
					const reader = new FileReader()
					reader.addEventListener('load', () =>
						this.setState({ src: reader.result, file: compressedFile, editing: true, showImage: true, imageCompressingProcess: false }), false)
					reader.readAsDataURL(compressedFile)
				}
			});
		}
	}
	dropRejected = rejected => {
		this.setState({ rejected });
	}

	setEditorRef = (editor) => this.editor = editor

	render() {
		console.log("state..", this.state);
		const { classes, open, closeImageUploader } = this.props;
		 const { showImage, editing, process, imageCompressingProcess,
			src, rejected, zoomLevel } = this.state;
		return (
			<MuiDialog
				classes={{paper: classes.paper, paperWidthXs: classes.paperWidthXs}}
				disableBackdropClick
				aria-labelledby="simple-dialog-title"
				open={open}>
					<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
					spacing={0}>
						<Grid item>
								<div className="dropzone">
									<Dropzone
										style={{cursor:"pointer", width:"450px", height:"450px", textAlign:"center"}}
										rejectStyle={{cursor:"no-drop"}}
										accept="image/jpeg, image/png"
										disableClick={editing}
										onDropAccepted={this.dropAccepted}
										onDropRejected={this.dropRejected}
									>
									{
										editing && <Fade in={showImage} timeout={{enter: 500, exit: 500}}>
											<AvatarEditor
												ref={this.setEditorRef}
												image={src}
												width={400}
												height={400}
												color={[240,240,240,0.8]}
												scale={zoomLevel}
												border={20}
												borderRadius={5}
												// style={{left: "50%", top:"50%", transform: "translate(-50%, -50%)", borderRadius:"10px", boxShadow: "0 3px 15px -1px rgb(180,180,180)"}}
												style={{borderRadius:"10px", boxShadow: "0 3px 15px -1px rgb(180,180,180)"}}/>
										</Fade>
									}
									{
										!editing && <span style={{color: rejected && rejected.length && "red", transition: "all 0.2s ease-in-out",
																width:"80%", top: "50%", left:"50%", position:"absolute",
																transform: "translate(-50%,-50%)", textAlign: "center"}}>
																<LargeImageIcon/>
											{
												rejected && rejected.length ?
													`${rejected[0].name}은 이미지 파일이 아닙니다.` :
													(
														imageCompressingProcess ?
															<CircularProgress
																style={{
																	left: "130px",
																	top: "-37px",
																	position: "absolute",
																	color:"rgba(100, 180, 255)"
																}}
																size={100}
																thickness={2} />
														: "이미지를 업로드하세요"
													)
											}
										</span>
									}
									</Dropzone>
								</div>
								{
									<Fade in={editing} timeout={{enter: 500, exit: 500}}>
										<div>
											<ZoomSlider
												zoomLevel={zoomLevel}
												handleSlider={this.handleSlider}/>
										</div>
									</Fade>
								}
						</Grid>
						<Grid item>
							<Button
								process={process}
								disabled={!editing || process}
								onClick={this.handleSubmit}
								margin="0 5px">
								확인
							</Button>
							<Button
								disabled={process}
								onClick={closeImageUploader}
								margin="0 5px">
								취소
							</Button>
						</Grid>
					</Grid>
			</MuiDialog>
		);
	}
}

export default withStyles(styles)(ImageUploader);