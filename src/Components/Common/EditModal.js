import React, { Component } from 'react';
import {
    View,
    Text,
    Modal
} from 'react-native';
import Input from './Input';
import CardSection from './CardSection';

class EditModal extends Component {
    state = { songName: '', albumName: '', artistName: '' };

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
                            value={this.state.songName}
                            onChangeText={songName => this.setState({ songName })}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            label="Album Name"
                            placeholder="song name"
                            value={this.state.songName}
                            onChangeText={songName => this.setState({ songName })}
                        />
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

export default EditModal;
