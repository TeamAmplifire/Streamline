import { DATA_FETCH_ALL_ARTISTS } from '../Values/Types';

const InitialState = [{ 
    name: null,
    id: null
 }];

export default (state = InitialState, action) => {
    switch (action.type) {
        case DATA_FETCH_ALL_ARTISTS: 
            return action.payload;
        default: 
            return state;
    }
};
