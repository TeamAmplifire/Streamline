import { 
    fetchAllAlbums,
    getSongsFromAlbum,
    getAlbumArt
} from '../../react_native_fetch_music_filesNativeModule';

import { 
    DATA_FETCH_ALL_ALBUMS,
    GET_SONGS_FROM_ALBUM,
    GET_ALBUM_ART,
    SELECT_ALBUM
 } from '../Values/Types';

export const selectAlbum = (albumID) => {
    return (
        {
            type: SELECT_ALBUM,
            payload: albumID
        }
    );
};

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

export const getAlbumArtWithID = (albumID) => {
    return (dispatch) => {
        getAlbumArt(albumID, (errorCallBack) => {
            console.log(errorCallBack);
        },
        (successCallback) => {
            dispatch({ type: GET_ALBUM_ART, payload: successCallback });
        });
    };
};
