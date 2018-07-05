export default (state = null, action) => {
    switch (action.type) {
        case 'select-song': 
            return action.payload;
        default: 
            return state;
    }
};
