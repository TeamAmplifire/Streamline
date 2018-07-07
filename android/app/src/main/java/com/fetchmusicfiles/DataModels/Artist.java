package com.fetchmusicfiles.DataModels;

public class Artist {

    private String artistName;
    private long artistID;

    public Artist(String artistName, long artistID) {
        this.artistName = artistName;
        this.artistID = artistID;
    }

    public String getArtistName() {

        return artistName;
    }

    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    public long getArtistID() {
        return artistID;
    }

    public void setArtistID(long artistID) {
        this.artistID = artistID;
    }


}
