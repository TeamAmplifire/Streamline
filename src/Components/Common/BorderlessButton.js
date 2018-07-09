import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { onBackgroundColor } from '../../Values/colors';

const BorderlessButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
            <Text style={styles.textStyle}>
              {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        marginLeft: 5,
        marginRight: 5
    },
    textStyle: {
        alignSelf: 'stretch',
        textAlign: 'left',
        color: onBackgroundColor,
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        paddingTop: 10,
        paddingBottom: 10
    }
};

export { BorderlessButton };
