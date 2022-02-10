import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateUpload from './views/CreateUpload';
import LandingPage from './views/LandingPage';
import Purchase from './views/Purchase';
import './assets/css/blk-design-system-react.css';
// import "assets/css/blk-design-system-react.min.css";
// import "assets/css/blk-design-system-react.css.map";
import './assets/css/nucleo-icons.css';
// import "./assets/scss/blk-design-system-react.scss?v=1.2.0";
ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path='' element={<LandingPage />} />
			<Route path='create_upload' element={<CreateUpload />} />
			<Route path='purchase' element={<Purchase />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById('root')
);
