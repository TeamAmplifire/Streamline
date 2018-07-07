import { 
    fetchAllSongs,
    fetchRecentlyAddedSongs,
    editSongInfo,
    deleteSong,
} from '../../react_native_fetch_music_filesNativeModule';
import {
    SELECT_SONG,
    DATA_FETCH_ALL_SONGS,
    DATA_FETCH_RECENTLY_ADDED,
} from '../Values/Types';

export const selectSong = (songID) => {
    return (
        {
            type: SELECT_SONG,
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
            let JsonArray = [];
            JsonArray = JSON.parse(successCallback);
            dispatch({ type: DATA_FETCH_ALL_SONGS, payload: JsonArray });
        });
    };
};

export const fetchRecentlyAdded = () => {
    return (dispatch) => {
        fetchRecentlyAddedSongs((errorCallBack) => {
            console.log(errorCallBack);
        },
        (successCallback) => {
            let JsonArray = [];
            JsonArray = JSON.parse(successCallback);
            dispatch({ type: DATA_FETCH_RECENTLY_ADDED, payload: JsonArray });
        });
    };
};

export const editSongInfoWithID = (newTitle, newAlbum, newArtist, songId, fullPath) => {
    return () => {
        editSongInfo(newTitle, newAlbum, newArtist, songId, fullPath);
        fetchSongs();
    };
};

export const deleteSongWithID = (songId, fullPath) => {
    return () => {
        deleteSong(songId, fullPath);
        fetchSongs();
    };
};
