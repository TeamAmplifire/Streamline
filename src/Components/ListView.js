import React, { PureComponent } from 'react';
import {
  Text
} from 'react-native';
import { connect } from 'react-redux';
import RecyclerViewList, { DataSource } from 'react-native-recyclerview-list';
import TrackPlayer from 'react-native-track-player';
import ListItem from './ListItem';
import * as Act from '../Actions';
import { Header } from './Common';
import { 
    ALL_SONGS,
    RECENTLY_ADDED_SONGS,
    ALBUM_WITH_ID,
    ARTIST_WITH_ID,
    PLAYLIST_WITH_ID
 } from '../Values/Types';

class ListView extends PureComponent {
    state = {
        dataSource: [],
    };
    componentWillMount() {
        switch (this.props.listType) {
            case ALL_SONGS:
                this.props.fetchSongs();
                this.setState({ dataSource: this.props.songs });
                break;
            case RECENTLY_ADDED_SONGS:
                this.props.fetchRecentlyAdded();
                this.setState({ dataSource: this.props.recentlyAdded });
                break;
            case ALBUM_WITH_ID:
                this.props.getSongsFromAlbumWithID(this.props.selectedAlbumID);
                this.setState({ dataSource: this.props.selectedAlbumSongList });
                break;
            case ARTIST_WITH_ID:
                this.props.getSongsFromArtistWithID(this.props.selectedArtistID);
                this.setState({ dataSource: this.props.selectedArtistSongList });
                break;
            case PLAYLIST_WITH_ID:
                this.props.getSongsFromPlaylistWithID(this.props.selectedPlaylistID);
                this.setState({ dataSource: this.props.selectedPlaylistSongList });
                break;
            default:
                this.setState({ dataSource: [] });
        }
    }

    componentWillReceiveProps(nextProps) {
        switch (nextProps.listType) {
            case ALL_SONGS:
                this.setState({ dataSource: nextProps.songs });
                this.getPlayList(nextProps.songs);
                break;
            case RECENTLY_ADDED_SONGS:
                this.setState({ dataSource: nextProps.recentlyAdded });
                this.getPlayList(nextProps.recentlyAdded);
                break;
            case ALBUM_WITH_ID:
                this.setState({ dataSource: nextProps.selectedAlbumSongList });
                this.getPlayList(nextProps.selectedAlbumSongList);
                break;
            case ARTIST_WITH_ID:
                this.setState({ dataSource: nextProps.selectedArtistSongList });
                this.getPlayList(nextProps.selectedArtistSongList);
                break;
            case PLAYLIST_WITH_ID:
                this.setState({ dataSource: nextProps.selectedPlaylistSongList });
                this.getPlayList(nextProps.selectedPlaylistSongList);
                break;
            default:
                this.setState({ dataSource: [] });
        }
    }
    
    getPlayList(list) {
        let songArray = [];
        for (let i = 0; i < list.length; i++) {
            songArray.push({
                id: list[i].songID,
                url: 'file://'+ list[i].fullPath,
                title: list[i].songName,
                artist: list[i].artistName,
            });
        }
        TrackPlayer.add(songArray, null);
        TrackPlayer.pause();
    }
        
    render() {
        const dataSource = new DataSource(this.state.dataSource, (item, index) => item.songID);
        return (
            <RecyclerViewList 
                style={{ flex: 1 }}
                dataSource={dataSource}
                renderItem={({ item, index }) => <ListItem item={item} index={index} />}
                ListHeaderComponent={<Header headerText={this.props.headerText} />}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        songs: state.songs,
        dataSource: state.dataSource,
        selectedSong: state.selectedSong,
        recentlyAdded: state.recentlyAdded,
        playlistList: state.playlistList,
        selectedPlaylistID: state.selectedPlaylistID,
        selectedPlaylistSongList: state.selectedPlaylistSongList,
        albumList: state.albumList,
        selectedAlbumID: state.selectedAlbumID,
        selectedAlbumSongList: state.selectedAlbumSongList,
        artistList: state.artistList,
        selectedArtistID: state.selectedArtistID,
        selectedArtistSongList: state.selectedArtistSongList,
    };
};

export default connect(mapStateToProps, Act)(ListView);

