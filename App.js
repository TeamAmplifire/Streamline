import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import ListItem from './src/Components/ListItem';

class App extends Component {
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
        <Text>djjhcchjd</Text>
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

export default connect(mapStateToProps)(App);
