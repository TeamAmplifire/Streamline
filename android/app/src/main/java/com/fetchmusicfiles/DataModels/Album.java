package com.fetchmusicfiles.DataModels;

public class Album {

    private String name;
    private long id;
    private String albumArt;

    public Album(String name, long id, String albumArt) {
        this.name = name;
        this.id = id;
        this.albumArt = albumArt;
    }

    public String getName() {

        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
