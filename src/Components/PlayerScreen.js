import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ImageBackground,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { connect } from 'react-redux';
import { onBackgroundColor, backgroundColor } from '../Values/colors';
import { SquareButton } from './Common';
import { playIcon, prevIcon, nextIcon } from '../Drawables/icons';

class PlayerScreen extends Component {
    state = {
        currentSong: {
            songID: null,
            songName: null,
            albumName: null,
            artistName: null,
            fullpath: null,
        }
    };

    componentWillMount() {
        this.setState({ currentSong: this.props.selectedSong });
        TrackPlayer.setupPlayer({}).then(() => {
            TrackPlayer.updateOptions({
                capabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_SEEK_TO,
                    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
                ]
            });
        });
    }

    async componentWillReceiveProps(nextProps) {
        TrackPlayer.reset();
        console.log(nextProps);
        this.setState({ currentSong: nextProps.selectedSong });
        let uri = 'file://' + nextProps.selectedSong.fullPath;
        console.log(uri);
        await TrackPlayer.add([{
            id: nextProps.selectedSong.songID,
            url: uri,
            title: nextProps.selectedSong.songName,
            artist: nextProps.selectedSong.artistName,
            artwork: nextProps.selectedSongArtwork
        }, null]);
        TrackPlayer.play();
        TrackPlayer.add([this.props.songs, null]);
        console.log(TrackPlayer.getState(), uri);
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <View style={styles.albumArtContainerStyle}>
                    <ImageBackground
                        source={{ isStatic: true, uri: this.props.selectedSongArtwork }} 
                        style={styles.albumArtStyle}
                    />
                </View>
                <Text style={styles.titleStyle} numberOfLines={1}>
                    {this.state.currentSong.songName}
                </Text>

                <Text style={styles.subtitleStyle} numberOfLines={1}>
                    {this.state.currentSong.artistName}  •  {this.state.currentSong.albumName}
                </Text>

                <View style={styles.buttonContainerStyle}>
                    <SquareButton image={prevIcon} />
                    <SquareButton image={playIcon} style={{ width: 45, height: 45 }} />
                    <SquareButton image={nextIcon} />
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
        borderWidth: 3,
        borderColor: onBackgroundColor,
    },

    titleStyle: {
        fontSize: 20,
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
        fontSize: 18,
        paddingLeft: 24,
        paddingRight: 24,
        alignSelf: 'stretch',
        textAlign: 'center',
        color: onBackgroundColor,
        fontFamily: 'Montserrat-Regular'
    },

    buttonContainerStyle: {
        padding: 16,
        backgroundColor,
        justifyContent: 'center',
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

export default connect(mapStateToProps)(PlayerScreen);
