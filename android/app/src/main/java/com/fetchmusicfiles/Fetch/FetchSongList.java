package com.fetchmusicfiles.Fetch;

import android.content.ContentResolver;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import android.widget.Toast;

import com.fetchmusicfiles.DataModels.Song;
import com.fetchmusicfiles.DataModels.SongCollection;

import java.io.File;

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

    public void deleteSong(Context context, long songId, String fullPath) {
        ContentResolver musicResolver = context.getContentResolver();
        Uri musicUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
        String where = "_ID=?";
        String[] args = {Long.toString(songId)};
        musicResolver.delete(musicUri, where, args);
        deleteTarget(fullPath);
        Toast.makeText(context, "Song deleted", Toast.LENGTH_SHORT).show();
    }

    public int deleteTarget (String path){
        File target = new File(path);

        if(target.exists() && target.isFile() && target.canWrite()) {
            target.delete();
            return 0;
        }
        else if(target.exists() && target.isDirectory() && target.canRead()) {
            String[] file_list = target.list();

            if(file_list != null && file_list.length == 0) {
                target.delete();
                return 0;

            } else if(file_list != null && file_list.length > 0) {

                for(int i = 0; i < file_list.length; i++) {
                    File temp_f = new File(target.getAbsolutePath() + "/" + file_list[i]);

                    if(temp_f.isDirectory())
                        deleteTarget(temp_f.getAbsolutePath());
                    else if(temp_f.isFile())
                        temp_f.delete();
                }
            }
            if(target.exists())
                if(target.delete()) {
                    return 0;
                }
        }
        return -1;
    }
}
