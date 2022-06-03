import React, { useEffect, useState } from "react";
import axios from "axios";

import { ARTIST_ALBUM, ARTIST_API, CORS } from "../constants";

import AlbumCard from "../components/album_card";
import Suggestions from "../components/querySuggestion";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../scss/querySuggestion.scss";

import "../scss/home.scss";
import TrackTable from "../components/trackTable";

export default function Home() {
  const [artistId, setArtistId] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [artistData, setArtistData] = useState(undefined);
  const [albumList, setAlbumList] = useState(undefined);
  const [albumData, setAlbumData] = useState(undefined);
  const [tracklist, setTracklist] = useState(undefined);
  const [querySuggestion, setQuerySuggestion] = useState(undefined);

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
    });
  }, [artistId]);

  function handleSearch() {
    setAlbumData(undefined);
    try {
      axios.get(ARTIST_API + searchQuery).then((data) => {
        setQuerySuggestion(data.data.data);
        console.log(data.data.data);
        setArtistId(data.data.data[0].id);
        setArtistData(data.data.data[0]);
      });
    } finally {
      console.log("something went wrong");
    }
  }

  function handleChange(input) {
    axios.get(ARTIST_API + searchQuery).then((data) => {
      setQuerySuggestion(data.data.data);
      console.log(data.data.data);
    });
    setSearchQuery(input.target.value);
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
        <div className="searchFormContainer">
          <form className="form">
            <input
              type="text"
              className="searchInput"
              placeholder="Search here"
              autoComplete="true"
              onChange={handleChange}
            />
          </form>

          <ul className="suggestions">
            {searchQuery.length > 2 &&
            searchQuery.length % 2 === 0 &&
            searchQuery !== undefined ? (
              querySuggestion.map((value, index) => {
                return (
                  <li key={index} onClick={handleSearch}>
                    {value.name}
                  </li>
                );
              })
            ) : (
              <p style={{ display: "none" }}></p>
            )}
          </ul>

          {/* <ul className="suggestions">
            {querySuggestion !== undefined ? (
              querySuggestion.map((value, index) => {
                return <li key={index}>{value.name}</li>;
              })
            ) : (
              <p></p>
            )}
          </ul> */}
        </div>

        <button className="submitButton" onClick={handleSearch} type="submit">
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
                <h2>{albumData.title}</h2>
              </div>

              <div className="albumSpecific_tableContainer">
                <div className="albumSpecific_tableContainer_tableHeader">
                  <p>Title</p>
                  <p>Artist</p>
                  <p>Time</p>
                  {/* <p>Released</p> */}
                </div>

                {/* test code that runs another API call to display track details from within albumData */}

                {/* <div>
                  {axios.get(CORS + albumData.tracklist).then((tracks) => {
                    setTracklist(tracks.data.data);

                    return tracklist.map((value, index) => {
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
                  })}
                </div> */}

                {albumData.tracks.data.map((value, index) => {
                  console.log(albumData.tracks.data);
                  return (
                    <div
                      className="albumSpecific_tableContainer_trackTable"
                      key={index}
                    >
                      <ul className="trackContainer">
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
                          {value.duration > 100
                            ? addStr(value.duration.toString(), 1, ":")
                            : addStr(value.duration.toString(), 0, "0:")}
                        </li>
                      </ul>
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
