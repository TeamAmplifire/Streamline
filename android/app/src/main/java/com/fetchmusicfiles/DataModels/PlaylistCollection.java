package com.fetchmusicfiles.DataModels;

import java.util.ArrayList;

public class PlaylistCollection {
    private static PlaylistCollection ourInstance = new PlaylistCollection();

    private PlaylistCollection() {}

    private ArrayList<Playlist> listOfPlaylists = new ArrayList<>();

    public ArrayList<Playlist> getListOfPlaylists() {
        return listOfPlaylists;
    }

    public void setListOfPlaylists(ArrayList<Playlist> listOfPlaylists) { this.listOfPlaylists = listOfPlaylists;
    }

    public static PlaylistCollection getInstance() {
        return ourInstance;
    }
}
