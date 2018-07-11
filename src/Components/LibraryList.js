import React, { PureComponent } from 'react';
import {
  Text,
  View,
  ListView,
  TouchableOpacity
} from 'react-native';
import { DataSource } from 'react-native-recyclerview-list';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Header, SquareButton } from './Common';
import * as Act from '../Actions';
import { 
    ALL_SONGS,
    RECENTLY_ADDED_SONGS,
    ALBUM_LIST,
    ARTIST_LIST,
    PLAYLIST_LIST
 } from '../Values/Types';
import { onBackgroundColor } from '../Values/colors';
import { searchIcon } from '../Drawables/icons';

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

    componentWillMount() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(this.state.dataSource); 
        this.props.fetchSongs();
        this.props.fetchRecentlyAdded();
    }

    renderRow(item) {
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
                <Text style={styles.listTextStyle}>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    renderHeader() {
        return (
            <View style={styles.headerContainerStyle}>
                <View>
                    <Header headerText='Library' />
                </View>
                <View style={{ paddingRight: 12 }}>
                    <SquareButton 
                        style={{ height: 25, width: 25 }}
                        image={searchIcon} 
                        onPress={() => { 
                            Actions.search(); 
                        }}
                    />
                </View>
            </View>
        );
    }

    render() {
        const dataSource = new DataSource(this.state.dataSource, (item, index) => item.id);
        return (
            <View>
                {this.renderHeader()}
                <ListView 
                    dataSource={this.dataSource}
                    renderRow={this.renderRow} 
                /> 
            </View>
        );
    }
}

const styles = {
    listTextStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22, 
        color: onBackgroundColor,
        paddingLeft: 16,
        paddingTop: 16
    },

    headerContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
};

export default connect(null, Act)(LibraryList);
