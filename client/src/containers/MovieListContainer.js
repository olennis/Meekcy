import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import FavoriteList from '../components/FavoriteList';
import EndTimeList from '../components/EndTimeList';
import { useSelector, useDispatch } from 'react-redux';
import { SETDETAIL } from '../modules/actions/changeDetaildata';
import { CHANGETRUE, CHANGEFALSE } from '../modules/actions/changeModalStatus';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
	padding-bottom: 20px;

	@media (max-width: 667px) {
		text-align: center;
		padding-left: 20px;
		padding-bottom: 20px;
	}
`;

const MovieListContainer = () => {
	const storeState = useSelector((state) => state.changeDetaildata, []);
	const dispatch = useDispatch();

	const [Endmovie, setEndmovie] = useState(null);
	useEffect(() => {
		axios
			.get('http://ec2-15-164-214-96.ap-northeast-2.compute.amazonaws.com:4000/videos/watched', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then((res) => setEndmovie(res.data))
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			<Container />
			{Endmovie ? (
				<EndTimeList
					Endmovie={Endmovie}
					storeState={storeState}
					setDetailAction={(e) => dispatch({ type: SETDETAIL, data: e })}
					changeModalTrue={() => dispatch({ type: CHANGETRUE })}
					changeModalFalse={() => dispatch({ type: CHANGEFALSE })}
				/>
			) : (
				<></>
			)}
			<FavoriteList
				storeState={storeState}
				setDetailAction={(e) => dispatch({ type: SETDETAIL, data: e })}
				changeModalTrue={() => dispatch({ type: CHANGETRUE })}
				changeModalFalse={() => dispatch({ type: CHANGEFALSE })}
			/>
			<MovieList
				storeState={storeState}
				setDetailAction={(e) => dispatch({ type: SETDETAIL, data: e })}
				changeModalTrue={() => dispatch({ type: CHANGETRUE })}
				changeModalFalse={() => dispatch({ type: CHANGEFALSE })}
			/>
		</>
	);
};
export default MovieListContainer;
