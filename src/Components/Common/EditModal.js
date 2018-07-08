import React, { Component } from 'react';
import {
    View,
    Text,
    Modal
} from 'react-native';
import Input from './Input';

export default class EditModal extends Component {
    state = { songName: '', albumName: '', artistName: '' };

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
                </View>
            </Modal>
        );
    }
};

const styles = {
    cardSelectionStyle: {
        justifyContent: 'center'
    },
    textStyle : {
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