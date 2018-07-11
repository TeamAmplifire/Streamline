import React, { Component } from 'react';
import { 
    View,
    UIManager,
    Platform,
    TouchableOpacity,
    Text,
    ImageBackground,
    Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as Act from '../Actions';
import { 
    PLAYLIST_WITH_ID,
    ALBUM_WITH_ID,
    ARTIST_WITH_ID,
    ALBUM_LIST,
    PLAYLIST_LIST,
    ARTIST_LIST,
 } from '../Values/Types';
import { onBackgroundColor, backgroundColor, accentColor } from '../Values/colors';

const defaultAlbumArt = require('../Drawables/images/placeholder_cover.png');

class GridItem extends Component {
    componentWillMount() {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    renderAlbumArt() {
        const albumArt = this.props.item.albumArt;
        if (albumArt === 'file://null') {
            return defaultAlbumArt;  
        }
        return { isStatic: true, uri: albumArt };
    }

    renderItem() {
        console.log(this.props.item);
        if (this.props.listType === ALBUM_LIST) {
            return (
                <View style={styles.containerStyle}>
                    <ImageBackground
                        source={this.renderAlbumArt()}
                        style={styles.albumArtStyle}
                    />

                    <Text style={styles.textStyle} numberOfLines={1}>
                        {this.props.item.name}
                    </Text>
                </View>
            );
        }

        const name = this.props.item.name;
        return (
            <View>
                <View style={styles.thumbnailLetterStyle}>
                    <Text style={styles.singleLetterStyle}>
                        {name.substr(0, 2)}
                    </Text> 
                </View>
                <Text style={styles.textStyle} numberOfLines={1}>
                    {this.props.item.name}
                </Text>
            </View>
        );        
    }

    render() {
        console.log(this.props.item);
        const { name, id } = this.props.item;
        return (
            <TouchableOpacity 
                onPress={
                    () => {
                        switch (this.props.listType) {
                            case PLAYLIST_LIST:
                                this.props.selectPlaylist(id);
                                Actions.playlistSongList({ listType: PLAYLIST_WITH_ID, headerText: name });
                                break;
                            case ALBUM_LIST:
                                this.props.selectAlbum(id);
                                Actions.albumSongList({ listType: ALBUM_WITH_ID, headerText: name });
                                break;
                            case ARTIST_LIST:
                            this.props.selectArtist(id);
                                Actions.artistSongList({ listType: ARTIST_WITH_ID, headerText: name });
                                break;
                            default:
                        }
                    }
                }
            >
                <View>
                    {this.renderItem()}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = {
    textStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        color: onBackgroundColor,
        flex: 1,
        paddingTop: 4,
        paddingBottom: 8
    },
    containerStyle: {
        width: Dimensions.get('window').width * 0.45,
        flex: 1,
        flexDirection: 'column',
    },

    albumArtStyle: {
        aspectRatio: 0.99,
        borderBottomColor: accentColor,
        borderBottomWidth: 2
    },

    thumbnailLetterStyle: {
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: accentColor,
        justifyContent: 'center',
        alignItems: 'center',
    },

    singleLetterStyle: {
        fontFamily: 'Montserrat-Bold',
        color: '#fff',
        fontSize: 100,
    }
};

export default connect(null, Act)(GridItem);
