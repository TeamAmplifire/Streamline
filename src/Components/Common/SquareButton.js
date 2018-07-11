import React, { Component } from 'react';
import { 
    TouchableOpacity,
    Image
} from 'react-native';
import { onBackgroundColor } from '../../Values/colors';

class SquareButton extends Component {
    render() {
        return (
                <TouchableOpacity style={styles.buttonStyle} onPress={this.props.onPress}>
                    <Image
                        style={[styles.imageStyle, this.props.style]}
                        source={this.props.image}
                    />
                </TouchableOpacity>
        );
    }
}

const styles = {
    buttonStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        alignSelf: 'center',
    },

    imageStyle: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
        tintColor: onBackgroundColor,
        alignSelf: 'center',
    }
};

export { SquareButton };
