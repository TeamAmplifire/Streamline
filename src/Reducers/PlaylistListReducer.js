import { DATA_FETCH_ALL_PLAYLISTS } from '../Values/Types';

const InitialState = [{ 
    playlistName: null,
    playlistID: null
 }];

export default (state = InitialState, action) => {
    switch (action.type) {
        case DATA_FETCH_ALL_PLAYLISTS: 
            return action.payload;
        default: 
            return state;
    }
};
