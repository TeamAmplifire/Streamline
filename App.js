import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './src/Reducers';
import SongList from './src/Components/SongList';

const App = () => {
    return (
        <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
            <View>
                <SongList />
            </View>
         </Provider>
    );
};

export default App;

