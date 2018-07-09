import React, { Component } from 'react';
import { 
    View,
    TouchableOpacity, 
    Text,     
    ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import { SquareButton } from './Common';
import { playIcon } from '../Drawables/icons';

class PlayerTray extends Component {
    render() {
        return (
            <View>
               <ImageBackground
                    source={{ isStatic: true, uri: this.props.selectedSongArtwork}} 
                    style={styles.containerStyle}
                />
                <TouchableOpacity>
                    <View>
                        <Text>{this.props.selectedSong.songName}</Text>
                        <Text>{this.props.selectedSong.artistName}</Text>
                    </View>
                </TouchableOpacity>
                <SquareButton
                    image={playIcon} style={{ height: 20, width: 20 }}
                />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        
    }
};

mapStateToProps = (state) => {
    return {
        selectedSong: state.selectedSong,
        selectedSongArtwork: state.selectedSongArtwork,        
    };
}

export default connect(maptStateToProps, null)(PlayerTray);