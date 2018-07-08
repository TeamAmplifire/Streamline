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

class GridItem extends Component {
    componentWillMount() {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    renderItem() {
        console.log(this.props.listType);
        if (this.props.listType === ALBUM_LIST) {
            const albumArt = this.props.item.albumArt;
            return (
                <ImageBackground
                    source={{ isStatic: true, uri: albumArt }} 
                    style={styles.containerStyle}
                >
                    <Text style={styles.textStyle} >
                        {this.props.item.name}
                    </Text>
                </ImageBackground>
            );
        }
        return (
            <Text style={styles.textStyle} >{this.props.item.name}</Text>
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
        fontSize: 20,
        color: '#fff',
        flex: 1,
        justifyContent: 'center',
    },
    containerStyle: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5,
        flexDirection: 'row',
        alignItems: 'flex-end',
    }
};

export default connect(null, Act)(GridItem);
