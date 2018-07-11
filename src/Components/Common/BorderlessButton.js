import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { onBackgroundColor, accentColor } from '../../Values/colors';

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
        alignSelf: 'center',
        marginLeft: 12,
        marginRight: 12
    },
    textStyle: {
        alignSelf: 'stretch',
        textAlign: 'center',
        color: accentColor,
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        paddingTop: 10,
        paddingBottom: 10
    }
};

export { BorderlessButton };
