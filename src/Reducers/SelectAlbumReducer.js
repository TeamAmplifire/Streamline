import { SELECT_ALBUM } from '../Values/Types';

const InitialState = { 
    selectedAlbumID: null
};

export default (state = InitialState, action) => {
    switch (action.type) {
        case SELECT_ALBUM: 
            return action.payload;
        default: 
            return state;
    }
};
