const InitialState = [{ 
    songName: null,
    songID: null,
    albumArt: null,
    albumName: null,
    fullpath: null,
    songLength: null,
    artistName: null,
 }];

export default (state = InitialState, action) => {
    switch (action.type) {
        case 'data-fetch-recently-added': 
            return action.payload;
        default: 
            return state;
    }
};
