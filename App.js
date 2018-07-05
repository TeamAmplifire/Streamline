import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './src/Reducers';
import SongList from './src/Components/SongList';

const App = () => {
    return (
        <Provider store={createStore(Reducers)}>
            <View>
                <SongList />
            </View>
         </Provider>
    );
};

export default App;

