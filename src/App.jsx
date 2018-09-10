import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import moment from 'moment';

import { Landing, Main } from 'pages';
import store from './store';

injectGlobal`
	@import url('//cdn.rawgit.com/young-ha/webfont-archive/master/css/Godo.css');
	* {
		font-family: 'Godo', sans-serif;
		-ms-overflow-style: none;
	}
	.hide-scroll {
		-ms-overflow-style: none;
	}
	.hide-scroll::-webkit-scrollbar {
		width: 0 !important
	}
	`;

const theme = createMuiTheme({
	// overrides: {
	// },
	typography: {
		fontFamily: '"Godo"',
		fontWeightMedium: 400,
	},
	palette: {
	  primary: {
		main: '#03a9f4',
	  },
	  secondary: {
		main: '#8c98d9',
	  },
	  error: {
		main: '#ff8080',
	  }
	},
  });

class App extends Component {
  componentDidMount() {
	moment.updateLocale('en', {
		months : [
			"1월", "2월", "3월", "4월", "5월", "6월", "7월",
			"8월", "9월", "10월", "11월", "12월"
		],
		monthsShort : [
			"1월", "2월", "3월", "4월", "5월", "6월", "7월",
			"8월", "9월", "10월", "11월", "12월"
		],
		weekdays : [
			"일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"
		],
		weekdaysShort : [
			"일", "월", "화", "수", "목", "금", "토"
		],
		weekdaysMin : [
			"일", "월", "화", "수", "목", "금", "토"
		],
		longDateFormat : {
			LT : 'HH:mm',
			LTS : 'HH:mm:ss',
			L : 'YYYY. M. D.',
			LL : 'YYYY MMMM D',
			LLL : 'YYYY MMMM D HH:mm',
			LLLL : 'YYYY MMMM D dddd HH:mm'
		},
	});
  }
  render() {
	return (
		<Provider store={store}>
			<MuiThemeProvider theme={theme}>
				<BrowserRouter>
					<Fragment>
						<CssBaseline/>
						<Switch>
							<Route exact path="/login" component={Landing}/>
							<Route exact path="/join" component={Landing}/>
							<Route exact path="/amnesia" component={Landing}/>
							<Route exact path="/info" component={Landing}/>
							<Route path="/" component={Main}/>
							{/* <Route path="/" render={() =>
								store.getState().token ?
								( <Main /> ) : ( <Redirect to="/login"/> ) }/> */}
						</Switch>
					</Fragment>
				</BrowserRouter>
			</MuiThemeProvider>
		</Provider>
	)
  }
}

export default App;
