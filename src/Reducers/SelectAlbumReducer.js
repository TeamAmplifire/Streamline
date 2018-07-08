import { SELECT_ALBUM } from '../Values/Types';

export default (state = null, action) => {
    switch (action.type) {
        case SELECT_ALBUM: 
            return action.payload;
        default: 
            return state;
    }
};
