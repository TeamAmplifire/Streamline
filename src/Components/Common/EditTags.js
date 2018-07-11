import React, { Component } from 'react';
import { 
    View,
    Text,
    Modal
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './CardSection';
import { Input } from './Input';
import { BorderlessButton } from './BorderlessButton';
import * as actions from '../../Actions';
import { backgroundColor } from '../../Values/colors';

class EditTags extends Component {
    state = {
        songName: '',
        artistName: '',
        albumName: '',
        visibilty: true
    }

    render() {
        return (
            <Modal
                visible={this.props.visible && this.state.visibilty}
                transparent
                animationType="slide"
                onRequestClose={() => {}}
            >
                <View style={styles.containerStyle}>
                    <CardSection>
                        <Input 
                            label="Song Name"
                            placeholder="song"
                            value={this.state.songName}
                            onChangeText={(text) => { 
                                this.setState({ songName: text });
                            }}
                        />
                    </CardSection>

                    <CardSection>
                        <Input 
                            label="Artist Name"
                            placeholder="artist"
                            value={this.state.artistName}
                            onChangeText={(text) => { 
                                this.setState({ artistName: text });
                            }}
                        />
                    </CardSection>

                    <CardSection>
                        <Input 
                            label="Album Name"
                            placeholder="album"
                            value={this.state.albumName}
                            onChangeText={(text) => { 
                                this.setState({ albumName: text });
                            }}
                        />
                    </CardSection>

                    <View style={styles.buttonContainerStyle}>
                            <BorderlessButton onPress={this.props.onDiscard}> 
                                Discard
                            </BorderlessButton>

                            <BorderlessButton 
                                onPress={() => {
                                    this.props.editSongInfoWithID(this.state.songName, 
                                    this.state.albumName, 
                                    this.state.artistName, 
                                    this.props.item.songID, 
                                    this.props.item.fullPath);
                                    this.setState({ visibilty: false });
                                }}
                            >
                                Save
                            </BorderlessButton>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = {
    cardSelectionStyle: {
        justifyContent: 'center'
    },

    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },

    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    },

    buttonContainerStyle: {
        backgroundColor,
        height: 60, 
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
};

export default connect(null, actions)(EditTags);