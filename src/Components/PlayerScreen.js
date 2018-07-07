import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Image,
} from 'react-native';
import { onBackgroundColor, primaryColor, backgroundColor } from '../Values/colors';

class PlayerScreen extends Component {
    render() {
        return (
            <View>
                <View style={styles.albumArtContainerStyle}>
                    <Image
                        source={require('../Drawables/images/placeholder_cover.png')} 
                        style={styles.albumArtStyle}
                    />
                </View>
                <Text style={styles.titleStyle} numberOfLines={1}>
                    Song Name
                </Text>

                <Text style={styles.subtitleStyle} numberOfLines={1}>
                    Artist Name  •  Album Name
                </Text>
            </View>
        );
    }
}

const styles = {
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
    }

};

export default PlayerScreen;
