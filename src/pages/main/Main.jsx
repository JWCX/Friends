import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <header className="Main-header">
		  <Link to="/login"><button>login</button></Link>
        </header>
        <p className="Main-intro">
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
	dataSi : state.dataSi,
	dataGu : state.dataGu,
	dataInterest : state.dataInterest,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
