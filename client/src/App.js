import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginCheck } from './modules/actions/changeLoginStatus';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListPage from './pages/ListPage';
import Login from './pages/LoginPage';
import StreamingPage from './pages/StreamingPage';
// import Loading from './components/Loading';
import Warning from './components/Warning';
import GlobalStyles from './components/GlobalStyles';

function App() {
	const dispatch = useDispatch();
	const isLogin = useSelector((state) => state.changeLoginStatus.isLogin);
	const localStoragetokenCheck = localStorage.getItem('token');

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
					<Route path={`/rooms/:roomName`} component={StreamingPage}></Route>
					<Route path={`/warn`} component={Warning}></Route>
				</Switch>
			</Router>
			<GlobalStyles />
		</>
	);
}

export default App;
