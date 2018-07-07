import React, { PureComponent } from 'react';
import { 
    Text,
    TouchableWithoutFeedback, 
    View,
    LayoutAnimation,
    Platform,
    UIManager
    } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Card } from './Common';
import * as Actions from '../Actions';
import { onBackgroundColor, backgroundColor } from '../Values/colors';

class ListItem extends PureComponent {
    componentWillMount() {
            if (Platform.OS === 'android') {
                UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
            }
    }

    componentDidMount() {
        LayoutAnimation.spring();
    }
    
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
        fontSize: 14,
        paddingLeft: 8,
        paddingRight: 122,
        paddingTop: 12,
        paddingBottom: 0,
        color: onBackgroundColor,
        fontFamily: 'Montserrat-SemiBold'
    },

    leftTextStyle: {
        flex: 1,
        fontSize: 12,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 2,
        paddingBottom: 12,
        color: onBackgroundColor,
        fontFamily: 'Montserrat-Regular'
    },

    rightTextStyle: {
        flex: 1,
        fontSize: 12,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 2,
        paddingBottom: 12,
        color: onBackgroundColor,
        alignSelf: 'stretch',
        textAlign: 'right',
        fontFamily: 'Montserrat-Regular'
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
