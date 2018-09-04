import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

import { Landing, Main } from 'pages';
import store from './store';

injectGlobal`
	@import url('//cdn.rawgit.com/young-ha/webfont-archive/master/css/Godo.css');
	* {
	font-family: 'Godo', sans-serif;
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
		main: '#b3bae6',
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
  render() {
	return (
		<Provider store={store}>
			<MuiThemeProvider theme={theme}>
				<BrowserRouter>
					<Fragment>
						<CssBaseline/>
						<Switch>
							<Route exact path="/welcome" component={Landing}/>
							<Route path="/" render={() =>
								store.getState().token ?
								( <Main /> ) : ( <Redirect to="/welcome"/> ) }/>
						</Switch>
					</Fragment>
				</BrowserRouter>
			</MuiThemeProvider>
		</Provider>
	)
  }
}

export default App;
