import { SELECT_SONG } from '../Values/Types';

const INITIAL_STATE = {
    songID: null,
    songName: null,
    albumName: null,
    artistName: null,
    fullpath: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_SONG:
            return action.payload;
        default: 
            return state;
    }
};
