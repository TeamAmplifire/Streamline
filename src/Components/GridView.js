import React, { Component } from 'react';
import { 
    StyleSheet,
    Dimensions,
    View
} from 'react-native';
import GridView from 'react-native-super-grid';
import { connect } from 'react-redux';
import GridItem from './GridItem';
import * as Act from '../Actions';
import { Header } from './Common';
import { 
    PLAYLIST_LIST,
    ALBUM_LIST,
    ARTIST_LIST,
 } from '../Values/Types';
import { backgroundColor } from '../Values/colors';

class Grid extends Component {
    state = { dataSource: [] };

    componentWillMount() {
        console.log(this.props);
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
        console.log(this.props);
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

    renderHeader() {
        console.log(this.props, 'renderHeader');
        return (
            <Header headerText={this.props.headerText} />
        );
    }

    render() {
        console.log(this.props, 'render');
        return (
            <View style={{ flex: 1, backgroundColor }}>
                {this.renderHeader()}
                <GridView
                    itemDimension={Dimensions.get('window').width * 0.45}
                    items={this.state.dataSource}
                    style={styles.gridView}
                    renderItem={(item) => {
                        return <GridItem item={item} listType={this.props.listType} />;
                    }}
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

export default connect(mapStateToProps, Act)(Grid);
