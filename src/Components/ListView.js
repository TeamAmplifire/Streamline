import React, { Component } from 'react';
import {
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import * as Actions from '../Actions';
import { Header } from './Common';
import { 
    ALL_SONGS,
    RECENTLY_ADDED_SONGS,
    ALBUM_WITH_ID,
    ARTIST_WITH_ID,
    PLAYLIST_WITH_ID
 } from '../Values/Types';

class ListView extends Component {
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
                this.props.getSongsfromAlbumWithID(this.props.ID);
                this.setState({ dataSource: this.props.selectedAlbumSongList });
                break;
            case ARTIST_WITH_ID:
                this.props.getSongsfromArtistWithID(this.props.ID);
                this.setState({ dataSource: this.props.selectedArtistSongList });
                break;
            case PLAYLIST_WITH_ID:
                this.props.getSongsFromPlaylistWithID(this.props.ID);
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
                break;
            case RECENTLY_ADDED_SONGS:
                this.setState({ dataSource: nextProps.recentlyAdded });
                break;
            case ALBUM_WITH_ID:
                this.setState({ dataSource: nextProps.selectedAlbumSongList });
                break;
            case ARTIST_WITH_ID:
                this.setState({ dataSource: nextProps.selectedArtistSongList });
                break;
            case PLAYLIST_WITH_ID:
                this.setState({ dataSource: nextProps.selectedPlaylistSongList });
                break;
            default:
                this.setState({ dataSource: [] });
        }
    }

  renderHeader() {
    return <Header headerText='Recently Added' />;
  }

  render() {
      console.log(this.props);
    return (
        <FlatList
          data={this.state.dataSource}
          extraData={this.props}
          keyExtractor={item => item.fullpath} //Need to change songName to songID 
          renderItem={({ item }) => <ListItem item={item} />}
          ListHeaderComponent={this.renderHeader}
        />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
    selectedSongID: state.selectedSongID,
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

export default connect(mapStateToProps, Actions)(ListView);

