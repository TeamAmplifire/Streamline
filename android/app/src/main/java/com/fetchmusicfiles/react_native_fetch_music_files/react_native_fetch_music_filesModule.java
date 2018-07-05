package com.fetchmusicfiles.react_native_fetch_music_files;

import android.support.annotation.Nullable;
import com.facebook.react.bridge.Callback;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.fetchmusicfiles.DataModels.SongCollection;
import com.fetchmusicfiles.Fetch.FetchSongList;
import com.google.gson.Gson;

import java.util.HashMap;
import java.util.Map;

public class react_native_fetch_music_filesModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "react_native_fetch_music_files";
    private static ReactApplicationContext reactContext = null;

    public react_native_fetch_music_filesModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("EXAMPLE_CONSTANT", "example");

        return constants;
    }

    @ReactMethod
    public void fetchAllSongs(Callback errorCallback,
                              Callback successCallback) {
        FetchSongList.getInstance().getAllSongs(reactContext);

        if (SongCollection.getInstance().getListOfSongs().isEmpty()) {
            errorCallback.invoke("There are no audio files found on this device.");
            return;
        }

        successCallback.invoke(new Gson().toJson(SongCollection.getInstance().getListOfSongs()));
    }

    @ReactMethod
    public void fetchRecentlyAdded(Callback errorCallback, Callback successCallback){
        FetchSongList.getInstance().getRecentlyAdded(reactContext);

        if(SongCollection.getInstance().getListOfSongs().isEmpty()) {
            errorCallback.invoke("There are no audio files found on this device.");
            return;
        }

        successCallback.invoke(new Gson().toJson(SongCollection.getInstance().getListOfSongs()));
    }

    private static void emitDeviceEvent(String eventName, @Nullable WritableMap eventData) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, eventData);
    }
}
