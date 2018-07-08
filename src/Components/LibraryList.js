import React, { PureComponent } from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';
import RecyclerViewList, { DataSource } from 'react-native-recyclerview-list';
import { Actions } from 'react-native-router-flux';
import { Header } from './Common';
import { 
    ALL_SONGS,
    RECENTLY_ADDED_SONGS,
    ALBUM_LIST,
    ARTIST_LIST,
    PLAYLIST_LIST
 } from '../Values/Types';
import { backgroundColor } from '../Values/colors';

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

    render() {
        const dataSource = new DataSource(this.state.dataSource, (item, index) => item.id);
        return (
                <RecyclerViewList 
                    style={{ flex: 1, backgroundColor }}
                    dataSource={dataSource}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity 
                            onPress={() => {
                                switch (item.id) {
                                    case ALL_SONGS:
                                        Actions.allSongs({ listType: ALL_SONGS, headerText: 'All Songs' });
                                        break;
                                    case RECENTLY_ADDED_SONGS:
                                        Actions.recentlyAdded({ listType: RECENTLY_ADDED_SONGS, headerText: 'Recently Added' });
                                        break;
                                    case PLAYLIST_LIST:
                                        Actions.playlistList({ listType: PLAYLIST_LIST, headerText: 'Playlists' });
                                        break;                                    
                                    case ALBUM_LIST:
                                        Actions.albumList({ listType: ALBUM_LIST, headerText: 'Albums' });
                                        break;
                                    case ARTIST_LIST:
                                        Actions.artistList({ listType: ARTIST_LIST, headerText: 'Artists' });
                                        break;
                                    default:
                                }
                            }}
                            >
                                <Text style={{ fontSize: 30, color: '#fff' }}>{item.name}</Text>
                            </TouchableOpacity>
                        );
                    }}
                    ListHeaderComponent={<Header headerText='Library' />}
                />
        );
    }
}

export default LibraryList;
