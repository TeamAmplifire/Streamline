import { SELECT_PLAYLIST } from '../Values/Types';


export default (state = null, action) => {
    switch (action.type) {
        case SELECT_PLAYLIST: 
            return action.payload;
        default: 
            return state;
    }
};
