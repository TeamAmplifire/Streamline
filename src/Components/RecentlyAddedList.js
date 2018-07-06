import React, { Component } from 'react';
import {
  ListView
} from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import * as Actions from '../Actions';

class SongList extends Component {
  componentWillMount() {
    this.props.fetchRecentlyAdded();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ recentlyAdded }) {
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(recentlyAdded);
  }

  renderRow(song) {
    return (
      <ListItem item={song} />
    );
  }

  render() {
    return (
        <ListView 
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { recentlyAdded: state.recentlyAdded };
};

export default connect(mapStateToProps, Actions)(SongList);
