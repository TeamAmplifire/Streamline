import React, { Component } from 'react';
import { Text,
         View,
} from 'react-native';
import { backgroundColor, primaryColor, accentColor, onBackgroundColor } from '../../Values/colors';

class Header extends Component {
    render() {
        const { textStyle, viewStyle } = styles;

        return (
            <View style={viewStyle}>
                <Text style={textStyle}>
                    {this.props.headerText}
                </Text>
            </View>
        );
    }
}

const styles = {
    viewStyle: {
        backgroundColor,
       
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 65,
        paddingTop: 5,
        paddingLeft: 8,
        position: 'relative'
    },
    textStyle: {
            fontSize: 26,
            fontFamily: 'Montserrat-Bold',
            color: onBackgroundColor,
            borderBottomWidth: 2,
            paddingBottom: 12,
            borderBottomColor: accentColor
    }
};

export { Header };
