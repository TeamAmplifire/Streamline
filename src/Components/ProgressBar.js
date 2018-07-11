import React from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import { connect } from 'react-redux';
import { formatTime } from '../Utilities/Utilities';
import { onBackgroundColor } from '../Values/colors';
import * as Act from '../Actions';

class MyProgressBar extends ProgressComponent {
    renderNext = true;
    songEnd = false;

    render() {
        const position = formatTime(Math.floor(this.state.position));
        const audioDuration = formatTime(Math.floor(this.state.duration));
        if ((this.state.duration - this.state.position < 1) && (this.state.position > 3) && this.renderNext) {
            this.props.onEnd();
            this.renderNext = false;
            this.songEnd = true;
        }
        TrackPlayer.getPosition().then(value => {
            if (this.songEnd && (value < 2)) {
                this.renderNext = true;
                this.songEnd = false;
            }
        });
        return (
            <View style={styles.view}>
                <Text style={styles.info}>{position}</Text>
                <Slider
                    style={{ flex: 1 }}
                    minimumValue={0}
                    maximumValue={this.state.duration}
                    step={1}
                    value={this.state.position}
                    onValueChange={(value) => {
                            TrackPlayer.seekTo(value);
                        }
                    }
                />
                <Text style={styles.info}>{audioDuration}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingTop: 50,
        paddingBottom: 8,
        paddingLeft: 24,
        paddingRight: 24
    },
    info: {
        color: onBackgroundColor,
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
    },
});

export default connect(null, Act)(MyProgressBar);
