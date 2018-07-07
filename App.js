import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './src/Reducers';
import SongList from './src/Components/SongList';
import RecentlyAddedList from './src/Components/RecentlyAddedList';
import PlayerScreen from './src/Components/PlayerScreen';
import { backgroundColor } from './src/Values/colors';

const App = () => {
    return (
        <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
            <View>
                <StatusBar 
                    backgroundColor={backgroundColor}
                />
                <PlayerScreen />
            </View>
        </Provider>
    );
};

export default App;

