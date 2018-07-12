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

export default connect(null, Act)(App);
