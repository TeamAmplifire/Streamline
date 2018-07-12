import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import { backgroundColor } from '../Values/colors';
import Router from '../Router/Router';
import PlayerTray from '../Components/PlayerTray';
import * as Act from '../Actions';

class App extends Component {

    render() {
        console.log(this.props);
        TrackPlayer.getState().then(value => {
            if (value === 3) {
                TrackPlayer.getCurrentTrack().then((songID) => {
                    this.props.selectSong(parseInt(songID, 10));
                    this.props.getArtworkForSongWithID(parseInt(songID, 10));
                    this.props.playerTray(true);
                });
            }
        });
        return (
                <View style={{ flex: 1 }}>
                    <View>
                        <StatusBar 
                            backgroundColor={backgroundColor}
                        />
                    </View>
                    <Router backgroundColor={backgroundColor} />
                    <PlayerTray />
                </View>
        );
    }   
}

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
        listType: state.listType,
    };
};

export default connect(mapStateToProps, Act)(App);
