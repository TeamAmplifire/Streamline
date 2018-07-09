import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('fetchMusicFiles', () => App);
AppRegistry.registerHeadlessTask('TrackPlayer', require('./src/EventHandler/EventHandler'));

