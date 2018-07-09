import { NativeModules } from 'react-native';

const { react_native_fetch_music_files } = NativeModules;

export const fetchAllSongs = react_native_fetch_music_files.fetchAllSongs;
// Callback errorCallback, Callback successCallback
export const fetchRecentlyAddedSongs = react_native_fetch_music_files.fetchRecentlyAdded;
// Callback errorCallback, Callback successCallback
export const fetchAllPlaylists = react_native_fetch_music_files.fetchAllPlaylists;
// Callback errorCallback, Callback successCallback
export const createPlaylist = react_native_fetch_music_files.createPlaylist;
// String playlistName, Callback errorCallback, Callback successCallback
export const addSongToPlaylist = react_native_fetch_music_files.addSongToPlaylist;
// long playlistId, long songId, Callback errorCallback, Callback successCallback
export const deletePlaylist = react_native_fetch_music_files.deletePlaylist;
// long playlistId
export const renamePlaylist = react_native_fetch_music_files.renamePlaylist;
// long playlistId, String newName, Callback errorCallback, Callback successCallback
export const getSongsFromPlaylist = react_native_fetch_music_files.getSongsFromPlaylist;
// long playlistId, Callback errorCallback, Callback successCallback
export const editSongInfo = react_native_fetch_music_files.editSongInfo;
// String newTitle, String newAlbum, String newArtist, long songId, String fullPath
export const deleteSong = react_native_fetch_music_files.deleteSong;
// long songId, String fullPath
export const fetchAllAlbums = react_native_fetch_music_files.fetchAllAlbums;
// Callback errorCallback, Callback successCallback
export const getSongsFromAlbum = react_native_fetch_music_files.getSongsFromAlbum;
// long albumId, Callback errorCallback, Callback successCallback
export const fetchAllArtists = react_native_fetch_music_files.fetchAllArtists;
// Callback errorCallback, Callback successCallback
export const getSongsFromArtist = react_native_fetch_music_files.getSongsFromArtist;
// long artistId, Callback errorCallback, Callback successCallback
export const deleteSongFromPlaylist = react_native_fetch_music_files.deleteSongFromPlaylist;
// long playlistId, long songId
export const getAlbumArt = react_native_fetch_music_files.getAlbumArt;
// long albumID, Callback errorCallback, Callback successCallback
export const getArtworkForSong = react_native_fetch_music_files.getArtworkForSong;
// long songID, Callback errorCallback, Callback successCallback
export const permissionCheck = react_native_fetch_music_files.permissionCheck;
// No parameters
export const getSong = react_native_fetch_music_files.getSongWithID;
// long songID, Callback errorCallback, Callback successCallback
