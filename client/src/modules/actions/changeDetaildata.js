//액션 타입
export const SETDETAIL = 'SETDETAIL';
//액션 객체 생성 함수
export const setDetailAction = (data) => ({ type: SETDETAIL, data: data });
//초기값
const initialState = {
	id: null,
	title: null,
	poster: null,
	description: null,
	video: null,
	runnigTime: null,
};
//리듀서 함수
const changeDetaildata = (movieData = initialState, action) => {
	switch (action.type) {
		case SETDETAIL:
			// console.log(action, 'dortus!');
			return {
				id: action.data.id,
				title: action.data.original_title,
				poster: action.data.poster_path,
				description: action.data.overview,
				video: action.data.video,
				runnigTime: action.data.runningTime,
			};
		default:
			return movieData;
	}
};
export default changeDetaildata;
//
