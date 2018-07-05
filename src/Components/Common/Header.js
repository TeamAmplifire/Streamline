import React from 'react';
import { Text, View } from 'react-native';

const Header = ({ headerText }) => {
    const { textStyle, viewStyle } = styles;
return (
        <View style={viewStyle}>
            <Text style={textStyle}>
                {headerText}
            </Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#b8a3cd',
        justifyContent: 'center',
        alignItems: 'center',
        height: 65,
        paddingTop: 5,
        shadowColor: '#f8f8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        elevation: 16,
        position: 'relative'
    },
    textStyle: {
            fontSize: 20
    }
};

export { Header };
