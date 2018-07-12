import { 
    fetchAllArtists,
    getSongsFromArtist
} from '../../react_native_fetch_music_filesNativeModule';

import { 
    DATA_FETCH_ALL_ARTISTS,
    GET_SONGS_FROM_ARTIST,
    SELECT_ARTIST
 } from '../Values/Types';

 export const selectArtist = (artistID) => {
    return (
        {
            type: SELECT_ARTIST,
            payload: artistID
        }
    );
};

export const fetchArtistList = () => {
    return (dispatch) => {
        fetchAllArtists((errorCallBack) => {
            //console.log(errorCallBack);
        },
        (successCallback) => {
            let JsonArray = [];
            JsonArray = JSON.parse(successCallback);
            dispatch({ type: DATA_FETCH_ALL_ARTISTS, payload: JsonArray });
        });
    };
};

export const getSongsFromArtistWithID = (artistID) => {
    return (dispatch) => {
        getSongsFromArtist(artistID, (errorCallBack) => {
            //console.log(errorCallBack);
        },
        (successCallback) => {
            let JsonArray = [];
            JsonArray = JSON.parse(successCallback);
            dispatch({ type: GET_SONGS_FROM_ARTIST, payload: JsonArray });
        });
    };
};
