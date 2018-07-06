import React, { Component } from 'react';
import {
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import * as Actions from '../Actions';
import { Header } from './Common';

class SongList extends Component {
  componentWillMount() {
    this.props.fetchSongs();
  }

  renderHeader = () => {
    return <Header headerText='All Songs' />;
  }

  render() {
    return (
        <FlatList
          data={this.props.songs}
          extraData={this.props}
          keyExtractor={item => item.songName} //Need to change songName to songID 
          renderItem={({item}) => <ListItem item={item} />}
          ListHeaderComponent={this.renderHeader}
        />
    );
  }
}

const mapStateToProps = (state) => {
  return { songs: state.songs };
};

export default connect(mapStateToProps, Actions)(SongList);
