import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './src/Reducers';
import { backgroundColor } from './src/Values/colors';
import { ALL_SONGS, RECENTLY_ADDED_SONGS, PLAYLIST_LIST, ALBUM_LIST, ARTIST_LIST } from './src/Values/Types';
import ListView from './src/Components/ListView';
import GridView from './src/Components/GridView';
import LibraryList from './src/Components/LibraryList';

const App = () => {
    return (
        <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
            <View style={{ flex: 1 }}>
                <View>
                    <StatusBar 
                        backgroundColor={backgroundColor}
                    />
                </View>
                <GridView listType={ALBUM_LIST} headerText='Albums' />
            </View>
        </Provider>
    );
};

export default App;
