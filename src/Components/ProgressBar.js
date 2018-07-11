import React from 'react';
import { View, Text, StyleSheet, Dimensions, Slider } from 'react-native';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import { formatTime } from '../Utilities/Utilities';
import { accentColor, backgroundColorLight, onBackgroundColor } from '../Values/colors';

export default class MyProgressBar extends ProgressComponent {
    
    render() {
        const position = formatTime(Math.floor(this.state.position));
        const audioDuration = formatTime(Math.floor(this.state.duration));
        const info = position + ' / ' + audioDuration;
        // if(this.state.position===this.state.duration)
        // {
        //     console.log('endT');
        //     this.onEnd(true);
        // }
        // else {
        //     this.onEnd(false);
        // }
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

// export default connect(null, onEnd)(MyProgressBar);
