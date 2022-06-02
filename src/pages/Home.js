import React, { useEffect, useState } from "react";
import axios from "axios";

import { ARTIST_ALBUM, ARTIST_API, CORS } from "../constants";

import AlbumCard from "../components/album_card";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "../scss/home.scss";
import TrackTable from "../components/trackTable";

export default function Home() {
  const [artistId, setArtistId] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [artistData, setArtistData] = useState(undefined);
  const [albumList, setAlbumList] = useState([]);
  const [albumData, setAlbumData] = useState(undefined);

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

  function handleSearch(e) {
    axios.get(ARTIST_API + searchQuery).then((data) => {
      setArtistId(data.data.data[0].id);
      setArtistData(data.data.data[0]);
      e.preventDefault();
    });
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

        <button className="submitButton" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="queryResult">
        {searchQuery === "" ? (
          <h2>Search results for</h2>
        ) : (
          <h2>Search results for "{searchQuery}"</h2>
        )}
      </div>

      {/* Album display  */}

      <div>
        <h2 className="albumTitle">ALBUMS</h2>
      </div>

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
            <p> please search an artist </p>
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
                <img
                  src={albumData.cover_medium}
                  alt="album cover"
                  width="34%"
                  height="auto"
                />
                <h2>{albumData.title}</h2>
              </div>

              <div className="albumSpecific_tableContainer">
                <div className="albumSpecific_tableContainer_tableHeader">
                  <p>Title</p>
                  <p>Artist</p>
                  <p>Time</p>
                  {/* <p>Released</p> */}
                </div>

                {/* {axios.get(CORS + albumData.tracklist).then((tracks) => {
                  tracks.data.data.data.map((value, index) => {
                    return (
                      <div
                        className="albumSpecific_tableContainer_trackTable"
                        key={index}
                      >
                        <li
                          className="albumSpecific_tableContainer_diskNumber
                          albumItem"
                        >
                          {value.disk_number}
                        </li>
                        <li className="albumSpecific_tableContainer_songTitle albumItem">
                          {value.title_short}
                        </li>
                        <li className="albumSpecific_tableContainer_artistName albumItem">
                          {value.artist.name}
                        </li>

                        <li className="albumSpecific_tableContainer_trackDuration albumItem">
                          {addStr(value.duration.toString(), 1, ":")}
                        </li>
                      </div>
                    );
                  });
                })} */}

                {albumData.tracks.data.map((value, index) => {
                  console.log(albumData.tracks.data);
                  return (
                    <div
                      className="albumSpecific_tableContainer_trackTable"
                      key={index}
                    >
                      <div className="trackContainer">
                        {/* <li
                          className="albumSpecific_tableContainer_diskNumber
                          albumItem"
                        >
                          {value.disk_number}
                        </li> */}
                        <li className="albumSpecific_tableContainer_songTitle albumItem">
                          {value.title_short}
                        </li>
                        <li className="albumSpecific_tableContainer_artistName albumItem">
                          {value.artist.name}
                        </li>
                        <li className="albumSpecific_tableContainer_trackDuration albumItem">
                          {value.duration > 100
                            ? addStr(value.duration.toString(), 1, ":")
                            : addStr(value.duration.toString(), 0, "0:")}
                        </li>
                      </div>
                    </div>
                  );
                })}
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
