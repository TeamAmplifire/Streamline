import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './src/Reducers';
import { backgroundColor } from './src/Values/colors';
import Router from './src/Router/Router';

const App = () => {
    
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

export default App;
