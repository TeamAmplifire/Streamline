import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {  
    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    viewStyle: {  
        backgroundColor: '#2c3e50',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        paddingTop: 2,
        paddingBottom: 2,
        elevation: 4, 
        position: 'relative'
    },
    textStyle: {
        fontSize: 24,
        color: '#ecf0f1',
        fontWeight: 'bold'
    }
};

export default Header;
