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
    return (dispatch) => {
        fetchAllSongs((errorCallBack) => {
            console.log(errorCallBack);
        },
        (successCallback) => {
            console.log(successCallback);
            dispatch({ type: 'data-fetch', payload: successCallback });
        })
    };
};
