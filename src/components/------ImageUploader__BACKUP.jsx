import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Dialog as MuiDialog,
		Grid,
		Fade,
	 } from '@material-ui/core';
import Dropzone from 'react-dropzone'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import ImageCompressor from 'image-compressor.js';
import { Button } from 'components';


const styles = {
	paper: {
		padding: "30px 20px 30px 20px",
		width: "600px",
		height: "450px",
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
			proccess: false,
			editing: false,	// 현재 편집중인지 여부
			rejected: [],	// 이미지 포맷이 아닌 파일을 올렸을 때 파일 데이터를 이곳에 저장(file object)
			src: null,		// 현재 편집중인 이미지 데이터(base64)
			file: null,		// 현재 편집중인 이미지(file object)
			crop: {			// 크롭 사이즈
				x: 15,
				y: 15,
				width: 70,
				// height: 70,
				aspect: 1/1,
			}
		}
	}
		/**
	 * @param {File} image - Image File Object
	 * @param {Object} pixelCrop - pixelCrop Object provided by react-image-crop
	 * @param {String} fileName - Name of the returned file in Promise
	 */
	getCroppedImg = (imageSrc, pixelCrop, fileName) => {
		const image = document.createElement('img');
		image.src=imageSrc;

		const canvas = document.createElement('canvas');
		console.log("canvas ,", canvas);
		canvas.width = pixelCrop.width;
		canvas.height = pixelCrop.height;
		console.log("canvas ,", canvas);
		console.log("crop", pixelCrop);
		const ctx = canvas.getContext('2d');
		console.log("ctx ,", ctx);

		ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
		console.log("CCCCCC", image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);
		// ctx.drawImage(image, pixelCrop.x, pixelCrop.y, `${pixelCrop.width}%`, `${pixelCrop.height}%`);

		// As Base64 string
		// const base64Image = canvas.toDataURL('image/jpeg');

		// As a blob
		return new Promise((resolve, reject) => {
		canvas.toBlob(file => {
			file.name = fileName;
			resolve(file);
		}, 'image/jpeg');
		});
	}
	handleClick = () => {
		this.setState({showImage: false, process: true});
		this.getCroppedImg(this.state.src, this.state.crop)
			.then( blob => {
				const reader = new FileReader()
				reader.readAsDataURL(blob)
					reader.addEventListener('load', () => {
						this.props.handleAddImage({file: blob, src: reader.result, crop: this.state.crop});
						this.props.closeImageUploader();
					}, false)
				// this.props.handleAddImage({file: blob, src: blob, crop: this.state.crop});
			});
	}
	onCropChange = crop => {
		this.setState({ crop });
	}
	dropAccepted = files => {
		if (files && files.length > 0) {
			new ImageCompressor(files[0], {
				maxWidth: 1000,
				maxHeight: 1000,
				success: (compressedFile) => {
					const reader = new FileReader()
					reader.addEventListener('load', () =>
						this.setState({ src: reader.result, file: compressedFile, editing: true, showImage: true }), false)
					reader.readAsDataURL(compressedFile)
				}
			});
		}
	}
	dropRejected = rejected => {
		this.setState({ rejected });
	}
	render() {
		console.log("state..", this.state);
		const { classes, open, closeImageUploader } = this.props;
		 const { showImage, editing, process,
			src, crop, rejected } = this.state;
		return (
			<MuiDialog
				classes={{paper: classes.paper, paperWidthXs: classes.paperWidthXs}}
				disableBackdropClick
				aria-labelledby="simple-dialog-title"
				open={open}>
					<Grid style={{height:"100%"}} container direction="column" justify="space-between" alignItems="center" spacing={0}>
						<Grid item>
								<div className="dropzone">
									<Dropzone
										style={{cursor:"pointer", width:"500px", height:"330px"}}
										rejectStyle={{cursor:"no-drop"}}
										accept="image/jpeg, image/png"
										disableClick={editing}
										onDropAccepted={this.dropAccepted}
										onDropRejected={this.dropRejected}
									>
									{
										editing && <Fade in={showImage}>
											<ReactCrop
												src={src}
												crop={crop}
												style={{left: "50%", top:"50%", transform: "translate(-50%, -50%)", borderRadius:"10px", boxShadow: "0 3px 15px -1px rgb(180,180,180)"}}
												onChange={this.onCropChange}/>
										</Fade>
									}
									{
										!editing && <span style={{color: rejected && rejected.length && "red", transition: "all 0.2s ease-in-out",
																width:"80%", top: "50%", left:"50%", position:"absolute",
																transform: "translate(-50%,-50%)", textAlign: "center"}}>
											{ rejected && rejected.length ? `${rejected[0].name}은 이미지 파일이 아닙니다.` : "이미지를 업로드하세요." }
										</span>
									}
									</Dropzone>
								</div>

						</Grid>
						<Grid item>
							<Button
								process={process}
								disabled={!editing || process}
								onClick={this.handleClick}
								margin="0 5px">
								등록
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