package com.fetchmusicfiles.DataModels;

import android.content.ContentUris;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.Log;

public class Song {
    private long songID;
    private String songName;
    private String albumName;
    private String artistName;
    private String fullPath;
    private long songLength;
    private String albumArt;

    public Song(long songID, String songName, String albumName, String artistName, String fullPath, long songLength, String albumArt) {
        this.songID = songID;
        this.songName = songName;
        this.albumName = albumName;
        this.artistName = artistName;
        this.fullPath = fullPath;
        this.songLength = songLength;
        this.albumArt = "file://" + albumArt;
    }

    public String getAlbumArt() {
        return albumArt;
    }

    public void setAlbumArt(String albumArt) {
        this.albumArt = albumArt;
    }

    public void setSongID(long songID) {
        this.songID = songID;
    }

    public void setSongName(String songName) {
        this.songName = songName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public String getArtistName() {
        return artistName;
    }

    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    public void setFullPath(String fullPath) {
        this.fullPath = fullPath;
    }

    public void setSongLength(long songLength) {
        this.songLength = songLength;
    }

    public long getSongID() {
        return songID;
    }

    public String getSongName() {
        return songName;
    }

    public String getAlbumName() {
        return albumName;
    }

    public String getFullPath() {
        return fullPath;
    }

    public long getSongLength() {
        return Long.valueOf(milliSecondsToTimer(songLength));
    }

    public static String milliSecondsToTimer(long milliseconds) {
        String finalTimerString = "";
        String secondsString = "";

        // Convert total duration into time
        int hours = (int) (milliseconds / (1000 * 60 * 60));
        int minutes = (int) (milliseconds % (1000 * 60 * 60)) / (1000 * 60);
        int seconds = (int) ((milliseconds % (1000 * 60 * 60)) % (1000 * 60) / 1000);
        // Add hours if there
        if (hours > 0) {
            finalTimerString = hours + ":";
        }

        // Prepending 0 to seconds if it is one digit
        if (seconds < 10) {
            secondsString = "0" + seconds;
        } else {
            secondsString = "" + seconds;
        }

        finalTimerString = finalTimerString + minutes + ":" + secondsString;

        // return timer string
        return finalTimerString;
    }

    public static String getArtworkForSong(Context context, long albumID) {
        Cursor cursor = context.getContentResolver().query(MediaStore.Audio.Albums.EXTERNAL_CONTENT_URI,
                new String[]{MediaStore.Audio.Albums._ID, MediaStore.Audio.Albums.ALBUM_ART, MediaStore.Audio.Albums.ALBUM,}, "_ID=?",
                new String[] {Long.toString(albumID)},
                MediaStore.Audio.Albums.ALBUM);
        cursor.moveToFirst();
        String artwork = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Albums.ALBUM_ART));
        return artwork;
    }
}
