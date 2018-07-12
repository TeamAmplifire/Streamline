import { SELECT_LIST_TYPE } from '../Values/Types';
 
export * from './SongsActions';
export * from './PlaylistActions';
export * from './AlbumActions';
export * from './ArtistActions';
export * from './PlayerTrayActions';

export const selectListType = (listType) => {
    return {
        type: SELECT_LIST_TYPE,
        payload: listType
    };
};
