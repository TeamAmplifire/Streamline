import { SHOW_HIDE_PLAYER_TRAY } from '../Values/Types';

export default (state = false, action) => {
    switch (action.type) {
        case SHOW_HIDE_PLAYER_TRAY: 
            return action.payload;
        default: 
            return state;
    }
};
