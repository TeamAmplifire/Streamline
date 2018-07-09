import React, { Component } from 'react';
import { 
    Text,
    TouchableOpacity, 
    View,
    Animated,
    ToastAndroid,
    LayoutAnimation,
    UIManager,
    Platform
    } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import TrackPlayer from 'react-native-track-player';
import { CardSection } from './Common';
import * as Act from '../Actions';
import { onBackgroundColor, backgroundColor } from '../Values/colors';
import { BorderlessButton } from './Common/BorderlessButton';

class ListItem extends Component {
    state = { isExpanded: false };

    componentWillMount() {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    
    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    renderMenu() {
        if (this.state.isExpanded) {
            return ( 
                <View style={styles.containerStyle}>
                    <BorderlessButton>PLAY</BorderlessButton>
                    <BorderlessButton>ENQUEUE</BorderlessButton>
                    <BorderlessButton>ADD TO PLAYLIST</BorderlessButton>
                    <BorderlessButton>RENAME</BorderlessButton>
                    <BorderlessButton>DELETE</BorderlessButton>
                </View>
            );
        }
    }

    renderSongItem() {
        return (
            <TouchableOpacity 
                style={styles.containerStyle}
                
                onLongPress={() => {
                    ToastAndroid.show("LONG PRESS!", ToastAndroid.SHORT);
                    this.setState({ isExpanded: !this.state.isExpanded });
                }}
                onPress={() => {
                    this.props.selectSong(this.props.item.songID);
                    this.props.getArtworkForSongWithID(this.props.item.songID);
                    TrackPlayer.remove(TrackPlayer.getQueue());
                    Actions.playerScreen();
                }}
            >
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
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <TouchableOpacity>
                <View>
                    {this.renderSongItem()}
                    {this.renderMenu()}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 14,
        paddingRight: 122,
        paddingTop: 12,
        paddingBottom: 0,
        color: onBackgroundColor,
        fontFamily: 'Montserrat-SemiBold'
    },

    leftTextStyle: {
        flex: 1,
        fontSize: 12,
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
        paddingTop: 2,
        paddingBottom: 12,
        color: onBackgroundColor,
        alignSelf: 'stretch',
        textAlign: 'right',
        fontFamily: 'Montserrat-Regular'
    },

    containerStyle: {
        backgroundColor,
        paddingLeft: 8,
        paddingRight: 8
    }
};

export default connect(null, Act)(ListItem);
