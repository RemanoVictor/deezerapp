import React, { useEffect, useState } from "react";
import axios from "axios";

import { ARTIST_ALBUM, ARTIST_API, CORS } from "../constants";

import AlbumCard from "../components/album_card";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "../scss/home.scss";

export default function Home() {
  const [artistId, setArtistId] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [albumList, setAlbumList] = useState(undefined);
  const [albumData, setAlbumData] = useState(undefined);
  const [tracklist, setTracklist] = useState(undefined);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    if (artistId === undefined) return;

    axios.get(ARTIST_ALBUM + artistId + "/albums").then((albums) => {
      setAlbumList(albums.data.data);
      console.log(albums.data.data);
    });
  }, [artistId]);

  useEffect(() => {
    if (albumData === undefined) return;

    axios.get(CORS + albumData.tracklist).then((data) => {
      setTracklist(data.data.data);
    });
  }, [albumData]);

  function handleSearch() {
    setAlbumData(undefined);
    try {
      axios.get(ARTIST_API + searchQuery).then((data) => {
        setArtistId(data.data.data[0].id);
      });
    } finally {
      console.log("something went wrong");
    }
  }

  function addStr(str, index, stringToAdd) {
    return (
      str.substring(0, index) + stringToAdd + str.substring(index, str.length)
    );
  }

  return (
    <div className="mainDiv">
      {/* Search input code */}

      <div className="searchDiv">
        <form className="form">
          <input
            type="text"
            className="searchInput"
            placeholder="Search here"
            autoComplete="true"
            onChange={(input) => {
              setSearchQuery(input.target.value);
            }}
          />
        </form>

        <button className="submitButton" onClick={handleSearch} type="submit">
          Search
        </button>
      </div>

      <div className="queryResult">
        {searchQuery === "" ? (
          <p></p>
        ) : (
          <h2>Search results for "{searchQuery}"</h2>
        )}
      </div>

      {/* Album display  */}
      {albumList === undefined ? (
        <div>
          <h2 className="albumTitle"> Please search for an artist... </h2>
        </div>
      ) : (
        <div>
          <h2 className="albumTitle">ALBUMS</h2>
        </div>
      )}

      <div className="albumsList">
        <Carousel
          responsive={responsive}
          autoPlay={false}
          className="albumCarousel"
        >
          {albumList !== undefined ? (
            albumList.map((value, index) => {
              return (
                <AlbumCard
                  title={value.title}
                  key={index}
                  img={value.cover_medium}
                  id={value.id}
                  getAlbumData={setAlbumData}
                />
              );
            })
          ) : (
            <p></p>
          )}
        </Carousel>
      </div>
      <span className="underline"></span>

      {/* Album Tracklist */}

      <div className="albumSpecific">
        {albumData !== undefined ? (
          (console.log(albumData, "album data"),
          (
            <>
              <div className="albumSpecific_Details">
                <img src={albumData.cover_medium} alt="album cover" />
                <div className="albumName_Artist">
                  <h2>{albumData.artist.name}</h2>
                  <h3>{albumData.title}</h3>
                </div>
              </div>

              <div className="albumSpecific_tableContainer">
                <div className="albumSpecific_tableContainer_tableHeader">
                  <p>#</p>
                  <p>Title</p>
                  <p>Artist</p>
                  <p>Time</p>
                  <p>Released</p>
                </div>

                {tracklist !== undefined ? (
                  tracklist.map((value, index) => {
                    return (
                      <div
                        className="albumSpecific_tableContainer_trackTable"
                        key={index}
                      >
                        <ul className="trackContainer">
                          <li>{value.track_position}</li>
                          <li className="albumSpecific_tableContainer_songTitle albumItem">
                            {value.title_short}
                          </li>
                          <li className="albumSpecific_tableContainer_artistName albumItem">
                            {value.artist.name}
                          </li>
                          <li className="albumSpecific_tableContainer_trackDuration albumItem">
                            {value.duration >= 100
                              ? addStr(value.duration.toString(), 1, ":")
                              : addStr(value.duration.toString(), 0, "0:")}
                          </li>
                          <li>
                            {albumData.release_date.toString().substring(0, 4)}
                          </li>
                        </ul>
                      </div>
                    );
                  })
                ) : (
                  <p></p>
                )}
              </div>
            </>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
