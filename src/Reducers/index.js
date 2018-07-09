import { combineReducers } from 'redux';
import AllSongsListReducer from './AllSongsListReducer';
import AlbumListReducer from './AlbumListReducer';
import ArtistListReducer from './ArtistListReducer';
import PlaylistListReducer from './PlaylistListReducer';
import RecentlyAddedSongsReducer from './RecentlyAddedSongsReducer';
import SelectAlbumReducer from './SelectAlbumReducer';
import SelectArtistReducer from './SelectArtistReducer';
import SelectedAlbumSongListReducer from './SelectedAlbumSongListReducer';
import SelectedArtistSongListReducer from './SelectedArtistSongListReducer';
import SelectedPlaylistSongListReducer from './SelectedPlaylistSongListReducer';
import SelectPlaylistReducer from './SelectPlaylistReducer';
import SelectSongReducer from './SelectSongReducer';
import SelectedSongArtworkReducer from './SelectedSongArtworkReducer';

export default combineReducers({
    songs: AllSongsListReducer,
    selectedSong: SelectSongReducer,
    recentlyAdded: RecentlyAddedSongsReducer,
    playlistList: PlaylistListReducer,
    selectedPlaylistID: SelectPlaylistReducer,
    selectedPlaylistSongList: SelectedPlaylistSongListReducer,
    albumList: AlbumListReducer,
    selectedAlbumID: SelectAlbumReducer,
    selectedAlbumSongList: SelectedAlbumSongListReducer,
    artistList: ArtistListReducer,
    selectedArtistID: SelectArtistReducer,
    selectedArtistSongList: SelectedArtistSongListReducer,
    selectedSongArtwork: SelectedSongArtworkReducer,
});
