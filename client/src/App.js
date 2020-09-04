import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginCheck } from './modules/actions/changeLoginStatus';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListPage from './pages/ListPage';
import Login from './pages/LoginPage';
// import Loading from './components/Loading';
import GlobalStyles from './components/GlobalStyles';

function App() {
	const dispatch = useDispatch();
	const isLogin = useSelector((state) => state.changeLoginStatus.isLogin);
	console.log('isLogin', isLogin);
	const localStoragetokenCheck = localStorage.getItem('token');

	useEffect(() => {
		if (localStoragetokenCheck) {
			// 로그인유지를 위해서 isLogin을 true로 변경해줘야한다.
			dispatch(loginCheck());
		}
	}, []);

	return (
		<>
			<Router>
				<Switch>
					{isLogin ? (
						<Route path="/" component={ListPage}></Route>
					) : (
						<Route path="/" exact component={Login}></Route>
					)}
					{/* <Route path="/" exact component={Login}></Route>
				<Route path="/list" component={ListPage}></Route> */}
					<Route path="/streaming/:id" component={ListPage}></Route>
				</Switch>
			</Router>
			<GlobalStyles />
		</>
	);
}

export default App;
