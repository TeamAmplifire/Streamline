import { 
    fetchAllPlaylists,
    createPlaylist,
    addSongToPlaylist,
    deletePlaylist,
    renamePlaylist,
    getSongsFromPlaylist,
    deleteSongFromPlaylist
} from '../../react_native_fetch_music_filesNativeModule';

import { 
    DATA_FETCH_ALL_PLAYLISTS,
    GET_SONGS_FROM_PLAYLIST,
    SELECT_PLAYLIST,
 } from '../Values/Types';

export const selectPlaylist = (playlistID) => {
    return (
        {
            type: SELECT_PLAYLIST,
            payload: playlistID
        }
    );
};

export const fetchPlaylistList = () => {
    return (dispatch) => {
        fetchAllPlaylists((errorCallBack) => {
            console.log(errorCallBack);
        },
        (successCallback) => {
            let JsonArray = [];
            JsonArray = JSON.parse(successCallback);
            dispatch({ type: DATA_FETCH_ALL_PLAYLISTS, payload: JsonArray });
        });
    };
};

export const createNewPlaylist = (playlistName) => {
    return () => {
        createPlaylist(playlistName, (errorCallBack) => {
            console.log(errorCallBack);
        },
        (successCallback) => {
            console.log(successCallback);
        });
    };
};

export const addSongToPlaylistWithID = (playlistID, songID) => {
    return () => {
        addSongToPlaylist(playlistID, songID, (errorCallBack) => {
            console.log(errorCallBack);
        },
        (successCallback) => {
            console.log(successCallback);
        });
    };
};

export const deletePlaylistWithID = (playlistID) => {
    return () => {
        deletePlaylist(playlistID);
    };
};

export const renamePlaylistWithID = (playlistID, newName) => {
    return () => {
        renamePlaylist(playlistID, newName, (errorCallBack) => {
            console.log(errorCallBack);
        },
        (successCallback) => {
            console.log(successCallback);
        });
    };
};

export const getSongsFromPlaylistWithID = (playlistID) => {
    return (dispatch) => {
        getSongsFromPlaylist(playlistID, (errorCallBack) => {
            console.log(errorCallBack);
        },
        (successCallback) => {
            let JsonArray = [];
            JsonArray = JSON.parse(successCallback);
            dispatch({ type: GET_SONGS_FROM_PLAYLIST, payload: JsonArray });
        });
    };
};

export const deleteSongFromPlaylistWithID = (playlistID, songID) => {
    deleteSongFromPlaylist(playlistID, songID);
};
