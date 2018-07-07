package com.fetchmusicfiles.DataModels;

import java.util.ArrayList;

public class AlbumCollection {
    private static AlbumCollection ourInstance = new AlbumCollection();

    private AlbumCollection() {
    }

    private ArrayList<Album> listOfAlbums = new ArrayList<>();

    public ArrayList<Album> getListOfAlbums() {
        return listOfAlbums;
    }

    public void setListOfAlbums(ArrayList<Album> listOfAlbums) {
        this.listOfAlbums = listOfAlbums;
    }

    public static AlbumCollection getInstance() {
        return ourInstance;
    }
}
