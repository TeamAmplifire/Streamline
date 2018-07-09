import React, { Component } from 'react';
import { 
    Text,
    TouchableOpacity, 
    View,
    ToastAndroid,
    } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './Common';
import * as Act from '../Actions';
import { onBackgroundColor, backgroundColor } from '../Values/colors';
import { BorderlessButton } from './Common/BorderlessButton';
import ConfirmationModal from './Common/ConfirmationModal';
import EditTagsModal from './Common/EditTagsModal';

class ListItem extends Component {
    state = { 
        isExpanded: false, 
        showDeleteConfirmation: false,  
        showEditTags: false
    };

    onConfirmDelete() {
        this.props.deleteSongWithID(this.props.item.songID, this.props.item.fullpath);
        this.setState({ showDeleteConfirmation: false });
    }

    onCancelDelete() {
        this.setState({ showDeleteConfirmation: false });
    }

    onCancelEdit() {
        this.setState({ showEditTags: false });
    }

    renderMenu() {
        if (this.state.isExpanded) {
            return ( 
                <View style={styles.containerStyle}>
                    <BorderlessButton>PLAY</BorderlessButton>
                    <BorderlessButton
                        onPress={() => {
                            
                        }}
                    >
                        ADD TO PLAYLIST
                    </BorderlessButton>
                    <BorderlessButton
                        onPress={() => {
                            this.setState({ showEditTags: true });
                        }}
                    >
                        RENAME
                    </BorderlessButton>
                    <BorderlessButton 
                        onPress={() => {
                            this.setState({ showDeleteConfirmation: true });
                        }}
                    >
                        DELETE
                    </BorderlessButton>
                </View>
            );
        }
    }

    renderSongItem() {
        return (
            <TouchableOpacity 
                style={styles.containerStyle}
                
                onLongPress={() => {
                    ToastAndroid.show('LONG PRESS!', ToastAndroid.SHORT);
                    this.setState({ isExpanded: !this.state.isExpanded });
                }}
                onPress={() => {
                    this.props.selectSong(this.props.item.songID);
                    this.props.getArtworkForSongWithID(this.props.item.songID);
                    Actions.playerScreen({ index: this.props.index });
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

                    <ConfirmationModal
                        visible={this.state.showDeleteConfirmation}
                        onAccept={this.onConfirmDelete.bind(this)}
                        onDecline={this.onCancelDelete.bind(this)}
                    >
                        Are you sure you want to delete this?
                    </ConfirmationModal>

                    <EditTagsModal
                        item={this.props.item}
                        visible={this.state.showEditTags}
                        onCancel={this.onCancelEdit.bind(this)}
                    />
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

const mapStateToProps = (state) => {
    return {
        songs: state.songs
    };
};

export default connect(mapStateToProps, Act)(ListItem);
