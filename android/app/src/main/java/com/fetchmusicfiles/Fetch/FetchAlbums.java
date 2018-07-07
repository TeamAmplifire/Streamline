package com.fetchmusicfiles.Fetch;

import android.content.ContentUris;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;

import com.fetchmusicfiles.DataModels.Album;
import com.fetchmusicfiles.DataModels.AlbumCollection;
import com.fetchmusicfiles.DataModels.Song;
import com.fetchmusicfiles.DataModels.SongCollection;

import java.util.ArrayList;

public class FetchAlbums {
    private static FetchAlbums demoDataProvider;

    private FetchAlbums() {
    }

    public static FetchAlbums getInstance() {
        if (null == demoDataProvider) {
            demoDataProvider = new FetchAlbums();
        }
        return demoDataProvider;
    }

    public void getAllAlbums(Context context){
        AlbumCollection.getInstance().getListOfAlbums().clear();
        String[] projection = {"DISTINCT ALBUM", "ALBUM_ID"};
        Cursor cursor = context.getContentResolver().query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, projection,
                null, null, MediaStore.Audio.Media.ALBUM);


        if (cursor != null && cursor.moveToFirst()) {
            do{
                String where = "ALBUM_ID=?";
                Uri musicUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
                Cursor musicCursor = context.getContentResolver().query(musicUri, null, where, new String[] {Long.toString(cursor.getLong(cursor.getColumnIndex(MediaStore.Audio.Media.ALBUM_ID)))}, null);
                musicCursor.moveToFirst();
                long songID = musicCursor.getLong(musicCursor.getColumnIndex(MediaStore.Audio.Media._ID));
                musicCursor.close();
                String albumArt = ContentUris.withAppendedId(Uri.parse("content://media/external/audio/albumart"), songID).toString();
                AlbumCollection.getInstance().getListOfAlbums().add(new Album(
                        cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ALBUM)),
                        cursor.getLong(cursor.getColumnIndex(MediaStore.Audio.Media.ALBUM_ID)),
                        albumArt
                ));
            }while(cursor.moveToNext());
        }
        if (cursor != null) {
            cursor.close();
        }
    }

    public void getSongs(Context context, long albumID){
        String where = "ALBUM_ID=?";
        Uri musicUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
        Cursor musicCursor = context.getContentResolver().query(musicUri, null, where, new String[] {Long.toString(albumID)}, MediaStore.Audio.Media.TITLE);

        musicCursor.moveToFirst();
        do {
            SongCollection.getInstance().getListOfSongs().add(new Song(
                    musicCursor.getInt(musicCursor.getColumnIndex(MediaStore.Audio.Media._ID)),
                    musicCursor.getString(musicCursor.getColumnIndex(MediaStore.Audio.Media.TITLE)),
                    musicCursor.getString(musicCursor.getColumnIndex(MediaStore.Audio.Media.ARTIST)),
                    musicCursor.getString(musicCursor.getColumnIndex(MediaStore.Audio.Media.ALBUM)),
                    musicCursor.getString(musicCursor.getColumnIndex(MediaStore.Audio.Media.DATA)),
                    musicCursor.getLong(musicCursor.getColumnIndex(MediaStore.Audio.Media.DURATION))));
        } while (musicCursor.moveToNext());
    }

    public long getFirstAlbumImageURI(Context context, long albumID){
        String where = "ALBUM_ID=?";
        Uri musicUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
        Cursor musicCursor = context.getContentResolver().query(musicUri, null, where, new String[] {Long.toString(albumID)}, null);
        musicCursor.moveToFirst();
        long ID = musicCursor.getLong(musicCursor.getColumnIndex(MediaStore.Audio.Media._ID));
        return ID;
    }
}
