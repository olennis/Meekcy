import React from 'react';
import MovieList from '../components/MovieList';
import FavoriteList from '../components/FavoriteList';
import { useSelector, useDispatch } from 'react-redux';
import { SETDETAIL } from '../modules/actions/changeDetaildata';
import { CHANGETRUE, CHANGEFALSE } from '../modules/actions/changeModalStatus';
const MovieListContainer = () => {
	const storeState = useSelector((state) => state.changeDetaildata, []);
	const dispatch = useDispatch();
	return (
		//props를 사용하지 않고도 리덕스 사용 가능. 아래 props들은 리덕스에 익숙하지 않을때 만든 props인듯. 삭제 예정
		<>
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
