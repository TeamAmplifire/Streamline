package com.fetchmusicfiles.Fetch;

import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;

import com.fetchmusicfiles.DataModels.Playlist;
import com.fetchmusicfiles.DataModels.PlaylistCollection;
import com.fetchmusicfiles.DataModels.Song;
import com.fetchmusicfiles.DataModels.SongCollection;

import java.util.ArrayList;
import java.util.Collections;

public class FetchPlaylists {
    private static FetchPlaylists demoDataProvider;

    private FetchPlaylists() {
    }

    public static FetchPlaylists getInstance() {
        if (null == demoDataProvider) {
            demoDataProvider = new FetchPlaylists();
        }
        return demoDataProvider;
    }

    public void getAllPlaylists(Context context){
        PlaylistCollection.getInstance().getListOfPlaylists().clear();

        Cursor cursor = context.getContentResolver().query(MediaStore.Audio.Playlists.EXTERNAL_CONTENT_URI, null,
                null, null, null);

        if (cursor != null && cursor.moveToFirst()) {
            do{
                PlaylistCollection.getInstance().getListOfPlaylists().add(new Playlist(
                        cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Playlists.NAME)),
                        cursor.getLong(cursor.getColumnIndex(MediaStore.Audio.Playlists._ID))
                ));
            }while(cursor.moveToNext());
        }
        if (cursor != null) {
            cursor.close();
        }
    }

    public long getPlaylist(Context context, String name) {
        long id = -1;
        Cursor cursor = context.getContentResolver().query(MediaStore.Audio.Playlists.EXTERNAL_CONTENT_URI,
                new String[] { MediaStore.Audio.Playlists._ID },
                MediaStore.Audio.Playlists.NAME + "=?",
                new String[] { name }, null);

        if (cursor != null) {
            if (cursor.moveToNext())
                id = cursor.getLong(0);
            cursor.close();
        }
        return id;
    }

    public long createPlaylist(Context context, String name) {
        long id = getPlaylist(context, name);

        if (id == -1) {
            ContentValues values = new ContentValues(1);
            values.put(MediaStore.Audio.Playlists.NAME, name);
            Uri uri = context.getContentResolver().insert(MediaStore.Audio.Playlists.EXTERNAL_CONTENT_URI, values);
            if (uri != null) {
                id = Long.parseLong(uri.getLastPathSegment());
            }
        } else {
            Uri uri = MediaStore.Audio.Playlists.Members.getContentUri("external", id);
            context.getContentResolver().delete(uri, null, null);
        }
        return id;
    }

    public int addToPlaylist(Context context, long playlistId, long songId) {
        if (playlistId == -1)
            return 0;
        Uri playlistUri = MediaStore.Audio.Playlists.Members.getContentUri("external", playlistId);
        String[] projection = new String[] { MediaStore.Audio.Playlists.Members.PLAY_ORDER };
        Cursor cursor = context.getContentResolver().query(playlistUri, projection, null, null, null);
        int base = 0;
        if (cursor.moveToLast())
            base = cursor.getInt(0) + 1;
        cursor.close();
        String where = "_ID=?";
        Uri listMemberUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
        Cursor from = context.getContentResolver().query(listMemberUri, null, where,new String[] {Long.toString(songId)}, null);
        if (from == null)
            return 0;
        int count = from.getCount();
        if (count > 0) {
            ContentValues[] values = new ContentValues[count];
            for (int i = 0; i != count; ++i) {
                from.moveToPosition(i);
                ContentValues value = new ContentValues(2);
                value.put(MediaStore.Audio.Playlists.Members.PLAY_ORDER, Integer.valueOf(base + i));
                value.put(MediaStore.Audio.Playlists.Members.AUDIO_ID, from.getLong(from.getColumnIndex(MediaStore.Audio.Media._ID)));
                values[i] = value;
            }
            context.getContentResolver().bulkInsert(playlistUri, values);
        }
        from.close();
        return count;
    }

    public void deletePlaylist(Context context, long id) {
        Uri uri = ContentUris.withAppendedId(MediaStore.Audio.Playlists.EXTERNAL_CONTENT_URI, id);
        context.getContentResolver().delete(uri, null, null);
    }

    public void renamePlaylist(Context context, long id, String newName) {
        long existingId = getPlaylist(context, newName);
        if (existingId == id)
            return;
        if (existingId != -1)
            deletePlaylist(context, existingId);

        ContentValues values = new ContentValues(1);
        values.put(MediaStore.Audio.Playlists.NAME, newName);
        context.getContentResolver().update(MediaStore.Audio.Playlists.EXTERNAL_CONTENT_URI, values, "_ID=?", new String[]{Long.toString(id)});
    }

    public void getSongs(Context context, long playlistID){
        int count = 0;
        Uri playlistUri = MediaStore.Audio.Playlists.Members.getContentUri("external", playlistID);
        Uri musicUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;

        String[] projection = new String[] { MediaStore.Audio.Playlists.Members.PLAY_ORDER, MediaStore.Audio.Playlists.Members.AUDIO_ID };

        Cursor playlistCursor = context.getContentResolver().query(playlistUri, projection, null, null, null);
        Cursor musicCursor = context.getContentResolver().query(musicUri, null, null, null, null);

        ArrayList<Long> songIDList = new ArrayList<Long>();

        if (playlistCursor != null &&  playlistCursor.moveToFirst()) {
            do {
                long songID = playlistCursor.getLong(playlistCursor.getColumnIndex(MediaStore.Audio.Playlists.Members.AUDIO_ID));
                songIDList.add(songID);
            } while (playlistCursor.moveToNext());
        }
        count = songIDList.size();
        if(count != 0) {
            musicCursor.moveToFirst();
            do {
                if(songIDList.contains(musicCursor.getLong(musicCursor.getColumnIndex(MediaStore.Audio.Media._ID))))
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
}
