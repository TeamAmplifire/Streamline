import { SELECT_ARTIST } from '../Values/Types';

const InitialState = { 
    selectedArtistID: null
};

export default (state = InitialState, action) => {
    switch (action.type) {
        case SELECT_ARTIST: 
            return action.payload;
        default: 
            return state;
    }
};
