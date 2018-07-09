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
        currentSong: null
    }

    componentWillMount() {
        console.log(this.state);
        this.props.songs.filter((item) => {
            const check = item.songID === this.props.selectedSongID;
            if (check) {
                this.setState({ currentSong: item });
            }
            return check;
        });
    }

    render() {
        console.log(this.state);
        TrackPlayer.add([{
            id: 1,
            url: this.state.currentSong.fullpath,
            title: this.state.currentSong.songName,
            artist: this.state.currentSong.artistName,
            artwork: this.props.selectedSongArtwork
        }], null);
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
                    <SquareButton ImageBackground={prevIcon} />
                    <SquareButton ImageBackground={playIcon} style={{ width: 45, height: 45 }} />
                    <SquareButton ImageBackground={nextIcon} />
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
        selectedSongID: state.selectedSongID,
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
