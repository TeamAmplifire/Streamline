import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from './Common';
import { backgroundColor } from '../Values/colors';

class Search extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor }}>
                <Header headerText='Search' />
            </View>
        );
    }
}
export default Search;
