import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

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

                <CardSection>
                    <Button onPress={onAccept}>Accept</Button>
                    <Button onPress={onDecline}>Cancel</Button>
                </CardSection>
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
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },

    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }

};

export default ConfirmationModal;
