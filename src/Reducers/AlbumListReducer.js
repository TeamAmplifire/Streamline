import { DATA_FETCH_ALL_ALBUMS } from '../Values/Types';

const InitialState = [{ 
    name: null,
    id: null,
    albumArt: null,
 }];

export default (state = InitialState, action) => {
    switch (action.type) {
        case DATA_FETCH_ALL_ALBUMS: 
            return action.payload;
        default: 
            return state;
    }
};
