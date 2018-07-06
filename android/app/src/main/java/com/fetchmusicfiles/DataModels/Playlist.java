package com.fetchmusicfiles.DataModels;

public class Playlist {
    private String playlistName;
    private long playlistID;

    public Playlist(String playlistName, long playlistID) {
        this.playlistName = playlistName;
        this.playlistID = playlistID;
    }

    public String getPlaylistName() {
        return playlistName;
    }

    public void setPlaylistName(String playlistName) {
        this.playlistName = playlistName;
    }

    public long getPlaylistID() {
        return playlistID;
    }

    public void setPlaylistID(long playlistID) {
        this.playlistID = playlistID;
    }
}
