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

// setDetailAction={dispatch(setDetailAction(...arg))}

// import React from 'react';
// import MovieList from '../components/MovieList';
// import { useSelector, useDispatch } from 'react-redux';
// import { modalFalse, modalTrue } from '../modules/actions/index';

// const MovieListContainer = () => {
// 	const status = useSelector((state) => state.changeModalStatus, []);
// 	const dispatch = useDispatch();
// 	// const [changeToTrue, changeToFalse] = useActions([modalFalse, modalTrue], []);
// 	// const [modalStatus, setStatus] = useState({ modalstatus: false });
// 	return (
// 		<>
// 			<MovieList
// 				// changeFalse={() => dispatch({ type: MODALFALSE })}
// 				// changeTrue={() => dispatch({ type: MODALTRUE })}
// 				status={status}
// 			/>
// 		</>
// 	);
// };

// export default MovieListContainer;
