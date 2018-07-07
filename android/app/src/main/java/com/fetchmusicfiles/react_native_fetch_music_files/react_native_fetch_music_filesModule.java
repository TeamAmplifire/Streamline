package com.fetchmusicfiles.react_native_fetch_music_files;

import android.content.ContentUris;
import android.net.Uri;
import android.support.annotation.Nullable;
import com.facebook.react.bridge.Callback;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.fetchmusicfiles.DataModels.AlbumCollection;
import com.fetchmusicfiles.DataModels.ArtistCollection;
import com.fetchmusicfiles.DataModels.PlaylistCollection;
import com.fetchmusicfiles.DataModels.SongCollection;
import com.fetchmusicfiles.Fetch.FetchAlbums;
import com.fetchmusicfiles.Fetch.FetchArtists;
import com.fetchmusicfiles.Fetch.FetchPlaylists;
import com.fetchmusicfiles.Fetch.FetchSongList;
import com.fetchmusicfiles.Update.UpdateSongInfo;
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

    private static void emitDeviceEvent(String eventName, @Nullable WritableMap eventData) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, eventData);
    }

    @ReactMethod
    public void fetchAllSongs(Callback errorCallback, Callback successCallback) {
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

    @ReactMethod
    public void fetchAllPlaylists(Callback errorCallback, Callback successCallback){
        FetchPlaylists.getInstance().getAllPlaylists(reactContext);

        if(PlaylistCollection.getInstance().getListOfPlaylists().isEmpty()) {
            errorCallback.invoke("There are no playlists found on this device.");
            return;
        }

        successCallback.invoke(new Gson().toJson(PlaylistCollection.getInstance().getListOfPlaylists()));
    }

    @ReactMethod
    public void createPlaylist(String playlistName, Callback errorCallback, Callback successCallback){
        long playlistId = FetchPlaylists.getInstance().createPlaylist(reactContext, playlistName);

        if(playlistId == -1) {
            errorCallback.invoke("Playlist could not be created.");
            return;
        }

        successCallback.invoke("{ id: " + playlistId + " playlistName: " + playlistName + " }");
    }

    @ReactMethod
    public void addSongToPlaylist(long playlistId, long songId, Callback errorCallback, Callback successCallback){
        int check = FetchPlaylists.getInstance().addToPlaylist(reactContext, playlistId, songId);

        if(check == 0) {
            errorCallback.invoke("Song could not be added to playlist.");
            return;
        }

        successCallback.invoke("Song added to playlist.");
    }

    @ReactMethod
    public void deletePlaylist(long playlistId){
        FetchPlaylists.getInstance().deletePlaylist(reactContext, playlistId);
    }

    @ReactMethod
    public void renamePlaylist(long playlistId, String newName, Callback errorCallback, Callback successCallback){
        FetchPlaylists.getInstance().renamePlaylist(reactContext, playlistId, newName);
    }

    @ReactMethod
    public void getSongsFromPlaylist(long playlistId, Callback errorCallback, Callback successCallback){
        FetchPlaylists.getInstance().getSongs(reactContext, playlistId);

        if(SongCollection.getInstance().getListOfSongs().isEmpty()) {
            errorCallback.invoke("Playlist has no songs.");
            return;
        }

        successCallback.invoke(new Gson().toJson(SongCollection.getInstance().getListOfSongs()));
    }

    @ReactMethod
    public void editSongInfo(String newTitle, String newAlbum, String newArtist, long songId, String fullPath){
        UpdateSongInfo.updateID3Tags(reactContext, newTitle, newAlbum, newArtist, songId, fullPath);
    }

    @ReactMethod
    public void deleteSong(long songId, String fullPath){
        UpdateSongInfo.deleteSong(reactContext, songId, fullPath);
    }

    @ReactMethod
    public void fetchAllAlbums(Callback errorCallback, Callback successCallback){
        FetchAlbums.getInstance().getAllAlbums(reactContext);

        if(AlbumCollection.getInstance().getListOfAlbums().isEmpty()) {
            errorCallback.invoke("There are no albums found on this device.");
            return;
        }

        successCallback.invoke(new Gson().toJson(AlbumCollection.getInstance().getListOfAlbums()));
    }

    @ReactMethod
    public void getSongsFromAlbum(long albumId, Callback errorCallback, Callback successCallback){
        FetchAlbums.getInstance().getSongs(reactContext, albumId);

        if(SongCollection.getInstance().getListOfSongs().isEmpty()) {
            errorCallback.invoke("Album has no songs.");
            return;
        }

        successCallback.invoke(new Gson().toJson(SongCollection.getInstance().getListOfSongs()));
    }

    @ReactMethod
    public void fetchAllArtists(Callback errorCallback, Callback successCallback){
        FetchArtists.getInstance().getAllArtists(reactContext);

        if(ArtistCollection.getInstance().getListOfArtists().isEmpty()) {
            errorCallback.invoke("There are no artists found on this device.");
            return;
        }

        successCallback.invoke(new Gson().toJson(ArtistCollection.getInstance().getListOfArtists()));
    }

    @ReactMethod
    public void getSongsFromArtist(long artistId, Callback errorCallback, Callback successCallback){
        FetchArtists.getInstance().getSongs(reactContext, artistId);

        if(SongCollection.getInstance().getListOfSongs().isEmpty()) {
            errorCallback.invoke("Artist has no songs.");
            return;
        }

        successCallback.invoke(new Gson().toJson(SongCollection.getInstance().getListOfSongs()));
    }

    @ReactMethod
    public void deleteSongFromPlaylist(long playlistId, long songId){
        FetchPlaylists.getInstance().deleteSongFromPlaylist(reactContext, playlistId, songId);
    }
}
