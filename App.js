import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import TrackPlayer from 'react-native-track-player';
import Reducers from './src/Reducers';
import { backgroundColor } from './src/Values/colors';
import Router from './src/Router/Router';
import { permissionCheck } from './react_native_fetch_music_filesNativeModule';

const App = () => {
    permissionCheck();
    initialisePlayer();
    return (
        <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
            <View style={{ flex: 1 }}>
                <View>
                    <StatusBar 
                        backgroundColor={backgroundColor}
                    />
                </View>
                <Router backgroundColor={backgroundColor} />
            </View>
        </Provider>
    );
};

const initialisePlayer = async () => {
    await TrackPlayer.setupPlayer({});
    TrackPlayer.updateOptions({
        capabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_SEEK_TO,
            TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
            TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
        ]
    });
};

export default App;
