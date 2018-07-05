import { combineReducers } from 'redux';
import DataListReducer from './DataListReducer';
import SelectSongReducer from './SelectSongReducer';

export default combineReducers({
    songs: DataListReducer,
    selectedSongID: SelectSongReducer
});
