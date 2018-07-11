import React, { Component } from 'react';
import { 
    Text,
    TouchableOpacity, 
    View,
    ToastAndroid,
    } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
// import RNFS from 'react-native-fs';
import { CardSection } from './Common';
import * as Act from '../Actions';
import { onBackgroundColor, backgroundColor } from '../Values/colors';
import { BorderlessButton } from './Common/BorderlessButton';
import ConfirmationModal from './Common/ConfirmationModal';
import EditTags from './Common/EditTags';
import PlaylistListModal from './Common/PlaylistListModal';
import { 
    ALL_SONGS,
    RECENTLY_ADDED_SONGS,
    PLAYLIST_WITH_ID
 } from '../Values/Types';

class ListItem extends Component {
    state = { 
        isExpanded: false, 
        showDeleteConfirmation: false,  
        showEditTags: false,
        showPlaylistList: false
    };

    onConfirmDelete() {
        this.props.deleteSongWithID(this.props.item.songID, this.props.item.fullPath);
        this.setState({ showDeleteConfirmation: false });
        this.props.refresh();
    }

    onCancelDelete() {
        this.setState({ showDeleteConfirmation: false });
    }

    onCancelEdit() {
        this.setState({ showEditTags: false });
    }

    async removeFromPlaylist() {
        await this.props.deleteSongFromPlaylistWithID(this.props.selectedPlaylistID, this.props.item.songID);
        this.props.refresh();
    }

    renderMenu() {
        switch (this.props.listType) {
            case (ALL_SONGS || RECENTLY_ADDED_SONGS):
                if (this.state.isExpanded) {
                    return ( 
                        <View style={styles.menuStyle}>
                            <BorderlessButton
                                onPress={() => {
                                    this.props.selectSong(this.props.item.songID);
                                    this.props.getArtworkForSongWithID(this.props.item.songID);
                                    Actions.playerScreen({ listType: this.props.listType, item: this.props.item, setList: true });
                                }}
                            >
                                Play
                            </BorderlessButton>
                            
                            <BorderlessButton
                                onPress={() => {
                                    this.setState({ showPlaylistList: true });
                                }}
                            >
                                Add to playlist
                            </BorderlessButton>
        
                            <BorderlessButton
                                onPress={() => {
                                    this.setState({ showEditTags: true });
                                }}
                            >
                                Edit tags
                            </BorderlessButton>
        
                            <BorderlessButton 
                                onPress={() => {
                                    this.setState({ showDeleteConfirmation: true });
                                }}
                            >
                                Delete
                            </BorderlessButton>
                        </View>
                    );
                }
                break;
            case PLAYLIST_WITH_ID:
                if (this.state.isExpanded) {
                    return ( 
                        <View style={styles.containerStyle}>
                            <BorderlessButton
                                onPress={() => {
                                    this.props.selectSong(this.props.item.songID);
                                    this.props.getArtworkForSongWithID(this.props.item.songID);
                                    Actions.playerScreen({ listType: this.props.listType, item: this.props.item, setList: true });
                                }}
                            >
                                PLAY
                            </BorderlessButton>
        
                            <BorderlessButton 
                                onPress={this.removeFromPlaylist.bind(this)}
                            >
                                REMOVE FROM PLAYLIST
                            </BorderlessButton>
                        </View>
                    );
                }
                break;
            default:
        }
    }

    renderSongItem() {
        return (
            <TouchableOpacity 
                style={styles.containerStyle}
                
                onLongPress={() => {
                    this.setState({ isExpanded: !this.state.isExpanded });
                }}
                onPress={() => {
                    this.props.selectSong(this.props.item.songID);
                    this.props.getArtworkForSongWithID(this.props.item.songID);
                    Actions.playerScreen({ listType: this.props.listType, item: this.props.item, setList: true });
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

                    <EditTags 
                        item={this.props.item}
                        visible={this.state.showEditTags}
                        onDiscard={() => {
                            this.setState({ showEditTags: false });
                        }}
                    />

                    <PlaylistListModal
                        visible={this.state.showPlaylistList}
                        item={this.props.item}
                        onDiscard={() => {
                            this.setState({ showPlaylistList: false });
                        }}
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
        paddingLeft: 12,
        paddingRight: 12
    },

    menuStyle: {
        borderBottomWidth: 2,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
};

const mapStateToProps = (state) => {
    return {
        paddingLeft: 16,
        songs: state.songs,
        selectedPlaylistID: state.selectedPlaylistID
    };
};

export default connect(mapStateToProps, Act)(ListItem);
