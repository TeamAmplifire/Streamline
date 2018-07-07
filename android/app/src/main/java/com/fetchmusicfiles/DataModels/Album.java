package com.fetchmusicfiles.DataModels;

public class Album {

    private String albumName;
    private long albumID;

    public Album(String albumName, long albumID) {
        this.albumName = albumName;
        this.albumID = albumID;
    }

    public String getAlbumName() {

        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public long getAlbumID() {
        return albumID;
    }

    public void setAlbumID(long albumID) {
        this.albumID = albumID;
    }
}
