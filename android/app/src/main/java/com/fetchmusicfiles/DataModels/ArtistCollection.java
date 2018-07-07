package com.fetchmusicfiles.DataModels;

import java.util.ArrayList;

public class ArtistCollection {
    private static ArtistCollection ourInstance = new ArtistCollection();

    private ArtistCollection() {
    }

    private ArrayList<Artist> listOfArtists = new ArrayList<>();

    public ArrayList<Artist> getListOfArtists() {
        return listOfArtists;
    }

    public void setListOfArtists(ArrayList<Artist> listOfArtists) {
        this.listOfArtists = listOfArtists;
    }

    public static ArtistCollection getInstance() {
        return ourInstance;
    }
}
