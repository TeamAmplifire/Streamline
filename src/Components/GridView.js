import React, { Component } from 'react';
import { 
    StyleSheet,
    Dimensions,
    View
} from 'react-native';
import GridView from 'react-native-super-grid';
import { connect } from 'react-redux';
import GridItem from './GridItem';
import * as Actions from '../Actions';
import { Header } from './Common';
import { 
    PLAYLIST_LIST,
    ALBUM_LIST,
    ARTIST_LIST,
 } from '../Values/Types';

class Grid extends Component {
    state = { dataSource: [] };

    componentWillMount() {
        switch (this.props.listType) {
            case PLAYLIST_LIST:
                this.props.fetchPlaylistList();
                this.setState({ dataSource: this.props.playlistList });
                break;
            case ALBUM_LIST:
                this.props.fetchAlbumList();
                this.setState({ dataSource: this.props.albumList });
                break;
            case ARTIST_LIST:
                this.props.fetchArtistList();
                this.setState({ dataSource: this.props.artistList });
                break;
            default:
                this.setState({ dataSource: [] });
        }
    }

    componentWillReceiveProps(nextProps) {
        switch (this.props.listType) {
            case PLAYLIST_LIST:
                this.setState({ dataSource: nextProps.playlistList });
                break;
            case ALBUM_LIST:
                this.setState({ dataSource: nextProps.albumList });
                break;
            case ARTIST_LIST:
                this.setState({ dataSource: nextProps.artistList });
                break;
            default:
                this.setState({ dataSource: [] });
        }
    }

    renderItem(item) {
        const check = item.albumArt !== undefined;
    return (
        <View>
            <GridItem item={item} isALbumList={check} />
        </View>
    );
    }

    renderHeader() {
        return (
            <Header headerText={this.props.headerText} />
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderHeader()}
                <GridView
                    itemDimension={Dimensions.get('window').width * 0.45}
                    items={this.state.dataSource}
                    style={styles.gridView}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    gridView: {
      paddingTop: 25,
      flex: 1,
    },
});

const mapStateToProps = state => {
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

export default connect(mapStateToProps, Actions)(Grid);
