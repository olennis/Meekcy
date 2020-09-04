// import { createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

// const LOGINCHECK = 'logincheck';
// const LOGOUTCHECK = 'logoutcheck';

// export const loginCheck = () => {
// 	return {
// 		type: LOGINCHECK,
// 	};
// };

// export const logoutClickevent = () => {
// 	console.log('logoutaction');
// 	return {
// 		type: LOGOUTCHECK,
// 	};
// };

// const initialStore = { isLogin: false };

// const reducer = (state = initialStore, action) => {
// 	switch (action.type) {
// 		case LOGINCHECK:
// 			return { ...state, isLogin: true };
// 		case LOGOUTCHECK:
// 			console.log('enter');
// 			return { ...state, isLogin: false };
// 		default:
// 			return state;
// 	}
// };

// const store = createStore(reducer, composeWithDevTools());

// export default store;
