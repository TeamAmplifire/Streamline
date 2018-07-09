package com.fetchmusicfiles.Fetch;

import android.content.Context;
import android.database.Cursor;
import android.provider.MediaStore;

import com.fetchmusicfiles.DataModels.Song;
import com.fetchmusicfiles.DataModels.SongCollection;

public class FetchSongList {

    private static FetchSongList demoDataProvider;

    private FetchSongList() {
    }

    public static FetchSongList getInstance() {
        if (null == demoDataProvider) {
            demoDataProvider = new FetchSongList();
        }
        return demoDataProvider;
    }

    public void getAllSongs(Context context) {

        SongCollection.getInstance().getListOfSongs().clear();

        Cursor cursor = context.getContentResolver().query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, null,
                null, null, MediaStore.Audio.Media.TITLE);

        if (cursor != null) {
            if (cursor.moveToFirst()) {
                do {
                    SongCollection.getInstance().getListOfSongs().add(new Song(
                            cursor.getInt(cursor.getColumnIndex(MediaStore.Audio.Media._ID)),
                            cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.TITLE)),
                            cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ARTIST)),
                            cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ALBUM)),
                            cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.DATA)),
                            cursor.getLong(cursor.getColumnIndex(MediaStore.Audio.Media.DURATION))
                    ));
                } while (cursor.moveToNext());
            }
            cursor.close();
        }
    }

    public void getRecentlyAdded(Context context) {

        SongCollection.getInstance().getListOfSongs().clear();

        Cursor cursor = context.getContentResolver().query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, null,
                null, null, MediaStore.Audio.Media.DATE_ADDED + " DESC");
        int i = 0;
        if (cursor != null) {
            if (cursor.moveToFirst()) {
                do {
                    SongCollection.getInstance().getListOfSongs().add(new Song(
                            cursor.getLong(cursor.getColumnIndex(MediaStore.Audio.Media._ID)),
                            cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.TITLE)),
                            cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ARTIST)),
                            cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ALBUM)),
                            cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.DATA)),
                            cursor.getLong(cursor.getColumnIndex(MediaStore.Audio.Media.DURATION))
                    ));
                } while (cursor.moveToNext() && i++ != 50);
            }
            cursor.close();
        }
    }

    public String getArtworkForSong(Context context, long songID) {
        String artwork = "";
        String album = "";
        Cursor musicCursor = context.getContentResolver().query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, null,
                "_ID=?", new String[] {Long.toString(songID)}, null);
        if(musicCursor != null && musicCursor.moveToFirst())
            album = musicCursor.getString(musicCursor.getColumnIndex(MediaStore.Audio.Media.ALBUM));
        Cursor albumCursor = context.getContentResolver().query(MediaStore.Audio.Albums.EXTERNAL_CONTENT_URI,
                new String[]{MediaStore.Audio.Albums._ID, MediaStore.Audio.Albums.ALBUM_ART}, "ALBUM=?",
                new String[] {album},
                null);
        if(albumCursor != null) {
            if(albumCursor.moveToFirst())
                artwork = albumCursor.getString(albumCursor.getColumnIndex(MediaStore.Audio.Albums.ALBUM_ART));
        }
        artwork = "file://" + artwork;
        return artwork;
    }

    public Song getSong(Context context, long songID){
        Song song =  null;
        Cursor musicCursor = context.getContentResolver().query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, null,
                "_ID=?", new String[] {Long.toString(songID)}, null);
        if(musicCursor != null && musicCursor.moveToFirst()){
            song = new Song(musicCursor.getLong(musicCursor.getColumnIndex(MediaStore.Audio.Media._ID)),
                    musicCursor.getString(musicCursor.getColumnIndex(MediaStore.Audio.Media.TITLE)),
                    musicCursor.getString(musicCursor.getColumnIndex(MediaStore.Audio.Media.ARTIST)),
                    musicCursor.getString(musicCursor.getColumnIndex(MediaStore.Audio.Media.ALBUM)),
                    musicCursor.getString(musicCursor.getColumnIndex(MediaStore.Audio.Media.DATA)),
                    musicCursor.getLong(musicCursor.getColumnIndex(MediaStore.Audio.Media.DURATION))
            );
        }
        return song;
    }
}
