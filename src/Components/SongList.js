import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView
} from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import * as Actions from '../Actions';

class SongList extends Component {
  componentWillMount() {
    Actions.fetchSongs();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    console.log(this.props.songs);
    this.dataSource = ds.cloneWithRows(this.props.songs);
    console.log(this.dataSource);
  }

  renderRow(song) {
    return (
      <ListItem item={song} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView 
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const mapStateToProps = (state) => {
  console.log(state);
  return { songs: state.songs };
};

export default connect(mapStateToProps, Actions)(SongList);
