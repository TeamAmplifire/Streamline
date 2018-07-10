import React from 'react';
import { TextInput, Text, View } from 'react-native';
import { onBackgroundColor, accentColor, onBackgroundColorFaded, backgroundColorLight } from '../../Values/colors';

const HeaderTextInput = ({ value, onChangeText, placeholder, secureTextEntry }) => {
    return (
        <View style={styles.containerStyle}>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                placeholderTextColor={onBackgroundColorFaded}
                autoCorrect={false} 
                style={styles.inputStyle}
                value={value}
                onChangeText={onChangeText}
                underlineColorAndroid='rgba(0,0,0,0)'
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        fontFamily: 'Montserrat-Medium',
        color: onBackgroundColor,
        paddingLeft: 12,
        paddingRight: 12,
        fontSize: 18,
        flex: 1
    },
    containerStyle: {
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: backgroundColorLight,
        borderBottomColor: accentColor,
        borderBottomWidth: 2
    }
};

export { HeaderTextInput };
