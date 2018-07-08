import React, { Component } from 'react';
import { 
    View,
    UIManager,
    Platform,
    TouchableOpacity,
    Text,
    ImageBackground,
    Dimensions
} from 'react-native';


class GridItem extends Component {
    componentWillMount() {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    renderItem() {
        if (this.props.isALbumList) {
            const albumArt = this.props.item.albumArt;
            console.log(albumArt);
            return (
                <ImageBackground
                    source={{ isStatic: true, uri: albumArt }} 
                    style={styles.containerStyle}
                >
                    <Text style={styles.textStyle} >
                        {this.props.item.name}
                    </Text>
                </ImageBackground>
            );
        }

        return (
            <Text style={styles.textStyle} >{this.props.item.name}</Text>
        );        
    }

    render() {
        return (
            <TouchableOpacity>
                <View>
                    {this.renderItem()}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = {
    textStyle: {
        fontSize: 20,
        color: '#fff',
        flex: 1,
        justifyContent: 'center',
    },
    containerStyle: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5,
        flexDirection: 'row',
        alignItems: 'flex-end',
    }
};

export default GridItem;
