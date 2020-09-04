import { combineReducers } from 'redux';
import changeDetaildata from '../actions/changeDetaildata';
import changeModalStatus from '../actions/changeModalStatus';
import changeLoginStatus from '../actions/changeLoginStatus';
const rootReducer = combineReducers({
	changeDetaildata,
	changeModalStatus,
	changeLoginStatus,
});
export default rootReducer;
