import React from 'react';
import { View, StatusBar, AsyncStorage } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import TrackPlayer from 'react-native-track-player';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import Reducers from './src/Reducers';
import { backgroundColor } from './src/Values/colors';
import Router from './src/Router/Router';
import { permissionCheck } from './react_native_fetch_music_filesNativeModule';

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, Reducers);
let store = createStore(persistedReducer);
let persistor = persistStore(store);
const appStore = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk));

const App = () => {
    permissionCheck();
    initialisePlayer();
    return (
        <Provider store={appStore}>
            <PersistGate loading={null} persistor={persistor}>
            <View style={{ flex: 1 }}>
                <View>
                    <StatusBar 
                        backgroundColor={backgroundColor}
                    />
                </View>
                <Router backgroundColor={backgroundColor} />
            </View>
            </PersistGate>
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
            TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        ]
    });
};

export default App;
