import { SELECT_SONG } from '../Values/Types';

const InitialState = { 
    selectedSongID: null
};

export default (state = InitialState, action) => {
    switch (action.type) {
        case SELECT_SONG:
            return action.payload;
        default: 
            return state;
    }
};
