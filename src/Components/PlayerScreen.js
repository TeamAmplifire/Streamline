import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Image,
} from 'react-native';
import { onBackgroundColor, backgroundColor } from '../Values/colors';
import { SquareButton } from './Common';
// import imageSource from '../Drawables/images/placeholder_cover.png';
import { playIcon, prevIcon, nextIcon } from '../Drawables/icons';

class PlayerScreen extends Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <View style={styles.albumArtContainerStyle}>
                    <Image
                        source={this.props.track.albumArt} 
                        style={styles.albumArtStyle}
                    />
                </View>
                <Text style={styles.titleStyle} numberOfLines={1}>
                    Song Name
                </Text>

                <Text style={styles.subtitleStyle} numberOfLines={1}>
                    Artist Name  •  Album Name
                </Text>

                <View style={styles.buttonContainerStyle}>
                    <SquareButton image={prevIcon} />
                    <SquareButton image={playIcon} style={{ width: 45, height: 45 }}/>
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

export default PlayerScreen;
