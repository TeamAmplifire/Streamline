import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import RecyclerViewList, { DataSource } from 'react-native-recyclerview-list';
import { Header, Input } from './Common';
import * as Act from '../Actions';
import { backgroundColor } from '../Values/colors';
import ListItem from '../Components/ListItem';

class Search extends PureComponent {
    state = {
        dataSource: [],
        text: ''
    };

    componentWillMount() {
        this.props.fetchSongs();
        this.setState({ dataSource: this.props.songs });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ dataSource: nextProps.songs });
    }

    SearchFilterFunction(text) {
        const newData = this.props.songs.filter((item) => {
            const itemData = item.songName.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataSource: newData,
            text
        });
    }

    render() {
        const dataSource = new DataSource(this.state.dataSource, (item, index) => item.songID);
        return (
            <View style={{ flex: 1, backgroundColor }}>
                <Header headerText='Search' />
                <Input 
                    value={this.state.text} 
                    placeholder='Search...' 
                    onChangeText={(text) => {
                            // this.setState({ text });
                            this.SearchFilterFunction(text);
                        }
                    }                
                />
                <RecyclerViewList
                    style={{ flex: 1 }}
                    dataSource={dataSource}
                    renderItem={({ item, index }) => <ListItem item={item} />}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, Act)(Search);
