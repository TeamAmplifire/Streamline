import React, { Component } from 'react';
import { 
    Text,
    TouchableOpacity, 
    View
    } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import TrackPlayer from 'react-native-track-player';
import { CardSection } from './Common';
import * as Act from '../Actions';
import { onBackgroundColor, backgroundColor } from '../Values/colors';

class ListItem extends Component {
    render() {
        return (
            <TouchableOpacity 
            onPress={() => {
                this.props.selectSong(this.props.item.songID);
                this.props.getArtworkForSongWithID(this.props.item.songID);
                TrackPlayer.remove(TrackPlayer.getQueue());
                Actions.playerScreen();
            }}
            >
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
            </TouchableOpacity>
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

export default connect(null, Act)(ListItem);
