package com.fetchmusicfiles.DataModels;

import java.util.ArrayList;

public class SongCollection {

    private static SongCollection ourInstance = new SongCollection();

    private SongCollection() {
    }

    private ArrayList<Song> listOfSongs = new ArrayList<>();

    public ArrayList<Song> getListOfSongs() {
        return listOfSongs;
    }

    public void setListOfSongs(ArrayList<Song> listOfSongs) {
        this.listOfSongs = listOfSongs;
    }

    public static SongCollection getInstance() {
        return ourInstance;
    }
}
