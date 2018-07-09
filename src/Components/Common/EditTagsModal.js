import React, { Component } from 'react';
import {
    View,
    Modal
} from 'react-native';
import { connect } from 'react-redux';
import Input from './Input';
import CardSection from './CardSection';
import BorderlessButton from './BorderlessButton';
import * as actions from '../../Actions';

class EditTagsModal extends Component {
    state = { songName: '', albumName: '', artistName: '' };

    componentWillMount() {
        this.setState({ 
            songName: this.props.item.songName, 
            albumName: this.props.item.albumName, 
            artistName: this.props.item.artistName 
        });
    }
    
    changeTags() { 
        this.props.editSongInfoWithID(
            this.state.songName, 
            this.state.albumName, 
            this.state.artistName, 
            this.props.item.songID, 
            this.props.item.fullpath
        );
    }

    render() {
        console.log(this.state.songName);
        return (
            <Modal
                visible={this.props.visible}
                transparent
                animationType="slide"
                onRequestClose={() => {}}
            >
                <View>
                    <CardSection>
                        <Input
                            label="Song Name"
                            placeholder="song name"
                            value={this.state.songName}
                            onChangeText={songName => this.setState({ songName })}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            label="Artist Name"
                            placeholder="song name"
                            value={this.state.artistName}
                            onChangeText={artistName => this.setState({ artistName })}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            label="Album Name"
                            placeholder="song name"
                            value={this.state.albumName}
                            onChangeText={albumName => this.setState({ albumName })}
                        />
                    </CardSection>
                    <CardSection>
                        <BorderlessButton onPress={this.props.onCancel}>Discard</BorderlessButton>
                        <BorderlessButton onPress={this.changeTags.bind(this)}>Save</BorderlessButton>
                    </CardSection>
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
    }
};

export default connect(null, actions)(EditTagsModal);
