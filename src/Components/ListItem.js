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
    render() {
        console.log('ListItem');
        return (
            <TouchableWithoutFeedback onPress={() => this.props.selectSong(this.props.item.songID)}>
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle}>
                            {this.props.item.songName}
                        </Text>
                        <Text>jhsdc</Text>
                    </CardSection>
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
