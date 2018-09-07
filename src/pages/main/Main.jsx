import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { AppBar } from 'components'; // FIXME: pages MUST IMPORT containers ONLY!! THIS IS FOR TESTING

class Main extends Component {
	render() {
		return (
			<div className="Main">
				<Link to="/login"><button>login</button></Link>
				<AppBar></AppBar>
				<AppBar></AppBar>
				{[1,2,3,4,5,6,7,8,9,10,
				11,12,13,14,15,16,17,18,19,20,
				21,22,23,24,25,26,27,28,29,30].map(x => <h1 key={x}>hello world{x}</h1>)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	dataSi: state.dataSi,
	dataGu: state.dataGu,
	dataInterest: state.dataInterest,
	token: state.token,
})
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
