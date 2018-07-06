import React, { Component } from 'react';
import {
  ListView,
  FlatList,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import * as Actions from '../Actions';
import { backgroundColor } from '../Values/colors';

class SongList extends Component {
  componentWillMount() {
    this.props.fetchSongs();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ songs }) {
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(songs);
  }

  renderRow(song) {
    return (
      <ListItem item={song} />
    );
  }

  render() {
    return (
        <FlatList style={{ backgroundColor={backgroundColor} }}
          data={this.props.songs}
          extraData={this.props}
          keyExtractor={}
          renderItem={({item}) => <ListItem item={item} />}
        />
        // <ListView 
        //   dataSource={this.dataSource}
        //   renderRow={this.renderRow}
        // />
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { songs: state.songs };
};

export default connect(mapStateToProps, Actions)(SongList);
