import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './src/Reducers';
import SongList from './src/Components/SongList';
import RecentlyAddedList from './src/Components/RecentlyAddedList';
import { backgroundColor } from './src/Values/colors';

const App = () => {
    return (
        <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
            <View style={{ backgroundColor=backgroundColor }}>
                <StatusBar 
                    backgroundColor={backgroundColor}
                />
                <SongList />
            </View>
        </Provider>
    );
};

export default App;

