import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { fetchAllSongs } from './react_native_fetch_music_filesNativeModule';
import Reducers from './src/Reducers';
import SongList from './src/Components/SongList';

const App = () => {
    fetchAllSongs((errorCallBack) => {
        console.log(errorCallBack);
    }, (successCallback) => {
        console.log(successCallback);
    });
    return (
        <Provider store={createStore(Reducers)}>
            <View>
                <SongList />
            </View>
         </Provider>
    );
};

export default App;

