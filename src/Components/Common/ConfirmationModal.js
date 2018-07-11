import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { BorderlessButton } from './BorderlessButton';
import { backgroundColor, onBackgroundColor } from '../../Values/colors';

const ConfirmationModal = ({ children, visible, onAccept, onDecline }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => {}}
        >
            <View style={styles.containerStyle}>
                <CardSection style={styles.cardSectionStyle}>
                    <Text style={styles.textStyle}>{children}</Text>
                </CardSection>

                <View style={styles.buttonContainerStyle}>
                    <BorderlessButton onPress={onDecline}>Cancel</BorderlessButton>
                    <BorderlessButton onPress={onAccept}>Accept</BorderlessButton>
                </View>
            </View>
        </Modal>
    );
};

const styles = {
    cardSectionStyle: {
        justifyContent: 'center'
    },

    textStyle: {
        flex: 1,
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: onBackgroundColor,
        textAlign: 'center',
        lineHeight: 50
    },

    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    },

    buttonContainerStyle: {
        backgroundColor,
        height: 60, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }

};

export default ConfirmationModal;
