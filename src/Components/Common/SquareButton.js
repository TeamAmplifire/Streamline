import React, { Component } from 'react';
import { 
    TouchableOpacity,
    View, 
    Image
} from 'react-native';
import { onBackgroundColor } from '../../Values/colors';

class SquareButton extends Component {
    render() {
        return (
                <TouchableOpacity style={styles.buttonStyle} onPress={this.props.onPress} >
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
        padding: 36,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        alignSelf: 'center',
    },

    imageStyle: {
        resizeMode: 'contain',
        width: 30,
        height: 30,
        padding: 10,
        tintColor: onBackgroundColor,
        //borderWidth: 3,
        //borderColor: onBackgroundColor,
        alignSelf: 'center',
    }
};

export { SquareButton };
