import React, { Component } from 'react';
import { 
    Text, 
    TouchableWithoutFeedback, 
    View
    } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './Common';
import * as Actions from '../Actions';

class ListItem extends Component {
    renderTitle() {
        return (
            <CardSection>
                <Text style={styles.titleStyle}>{this.props.item.title}</Text>
            </CardSection>
        );
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.props.selectSong(this.props.item.id)}>
                <View>
                    {this.renderTitle()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    },
};

// const mapStateToProps = (state, ownProps) => {
//     const expand = state.selectedLibraryId === ownProps.item.id;

//     return { expand };
// };

export default connect(null, Actions)(ListItem);
