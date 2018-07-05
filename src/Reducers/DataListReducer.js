import { fetchAllSongs } from '../../react_native_fetch_music_filesNativeModule';

fetchAllSongs((errorCallBack) => {
    console.log(errorCallBack);
},
(successCallback) => {
    console.log(successCallback);
});
