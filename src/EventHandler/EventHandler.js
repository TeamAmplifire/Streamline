import TrackPlayer from 'react-native-track-player';

async function eventHandler(store, data) {
    switch(data.type) {

        case 'remote-play':
            TrackPlayer.play();
            break;
        case 'remote-pause':
            TrackPlayer.pause();
            break;
        case 'remote-stop':
            TrackPlayer.stop();
            break;
        case 'remote-next':
            TrackPlayer.skipToNext();
            break;
        case 'remote-previous':
            TrackPlayer.skipToPrevious();
            break;
        case 'remote-seek':
            TrackPlayer.seekTo(data.position);
            break;

        case 'remote-duck':
            TrackPlayer.setVolume(data.ducking ? 0.2 : 1);
            break;
            
    }
};

module.exports = function(store) {
    return eventHandler.bind(null, store);
};