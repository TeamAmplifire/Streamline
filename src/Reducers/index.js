import { combineReducers } from 'redux';
import DataListReducer from './DataListReducer';

export default combineReducers({
    songs: DataListReducer
});
