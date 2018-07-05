//  Created by react-native-create-bridge

import { NativeModules } from 'react-native';

const { react_native_fetch_music_files } = NativeModules;

// export default {
//   fetchAllSongs() {
//     return react_native_fetch_music_files.fetchAllSongs();
//   }
//   // EXAMPLE_CONSTANT: react_native_fetch_music_files.EXAMPLE_CONSTANT
// };

export default react_native_fetch_music_files;