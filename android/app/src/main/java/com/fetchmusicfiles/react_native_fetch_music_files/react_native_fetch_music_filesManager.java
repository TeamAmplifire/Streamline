//  Created by react-native-create-bridge

package com.fetchmusicfiles.react_native_fetch_music_files;

import android.view.View;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class react_native_fetch_music_filesManager extends SimpleViewManager<View> {
    public static final String REACT_CLASS = "react_native_fetch_music_files";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public View createViewInstance(ThemedReactContext context){
        return new View(context);
    }

    @ReactProp(name = "exampleProp")
    public void setExampleProp(View view, String prop) {
    }
}
