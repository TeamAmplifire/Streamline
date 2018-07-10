import React, { Component } from 'react';
import { 
    View,
    Text,
    Modal,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './CardSection';
import { BorderlessButton } from './BorderlessButton';
import * as actions from '../../Actions';
import SingleInputModal from './SingleInputModal';

class PlaylistListModal extends Component {
    state = {
        createPlaylistVisibility: false,
        visibilty: true
    }

    componentWillMount() {
        this.props.fetchPlaylistList();
    }

    render() {
        return (
            <Modal
                visible={this.props.visible && this.state.visibilty}
                transparent
                animationType="slide"
                onRequestClose={() => {}}
            >
                <View style={styles.containerStyle}>
                    <CardSection>
                        <FlatList 
                            style={{ flex: 1 }}
                            data={this.props.playlistList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(item) => {
                                console.log(item);
                                return (
                                    <TouchableOpacity 
                                        onPress={() => {
                                            this.props.addSongToPlaylistWithID(item.item.id, this.props.item.songID);
                                            this.setState({ visibilty: false });
                                        }}
                                    >
                                        <Text style={{ color: '#fff' }}>{item.item.name}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </CardSection>
                 
                    <CardSection>
                        <BorderlessButton onPress={this.props.onDiscard}> 
                            Cancel
                        </BorderlessButton>

                        <BorderlessButton 
                            onPress={() => {
                                this.setState({ createPlaylistVisibility: true });
                            }}
                        >
                            Create New Playlist
                        </BorderlessButton>
                    </CardSection>
                    
                    <SingleInputModal 
                        visible={this.state.createPlaylistVisibility}
                        onDiscard={() => {
                            this.setState({ createPlaylistVisibility: false });
                        }}
                    />
                </View>
            </Modal>
        );
    }
}

const styles = {
    cardSelectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
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

export default connect(mapStateToProps, actions)(PlaylistListModal);
