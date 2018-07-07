package com.fetchmusicfiles.Fetch;

import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;

import com.fetchmusicfiles.DataModels.Artist;
import com.fetchmusicfiles.DataModels.ArtistCollection;
import com.fetchmusicfiles.DataModels.Song;
import com.fetchmusicfiles.DataModels.SongCollection;

public class FetchArtists {
    private static FetchArtists demoDataProvider;

    private FetchArtists() {
    }

    public static FetchArtists getInstance() {
        if (null == demoDataProvider) {
            demoDataProvider = new FetchArtists();
        }
        return demoDataProvider;
    }

    public void getAllArtists(Context context){
        ArtistCollection.getInstance().getListOfArtists().clear();
        String[] projection = {"DISTINCT ARTIST", "ARTIST_ID"};
        Cursor cursor = context.getContentResolver().query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, projection,
                null, null, MediaStore.Audio.Media.ARTIST);

        if (cursor != null && cursor.moveToFirst()) {
            do{
                ArtistCollection.getInstance().getListOfArtists().add(new Artist(
                        cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ARTIST)),
                        cursor.getLong(cursor.getColumnIndex(MediaStore.Audio.Media.ARTIST_ID))
                ));
            }while(cursor.moveToNext());
        }
        if (cursor != null) {
            cursor.close();
        }
    }

    public void getSongs(Context context, long artistID){
        String where = "ARTIST_ID=?";
        Uri musicUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
        Cursor musicCursor = context.getContentResolver().query(musicUri, null, where, new String[] {Long.toString(artistID)}, MediaStore.Audio.Media.TITLE);

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
}
