import React, { Component } from 'react';
import {
    View,
    Modal
} from 'react-native';
import Input from './Input';
import CardSection from './CardSection';
import BorderlessButton from './BorderlessButton';

class SingleInputModal extends Component {
    state = { playlistName: '' };

    componentWillMount() {
        this.setState({ songName: this.props.songName, albumName: this.props.albumName, artistName: this.props.artistName });
    }
    
    render() {
        console.log(this.state.songName);
        return (
            <Modal
                visible
                transparent
                animationType="slide"
                onRequestClose={()=>{}}>

                <View>
                    <CardSection>
                        <Input
                            label="Playlist Name"
                            placeholder="playlist..."
                            value={this.state.playlistName}
                            onChangeText={playlistName => this.setState({ playlistName })}
                        />
                    </CardSection>
                    <CardSection>
                        <BorderlessButton>Discard</BorderlessButton>
                        <BorderlessButton>Save</BorderlessButton>
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

export default SingleInputModal;
