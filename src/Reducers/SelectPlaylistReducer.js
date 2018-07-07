import { SELECT_PLAYLIST } from '../Values/Types';

const InitialState = { 
    selectedPlaylistID: null
};

export default (state = InitialState, action) => {
    switch (action.type) {
        case SELECT_PLAYLIST: 
            return action.payload;
        default: 
            return state;
    }
};
