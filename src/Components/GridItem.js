import React, { Component } from 'react';
import { 
    View,
    UIManager,
    Platform,
    TouchableWithoutFeedback,
    LayoutAnimation,
    Text
    } from 'react-native';

class GridItem extends Component {
    componentWillMount() {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentDidMount() {
        //LayoutAnimation.spring();
    }

    render() {
        return (
            <View>
                <Text style={{ backgroundColor: '#fff' }} >{this.props.item.name}</Text>
            </View>
        );
    }
}

export default GridItem;
