
const InitialState = {};

export default (state = InitialState, action) => {
    switch (action.type) {
        case 'data-fetch': 
            return { ...state, songs: action.payload.value };
        default: 
            return state;
    }
};
