export const selectLibrary = (songID) => {
    return (
        {
            type: 'select-song',
            payload: songID
        }
    );
};
