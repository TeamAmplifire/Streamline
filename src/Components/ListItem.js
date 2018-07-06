import React, { Component } from 'react';
import { 
    Text, 
    TouchableWithoutFeedback, 
    View
    } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './Common';
import * as Actions from '../Actions';
import { onBackgroundColor, backgroundColor } from '../Values/colors';

class ListItem extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.props.selectSong(this.props.item.songID)}>
                <View style={styles.containerStyle}>
                    <CardSection>
                        <Text style={styles.titleStyle} numberOfLines={1}>
                            {this.props.item.songName}
                        </Text>
                    </CardSection>

                    <CardSection>
                        <Text style={styles.leftTextStyle} numberOfLines={1}>
                            {this.props.item.artistName}
                        </Text>

                         <Text style={styles.rightTextStyle} numberOfLines={1}>
                            {this.props.item.albumName}
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 16,
        paddingLeft: 16,
        paddingRight: 72,
        paddingTop: 8,
        paddingBottom: 0,
        color: onBackgroundColor,
        fontWeight: 'bold'
    },

    leftTextStyle: {
        flex: 1,
        fontSize: 14,
        paddingLeft: 16,
        paddingRight: 72,
        paddingTop: 4,
        paddingBottom: 8,
        color: onBackgroundColor
        //Font-Regular
    },

    rightTextStyle: {
        flex: 1,
        fontSize: 14,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 4,
        paddingBottom: 8,
        color: onBackgroundColor,
        alignSelf: 'stretch',
        textAlign: 'right'
        //Font-Regular
    },

    containerStyle: {
        backgroundColor
    }
};


// const mapStateToProps = (state, ownProps) => {
//     const expand = state.selectedLibraryId === ownProps.item.id;

//     return { expand };
// };

export default connect(null, Actions)(ListItem);
