import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginCheck } from './modules/actions/changeLoginStatus';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListPage from './pages/ListPage';
import Login from './pages/LoginPage';
import StreamingPage from './pages/StreamingPage';
// import Loading from './components/Loading';
import GlobalStyles from './components/GlobalStyles';

function App() {
	const dispatch = useDispatch();
	const isLogin = useSelector((state) => state.changeLoginStatus.isLogin);
	const localStoragetokenCheck = localStorage.getItem('token');
	const storeState = useSelector((state) => state.changeDetaildata, []);

	useEffect(() => {
		if (localStoragetokenCheck) {
			dispatch(loginCheck());
		}
	}, []);

	return (
		<>
			<Router>
				<Switch>
					{isLogin ? (
						<Route path="/" exact component={ListPage}></Route>
					) : (
						<Route path="/" exact component={Login}></Route>
					)}
					<Route path={`/streaming/:id`} component={StreamingPage}></Route>
				</Switch>
			</Router>
			<GlobalStyles />
		</>
	);
}

export default App;
