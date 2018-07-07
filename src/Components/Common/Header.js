import React, { Component } from 'react';
import { Text,
         View,
         Platform,
         UIManager,
         LayoutAnimation
} from 'react-native';
import { backgroundColor, primaryColor } from '../../Values/colors';

class Header extends Component {
    
    componentWillMount() {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        LayoutAnimation.easeInEaseOut();   
    }

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
        paddingBottom: 12,
        position: 'relative'
    },
    textStyle: {
            fontSize: 32,
            fontFamily: 'Montserrat-Bold',
            color: primaryColor
    }
};

export { Header };
