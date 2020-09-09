import React from 'react';
import MovieList from '../components/MovieList';
import FavoriteList from '../components/FavoriteList';
import { useSelector, useDispatch } from 'react-redux';
import { SETDETAIL } from '../modules/actions/changeDetaildata';
import { CHANGETRUE, CHANGEFALSE } from '../modules/actions/changeModalStatus';
import styled from 'styled-components';

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
	return (
		<Container>
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
		</Container>
	);
};
export default MovieListContainer;
