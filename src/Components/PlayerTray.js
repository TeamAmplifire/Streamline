import React, { Component } from 'react';
import { 
    View,
    TouchableOpacity,      
    ImageBackground,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import { Actions } from 'react-native-router-flux';
import MarqueeText from 'react-native-marquee';
import { SquareButton } from './Common';
import { playIcon, pauseIcon } from '../Drawables/icons';
import { accentColor, onBackgroundColor, backgroundColorDark } from '../Values/colors';

const defaultAlbumArt = require('../Drawables/images/placeholder_cover.png');

class PlayerTray extends Component {
    state = { iconToggle: true };

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
        if (this.props.showHidePlayerTray === true) {
            return (
                <View style={styles.containerStyle}>
                    <ImageBackground
                        source={this.renderAlbumArt()} 
                        style={styles.imageStyle}
                    />
                    <TouchableOpacity style={styles.textContainerStyle} onPress={() => {Actions.playerScreen({ item: this.props.selectedSong })}} >
                        <MarqueeText
                            style={styles.titleTextStyle}
                            marqueeOnStart
                            loop
                            marqueeDelay={1000}
                            marqueeResetDelay={1000}
                        >
                            {this.props.selectedSong.songName}
                        </MarqueeText>
                        
                        <MarqueeText
                            style={styles.subtitleTextStyle}
                            marqueeOnStart
                            loop
                            marqueeDelay={1000}
                            marqueeResetDelay={1000}
                        >
                            {this.props.selectedSong.albumName}
                        </MarqueeText>                 
                    </TouchableOpacity>

                    <View style={styles.buttonContainerStyle}>
                        <SquareButton
                            onPress={() => {
                                    TrackPlayer.getState().then((playBackState) => {
                                        if (playBackState === TrackPlayer.STATE_PLAYING || playBackState === 3) {
                                            this.setState({ iconToggle: false });
                                            TrackPlayer.pause();    
                                        } else {
                                            this.setState({ iconToggle: true });
                                            TrackPlayer.play();
                                        }
                                    });
                                }
                            }
                            image={this.renderIcon()} 
                            style={{ height: 25, width: 25 }}
                        />
                    </View>
                </View>
            );
        }

        return <View />;
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: backgroundColorDark,
        borderTopWidth: 2,
        borderTopColor: accentColor,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: Dimensions.get('screen').height * 0.105
    },

    imageStyle: {
        height: Dimensions.get('screen').height * 0.1,
        width: Dimensions.get('screen').height * 0.1,            
    },

    textContainerStyle: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingLeft: 12,
        paddingRight: 12
    },

    titleTextStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        color: onBackgroundColor,
       
    },

    subtitleTextStyle: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        color: onBackgroundColor,
 
    },
    
    buttonContainerStyle: {
        paddingRight: 18
    }
};

const mapStateToProps = (state) => {
    return {
        selectedSong: state.selectedSong,
        selectedSongArtwork: state.selectedSongArtwork,        
        showHidePlayerTray: state.showHidePlayerTray
    };
};

export default connect(mapStateToProps, null)(PlayerTray);
