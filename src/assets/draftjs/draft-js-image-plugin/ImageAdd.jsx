import React, { Component } from 'react';
import styles from './styles.css';

import { AddButton, AddImageButton } from 'components';

export default class ImageAdd extends Component {
	// Start the popover closed
	state = {
		url: '',
		open: false,
	};

	// When the popover is open and users click anywhere on the page,
	// the popover should close
  	componentDidMount() {
		document.addEventListener('click', this.closePopover);
  	}

	componentWillUnmount() {
		document.removeEventListener('click', this.closePopover);
  	}

  	// Note: make sure whenever a click happens within the popover it is not closed
	onPopoverClick = () => {
		this.preventNextClose = true;
	}

	openPopover = () => {
		if (!this.state.open) {
			this.preventNextClose = true;
			this.setState({
			open: true,
			});
		}
	};

	closePopover = () => {
		if (!this.preventNextClose && this.state.open) {
			this.setState({
			open: false,
			});
		}
		this.preventNextClose = false;
	};

	addImage = e => {
		e.preventDefault();
		const { editorState, onChange } = this.props;
		onChange(this.props.modifier(editorState, this.state.url));
		this.closePopover();
	};

	changeUrl = e => {
		this.setState({ url: e.target.value });
	}

	render() {
		const popoverClassName = this.state.open ? styles.addImagePopover : styles.addImageClosedPopover;
		return (
			<div className={styles.addImage}>
			<AddImageButton
				selected={this.state.open}
				disabled={this.props.disabled}
				onClick={this.openPopover}
				onMouseUp={this.openPopover}/>
			<div
				className={popoverClassName}
				onClick={this.onPopoverClick}>
				<form onSubmit={this.addImage}>
					<input
						type="text"
						placeholder="이미지 주소를 입력하세요.."
						className={styles.addImageInput}
						onChange={this.changeUrl}
						value={this.state.url}/>
					<div style={{display:"inline-block"}}>
						<AddButton
							type="submit"
							fill="rgb(130,130,130)"
							sfill="rgb(90,110,255)"
							onClick={this.addImage}
							center/>
					</div>
				</form>
			</div>
			</div>
		);
	}
}