import { 
    fetchAllAlbums,
    getSongsFromAlbum
} from '../../react_native_fetch_music_filesNativeModule';

import { 
    DATA_FETCH_ALL_ALBUMS,
    GET_SONGS_FROM_ALBUM
 } from '../Values/Types';

export const fetchAlbumList = () => {
    return (dispatch) => {
        fetchAllAlbums((errorCallBack) => {
            console.log(errorCallBack);
        },
        (successCallback) => {
            let JsonArray = [];
            JsonArray = JSON.parse(successCallback);
            dispatch({ type: DATA_FETCH_ALL_ALBUMS, payload: JsonArray });
        });
    };
};

export const getSongsFromAlbumWithID = (albumID) => {
    return (dispatch) => {
        getSongsFromAlbum(albumID, (errorCallBack) => {
            console.log(errorCallBack);
        },
        (successCallback) => {
            let JsonArray = [];
            JsonArray = JSON.parse(successCallback);
            dispatch({ type: GET_SONGS_FROM_ALBUM, payload: JsonArray });
        });
    };
};
