import { NativeModules } from 'react-native';

const { react_native_fetch_music_files } = NativeModules;

export const fetchAllSongs = react_native_fetch_music_files.fetchAllSongs;
export const fetchRecentlyAddedSongs = react_native_fetch_music_files.fetchRecentlyAdded;
