import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView
} from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';

class SongList extends Component {
  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(this.props.songs);
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
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />>
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
  return { songs: state.songs };
};

export default connect(mapStateToProps)(SongList);
