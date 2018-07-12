import { 
    SHOW_HIDE_PLAYER_TRAY
} from '../Values/Types';

export const playerTray = (toggle) => {
    return (
        {
            type: SHOW_HIDE_PLAYER_TRAY,
            payload: toggle
        }
    );
};
