import { DATA_FETCH_ALL_ARTISTS } from '../Values/Types';

const InitialState = [{ 
    artistName: null,
    artistID: null
 }];

export default (state = InitialState, action) => {
    switch (action.type) {
        case DATA_FETCH_ALL_ARTISTS: 
            return action.payload;
        default: 
            return state;
    }
};
