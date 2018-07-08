import React, { PureComponent } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import RecyclerViewList, { DataSource } from 'react-native-recyclerview-list';
import * as Act from '../Actions';
import { Header } from './Common';
import { 
    ALL_SONGS,
    RECENTLY_ADDED_SONGS,
    ALBUM_LIST,
    ARTIST_LIST,
    PLAYLIST_LIST
 } from '../Values/Types';

class LibraryList extends PureComponent {
    state = {
        dataSource: [
            {
                id: ALL_SONGS,
                name: 'All Songs'
            },
            {
                id: RECENTLY_ADDED_SONGS,
                name: 'Recently Added'
            },
            {
                id: PLAYLIST_LIST,
                name: 'Playlists'
            },
            {
                id: ALBUM_LIST,
                name: 'Albums'
            },
            {
                id: ARTIST_LIST,
                name: 'Artists'
            }
        ],
    };

    onItemPress(item) {
        switch (item.id) {
            case ALL_SONGS:
                console.log(item);
                break;
            case RECENTLY_ADDED_SONGS:
            case PLAYLIST_LIST:
            case ALBUM_LIST:
            case ARTIST_LIST:
            default:
        }
    }
    
    render() {
        console.log(this.state);
        const dataSource = new DataSource(this.state.dataSource, (item, index) => item.id);
        return (
            <RecyclerViewList 
                style={{ flex: 1 }}
                dataSource={dataSource}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity 
                        onPress={() => {
                            switch (item.id) {
                                case ALL_SONGS:
                                    console.log(item);
                                    break;
                                case RECENTLY_ADDED_SONGS:
                                case PLAYLIST_LIST:
                                case ALBUM_LIST:
                                case ARTIST_LIST:
                                default:
                            }
                        }}
                        >
                            <Text style={{ fontSize: 20, color: '#fff' }}>{item.name}</Text>
                        </TouchableOpacity>
                    );
                }}
                ListHeaderComponent={<Header headerText={this.props.headerText} />}
            />
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         songs: state.songs,
//         selectedSongID: state.selectedSongID,
//         recentlyAdded: state.recentlyAdded,
//         playlistList: state.playlistList,
//         selectedPlaylistID: state.selectedPlaylistID,
//         selectedPlaylistSongList: state.selectedPlaylistSongList,
//         albumList: state.albumList,
//         selectedAlbumID: state.selectedAlbumID,
//         selectedAlbumSongList: state.selectedAlbumSongList,
//         artistList: state.artistList,
//         selectedArtistID: state.selectedArtistID,
//         selectedArtistSongList: state.selectedArtistSongList,
//     };
// };

// export default connect(mapStateToProps, Act)(ListView);
export default LibraryList;
