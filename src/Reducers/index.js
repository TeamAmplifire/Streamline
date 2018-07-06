import { combineReducers } from 'redux';
import DataListReducer from './AllSongsListReducer';
import SelectSongReducer from './SelectSongReducer';
import RecentlyAddedSongsReducer from './RecentlyAddedSongsReducer';

export default combineReducers({
    songs: DataListReducer,
    selectedSongID: SelectSongReducer,
    recentlyAdded: RecentlyAddedSongsReducer,
});
