import React from 'react';
import { View } from 'react-native';
import { backgroundColor } from '../../Values/colors';

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
        backgroundColor,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};

export { CardSection };
