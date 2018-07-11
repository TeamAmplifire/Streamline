import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ImageBackground,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import _ from 'lodash';
import { connect } from 'react-redux';
import { onBackgroundColor, backgroundColor } from '../Values/colors';
import { SquareButton } from './Common';
import MyProgressBar from './ProgressBar';
import { playIcon, prevIcon, nextIcon, pauseIcon } from '../Drawables/icons';
import { 
    ALL_SONGS,
    RECENTLY_ADDED_SONGS,
    ALBUM_WITH_ID,
    ARTIST_WITH_ID,
    PLAYLIST_WITH_ID
 } from '../Values/Types';
 import * as Act from '../Actions';

const defaultAlbumArt = require('../Drawables/images/placeholder_cover.png');


class PlayerScreen extends Component {
    constructor(props) {
        super(props);
        if (props.setList !== undefined) {
            this.setPlayList(props.item.songID);
        }
    }
    
    state = {
        iconToggle: true,
    };
    
    onSongEnd() {
        const nextSong = this.getNextSong(this.props.selectedSong.songID);
        this.props.selectSong(nextSong.songID);
        this.props.getArtworkForSongWithID(nextSong.songID);
        this.setState(this.state);
    }

    async setPlayList(songID) {
        let list = [];
        switch (this.props.listType) {
            case ALL_SONGS:
                list = this.props.songs;
                break;
            case RECENTLY_ADDED_SONGS:
                list = this.props.recentlyAdded;
                break;
            case ALBUM_WITH_ID:
                list = this.props.selectedAlbumSongList;
                break;
            case ARTIST_WITH_ID:
                list = this.props.selectedArtistSongList;
                break;
            case PLAYLIST_WITH_ID:
                list = this.props.selectedPlaylistSongList;
                break;
            default:
        }
        const song = _.find(list, { songID });
        const index = list.indexOf(song);
        TrackPlayer.reset();
        for (let i = 0; i <= index; i++) {
            await TrackPlayer.add([{
                id: `${list[i].songID}`,
                url: `file://${list[i].fullPath}`,
                title: list[i].songName,
                artist: list[i].artistName,
                artwork: require('../Drawables/images/placeholder_cover.jpg')
            }]);
        }
        TrackPlayer.skip(`${songID}`);
        TrackPlayer.play();
        for (let i = index + 1; i < list.length; i++) {
            await TrackPlayer.add([{
                id: `${list[i].songID}`,
                url: `file://${list[i].fullPath}`,
                title: list[i].songName,
                artist: list[i].artistName,
                artwork: require('../Drawables/images/placeholder_cover.jpg')
            }]);
        }
    }

    getNextSong(songID) {
        let list = [];
        switch (this.props.listType) {
            case ALL_SONGS:
                list = this.props.songs;
                break;
            case RECENTLY_ADDED_SONGS:
                list = this.props.recentlyAdded;
                break;
            case ALBUM_WITH_ID:
                list = this.props.selectedAlbumSongList;
                break;
            case ARTIST_WITH_ID:
                list = this.props.selectedArtistSongList;
                break;
            case PLAYLIST_WITH_ID:
                list = this.props.selectedPlaylistSongList;
                break;
            default:
        }
        const song = _.find(list, { songID });
        const index = list.indexOf(song);
        return list[index + 1];
    }

    getPreviousSong(songID) {
        let list = [];
        switch (this.props.listType) {
            case ALL_SONGS:
                list = this.props.songs;
                break;
            case RECENTLY_ADDED_SONGS:
                list = this.props.recentlyAdded;
                break;
            case ALBUM_WITH_ID:
                list = this.props.selectedAlbumSongList;
                break;
            case ARTIST_WITH_ID:
                list = this.props.selectedArtistSongList;
                break;
            case PLAYLIST_WITH_ID:
                list = this.props.selectedPlaylistSongList;
                break;
            default:
        }
        const song = _.find(list, { songID });
        const index = list.indexOf(song);
        return list[index - 1];
    }

    renderIcon() {
        if (this.state.iconToggle) {
            return pauseIcon;
        }
        return playIcon;
    }

    renderAlbumArt() {
        const albumArt = this.props.selectedSongArtwork;
        if (albumArt === 'file://null') {
            return defaultAlbumArt;  
        }
        return { isStatic: true, uri: albumArt };
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <View style={styles.albumArtContainerStyle}>
                    <ImageBackground
                        source={this.renderAlbumArt()}
                        style={styles.albumArtStyle}
                    />
                </View>

                <MyProgressBar onEnd={this.onSongEnd.bind(this)} />

                <Text style={styles.titleStyle} numberOfLines={1}>
                    {this.props.selectedSong.songName}
                </Text>

                <Text style={styles.subtitleStyle} numberOfLines={1}>
                    {this.props.selectedSong.albumName}  •  {this.props.selectedSong.artistName}
                </Text>

                <View style={styles.buttonContainerStyle}>
                    <SquareButton 
                        image={prevIcon}
                        onPress={() => {
                            const nextSong = this.getPreviousSong(this.props.selectedSong.songID);
                            TrackPlayer.skipToPrevious();
                            this.props.selectSong(nextSong.songID);
                            this.props.getArtworkForSongWithID(nextSong.songID);
                        }} 
                    />
                    <SquareButton 
                    image={this.renderIcon()}
                    style={{ width: 35, height: 35 }}
                    onPress={() => {
                        TrackPlayer.getState()
                            .then((playBackState) => {
                                if (playBackState === TrackPlayer.STATE_PLAYING || playBackState === 3) {
                                    this.setState({ iconToggle: false });
                                    TrackPlayer.pause();    
                                } else {
                                    this.setState({ iconToggle: true });
                                    TrackPlayer.play();
                                }
                            });
                        }} 
                    />
                    
                    <SquareButton 
                    image={nextIcon}
                    onPress={() => {
                            const nextSong = this.getNextSong(this.props.selectedSong.songID);
                            TrackPlayer.skipToNext();
                            this.props.selectSong(nextSong.songID);
                            this.props.getArtworkForSongWithID(nextSong.songID);
                        }} 
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {

    },
    
    albumArtContainerStyle: {
        paddingTop: 40,
    },

    albumArtStyle: {
        width: 300, 
        height: 300, 
        alignSelf: 'center',
    
    },

    titleStyle: {
        fontSize: 16,
        paddingTop: 40,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 8,
        alignSelf: 'stretch',
        textAlign: 'center',
        color: onBackgroundColor,
        fontFamily: 'Montserrat-Bold'
    },

    subtitleStyle: {
        fontSize: 14,
        paddingLeft: 24,
        paddingRight: 24,
        alignSelf: 'stretch',
        textAlign: 'center',
        color: onBackgroundColor,
        fontFamily: 'Montserrat-Regular'
    },

    buttonContainerStyle: {
        paddingLeft: 70,
        paddingRight: 70,
        paddingTop: 50,
        paddingBottom: 30,
        backgroundColor,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};

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
        selectedSongArtwork: state.selectedSongArtwork,
    };
};

export default connect(mapStateToProps, Act)(PlayerScreen);
