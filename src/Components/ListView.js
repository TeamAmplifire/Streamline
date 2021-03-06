import React, { PureComponent } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import RecyclerViewList, { DataSource } from 'react-native-recyclerview-list';
import ListItem from './ListItem';
import * as Act from '../Actions';
import { 
    ALL_SONGS,
    RECENTLY_ADDED_SONGS,
    ALBUM_WITH_ID,
    ARTIST_WITH_ID,
    PLAYLIST_WITH_ID
 } from '../Values/Types';
import { Header, SquareButton } from './Common';
import { searchIcon, editIcon, deleteIcon } from '../Drawables/icons';
import { accentColor } from '../Values/colors';
import EditPlaylistModal from './Common/EditPlaylistModal';
import ConfirmationModal from './Common/ConfirmationModal';

class ListView extends PureComponent {
    state = {
        dataSource: [],
        loading: true,
        confirmModal: false,
        editModal: true
    };

    componentWillMount() {
        this.refresh();
    }

    componentDidMount() {
        this.setState({ loading: false, editModal: false });
    }

    componentWillReceiveProps(nextProps) {
        nextProps.selectListType(nextProps.listType);
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

    onConfirmDelete() {
        this.props.deletePlaylistWithID(this.props.selectedPlaylistID);
        this.refresh();
        this.setState({ confirmModal: false });
    }

    onCancelDelete() {
        this.setState({ confirmModal: false });
    }

    refresh() {
        switch (this.props.listType) {
            case ALL_SONGS:
                this.props.fetchSongs();
                break;
            case RECENTLY_ADDED_SONGS:
                this.props.fetchRecentlyAdded();
                break;
            case ALBUM_WITH_ID:
                this.props.getSongsFromAlbumWithID(this.props.selectedAlbumID);
                break;
            case ARTIST_WITH_ID:
                this.props.getSongsFromArtistWithID(this.props.selectedArtistID);
                break;
            case PLAYLIST_WITH_ID:
                this.props.getSongsFromPlaylistWithID(this.props.selectedPlaylistID);
                break;
            default:
                this.setState({ dataSource: [] });
        }
    }
        
    renderHeader() {
        if (this.props.listType === PLAYLIST_WITH_ID) {
            return (
                <View style={styles.headerContainerStyle}>
                    <View>
                        <Header headerText={this.props.headerText} />
                    </View>

                    <View style={styles.buttonContainerStyle}>
                        <View style={{ paddingRight: 24 }}>
                            <SquareButton 
                                style={{ height: 25, width: 25 }}
                                image={editIcon} 
                                onPress={() => { 
                                    this.setState({ editModal: true });
                                }}
                            />
                        </View>
                        
                        <View style={{ paddingRight: 12 }}>
                            <SquareButton 
                                style={{ height: 25, width: 25 }}
                                image={deleteIcon}
                                onPress={() => { 
                                    this.setState({ confirmModal: true });
                                }}
                            />
                        </View>
                    </View>
                </View>            
            );
        }
        
        return <Header headerText={this.props.headerText} />;
    }

    render() {
        //console.log(this.props);
        
        const dataSource = new DataSource(this.state.dataSource, (item, index) => item.songID);
        return (
            <View style={{ flex: 1 }}>
                {this.renderHeader()}
                <RecyclerViewList 
                    style={{ flex: 1 }}
                    dataSource={dataSource}
                    renderItem={({ item, index }) => <ListItem item={item} index={index} listType={this.props.listType} refresh={this.refresh.bind(this)} />}
                />
                <EditPlaylistModal 
                    visible={this.state.editModal}
                    playlistName={this.props.headerText}
                    onDiscard={() => {
                        this.setState({ editModal: false });
                    }}
                />
                <ConfirmationModal
                        visible={this.state.confirmModal}
                        onAccept={this.onConfirmDelete.bind(this)}
                        onDecline={this.onCancelDelete.bind(this)}
                >
                        Are you sure you want to delete this?
                </ConfirmationModal>
            </View>
        );
    }
}

const styles = {
    loadingStyle: {
        flex: 1
    },
    headerContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    }

};

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

