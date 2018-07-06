import React from 'react';
import { View } from 'react-native';

const CardSection = ({ children }) => {
    return (
        <View style={styles.containerStyle}>
            {children}
        </View>
    );
};

const styles = {
    containerStyle: {
        padding: 0,
        backgroundColor: '#242424',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};

export { CardSection };
