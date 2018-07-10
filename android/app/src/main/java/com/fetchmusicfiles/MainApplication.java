package com.fetchmusicfiles;

import android.app.Application;

import com.facebook.react.ReactApplication;
import guichaguri.trackplayer.TrackPlayer;
import com.github.godness84.RNRecyclerViewList.RNRecyclerviewListPackage;
import guichaguri.trackplayer.TrackPlayer;
import com.github.godness84.RNRecyclerViewList.RNRecyclerviewListPackage;
import guichaguri.trackplayer.TrackPlayer;
import com.github.godness84.RNRecyclerViewList.RNRecyclerviewListPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.fetchmusicfiles.react_native_fetch_music_files.react_native_fetch_music_filesPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new TrackPlayer(),
          new RNRecyclerviewListPackage(),
          new react_native_fetch_music_filesPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, false);
  }
}
