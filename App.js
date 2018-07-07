import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './src/Reducers';
import { backgroundColor } from './src/Values/colors';
import { ALL_SONGS, RECENTLY_ADDED_SONGS } from './src/Values/Types';
import ListView from './src/Components/ListView';

const App = () => {
    return (
        <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
            <View>
                <StatusBar 
                    backgroundColor={backgroundColor}
                />
                <ListView listType={ALL_SONGS} />
            </View>
        </Provider>
    );
};

export default App;

