import React from 'react';
import { View, Text, StyleSheet, Dimensions, Slider } from 'react-native';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import { formatTime } from '../Utilities/Utilities';

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
                <Text style={styles.info}>{info}</Text>
                <Slider
                    minimumValue={0}
                    maximumValue={this.state.duration}
                    step={1}
                    width={Dimensions.get('window').width * 0.9}
                    value={this.state.position}
                    onValueChange={(value) => {
                            TrackPlayer.seekTo(value);
                        }
                    }
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        justifyContent: 'center',

    },
    info: {
        color: '#c0c0c0',
        fontSize: 16,
        fontWeight: '300',
        margin: 10
    },
    bar: {
        backgroundColor: '#575757',
        height: 5,
        width: '100%',
        margin: 10,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    played: {
        backgroundColor: '#34fd33',
        height: 5
    },
    buffered: {
        backgroundColor: '#797979',
        height: 5
    }
});

// export default connect(null, onEnd)(MyProgressBar);
