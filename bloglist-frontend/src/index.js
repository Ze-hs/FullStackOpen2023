import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Router>
		<Provider store={store}>
			<Container>
				<App />
			</Container>
		</Provider>
	</Router>
);
