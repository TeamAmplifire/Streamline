//  Created by react-native-create-bridge

import React, { Component } from 'react'
import { requireNativeComponent } from 'react-native'

const react_native_fetch_music_files = requireNativeComponent('react_native_fetch_music_files', react_native_fetch_music_filesView)

export default class react_native_fetch_music_filesView extends Component {
  render () {
    return <react_native_fetch_music_files {...this.props} />
  }
}

react_native_fetch_music_filesView.propTypes = {
  exampleProp: React.PropTypes.any
}
