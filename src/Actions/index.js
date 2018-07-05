import { fetchAllSongs } from '../../react_native_fetch_music_filesNativeModule';


export const selectLibrary = (songID) => {
    return (
        {
            type: 'select-song',
            payload: songID
        }
    );
};

export const fetchSongs = () => {
    fetchAllSongs((errorCallBack) => {
        console.log(errorCallBack);
    },
    (successCallback) => {
        console.log(successCallback);
        return (dispatch) => {
            dispatch({ type: 'data-fetch', payload: successCallback });
        };
    });
};
