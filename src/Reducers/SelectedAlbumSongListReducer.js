import { GET_SONGS_FROM_ALBUM } from '../Values/Types';

const InitialState = [{ 
    songName: null,
    songID: null,
    albumArt: null,
    albumName: null,
    fullpath: null,
    songLength: null,
    artistName: null,
}];

export default (state = InitialState, action) => {
    switch (action.type) {
        case GET_SONGS_FROM_ALBUM: 
            return action.payload;
        default: 
            return state;
    }
};
