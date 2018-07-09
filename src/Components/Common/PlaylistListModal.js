import React, { Component } from 'react';
import {
    View,
    Text,
    Modal
} from 'react-native';
import { connect } from 'react-redux';
import RecyclerViewList from 'react-native-recyclerview-list';
import Input from './Input';
import CardSection from './CardSection';
import BorderlessButton from './BorderlessButton';
import * as Actions from '../../Actions';

class PlaylistListModal extends Component {
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
                    <RecyclerViewList 
                        style={{ flex: 1 }}
                        dataSource={this.props.playlistList}
                        renderItem={({ item, index }) => <Text style={{ color: '#fff' }}>{item.playlistName} - {index}</Text>}
                        ListHeaderComponent={<Text style={{ color: '#fff' }}>ADD TO PLAYLIST</Text>}
                    />
                    <BorderlessButton>
                        Create new playlist
                    </BorderlessButton>
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

const mapStateToProps = (state) => {
    return {
        playlistList: state.playlistList
    };
};

export default connect(mapStateToProps, Actions)(PlaylistListModal);
