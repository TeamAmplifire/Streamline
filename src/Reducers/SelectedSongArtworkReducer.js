import { GET_SONG_ARTWORK } from '../Values/Types';

export default (state = null, action) => {
    switch (action.type) {
        case GET_SONG_ARTWORK: 
            return action.payload;
        default: 
            return state;
    }
};
