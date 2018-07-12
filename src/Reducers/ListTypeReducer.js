import { SELECT_LIST_TYPE } from '../Values/Types';

export default (state = false, action) => {
    switch (action.type) {
        case SELECT_LIST_TYPE: 
            return action.payload;
        default: 
            return state;
    }
};
