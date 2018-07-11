import React, { Component } from 'react';
import { 
    View,
    TouchableOpacity, 
    Text,     
    ImageBackground,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import { SquareButton } from './Common';
import { playIcon, pauseIcon } from '../Drawables/icons';
import { accentColor } from '../Values/colors';

class PlayerTray extends Component {
    state = { iconToggle: true };

    renderIcon() {
        if (this.state.iconToggle) {
            return pauseIcon;
        }
        return playIcon;
    }

    render() {
        if (this.props.selectedSong.songID !== null) {
            return (
                <View style={styles.containerStyle}>
                    <ImageBackground
                        source={{ isStatic: true, uri: this.props.selectedSongArtwork }} 
                        style={styles.imageStyle}
                    />
                    <TouchableOpacity>
                        <View>
                            <Text>{this.props.selectedSong.songName}</Text>
                            <Text>{this.props.selectedSong.albumName}</Text>
                        </View>
                    </TouchableOpacity>
                    <SquareButton
                        onPress={() => {
                                TrackPlayer.getState().then((playBackState) => {
                                    if (playBackState === TrackPlayer.STATE_PLAYING || playBackState === 3) {
                                        this.setState({ iconToggle: false });
                                        TrackPlayer.pause();    
                                    }
                                    else {
                                        this.setState({ iconToggle: true });
                                        TrackPlayer.play();
                                    }
                                });
                            }
                        }
                        image={this.renderIcon()} 
                        style={{ height: 20, width: 20 }}
                    />
                </View>
            );
        }

        return <View />;
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'row',
        borderTopWidth: 2,
        borderTopColor: accentColor,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: Dimensions.get('screen').height * 0.1
    },

    imageStyle: {
        height: Dimensions.get('screen').height * 0.1,
        width: Dimensions.get('screen').height * 0.1,            
    },

    buttonStyle: {
        alignSelf: 'flex-end'
    }
};

const mapStateToProps = (state) => {
    return {
        selectedSong: state.selectedSong,
        selectedSongArtwork: state.selectedSongArtwork,        
    };
};

export default connect(mapStateToProps, null)(PlayerTray);
