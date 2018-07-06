const InitialState = { 
    selectedSongID: null
 };

export default (state = InitialState, action) => {
    switch (action.type) {
        case 'select-song': 
            return action.payload;
        default: 
            return state;
    }
};
