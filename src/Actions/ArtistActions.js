import { 
    fetchAllArtists,
    getSongsfromArtist
} from '../../react_native_fetch_music_filesNativeModule';

import { 
    DATA_FETCH_ALL_ARTISTS,
    GET_SONGS_FROM_ARTIST
 } from '../Values/Types';

export const fetchArtistList = () => {
    return (dispatch) => {
        fetchAllArtists((errorCallBack) => {
            console.log(errorCallBack);
        },
        (successCallback) => {
            let JsonArray = [];
            JsonArray = JSON.parse(successCallback);
            dispatch({ type: DATA_FETCH_ALL_ARTISTS, payload: JsonArray });
        });
    };
};

export const getSongsfromArtistWithID = (artistID) => {
    return (dispatch) => {
        getSongsfromArtist(artistID, (errorCallBack) => {
            console.log(errorCallBack);
        },
        (successCallback) => {
            let JsonArray = [];
            JsonArray = JSON.parse(successCallback);
            dispatch({ type: GET_SONGS_FROM_ARTIST, payload: JsonArray });
        });
    };
};
