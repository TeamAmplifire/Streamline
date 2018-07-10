package com.fetchmusicfiles.Update;

import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.Log;
import android.widget.Toast;

import org.cmc.music.common.ID3WriteException;
import org.cmc.music.metadata.IMusicMetadata;
import org.cmc.music.metadata.MusicMetadata;
import org.cmc.music.metadata.MusicMetadataSet;
import org.cmc.music.myid3.MyID3;

import java.io.File;
import java.io.IOException;

public class UpdateSongInfo {
    public static void updateID3Tags(Context context, String newTitle, String newAlbum, String newArtist, long songId, String fullPath) {
        ContentResolver musicResolver = context.getContentResolver();
        Uri musicUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
        String where = "_ID=?";
        String[] args = {Long.toString(songId)};
        ContentValues values = new ContentValues();
        values.put(MediaStore.Audio.Media.TITLE, newTitle);
        values.put(MediaStore.Audio.Media.ALBUM, newAlbum);
        values.put(MediaStore.Audio.Media.ARTIST, newArtist);
        musicResolver.update(musicUri, values, where, args);
        File songFile = new File(fullPath);
        MusicMetadataSet songFileSet = null;
        try {
            songFileSet = new MyID3().read(songFile);
        } catch (IOException e) {  }
        if (songFileSet == null) {
        } else {
            IMusicMetadata songMetadata = songFileSet.getSimplified();
            MusicMetadata newMusicMetadeta = new MusicMetadata(songFile.getName());
            newMusicMetadeta.setAlbum(newAlbum);
            newMusicMetadeta.setArtist(newArtist);
            newMusicMetadeta.setSongTitle(newTitle);
            try {
                new MyID3().update(songFile, songFileSet, newMusicMetadeta);
            } catch (IOException e) {
                e.printStackTrace();
            } catch (ID3WriteException e) {
                e.printStackTrace();
            }
        }
    }


}
