import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "./Header";
import ThumbnailSlide from "./ThumbnailSlide";
import PlayerSlide from "./PlayerSlide";
import Description from "./Description";

const BackGroundVideoWrapp = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: -100;
  background-color: black;

  & > video {
    object-fit: cover;
    animation: fadein 3s forwards;
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const WhiteBoxWrapp = styled.div`
  position: absolute;
  left: 5%;
  top: 25%;
  width: 90%;
  height: 80%;
  background-color: rgba(255, 255, 255, 0.5);
`;

function Gallery() {
  const [backgroundVideo, setBackgroundVideo] = useState("/assets/ALL.mp4");
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [videosInfoArray, setVideosInfoArray] = useState([]);
  const allVideosInfoArray = useRef([]);
  const [displayGallery, setDisplayGallery] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    const getAllPlayList = async (key) => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UC6cAgLyar-QK2NInG7knd1Q&key=${key}`
        );
        const result = await response.json();
        const playListIdArray = result.items.map((item) => {
          return {
            id: item.id,
            tag: item.snippet.title,
          };
        });
        return playListIdArray;
      } catch (error) {
        console.log("error", error);
      }
    };

    const getPlayListInfo = async (key, playListId, tag) => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&maxResults=20&playlistId=${playListId}`
        );
        const playListInfo = await response.json();

        const myPlayListInfo = playListInfo.items.map((videoInfo, index) => {
          return tag === "space" && (index === 0 || index === 1)
            ? {
                id: videoInfo.snippet.resourceId.videoId,
                title: videoInfo.snippet.title,
                thumbnail_url: videoInfo.snippet.thumbnails.default.url,
                isFocused: true,
                isFavorite: false,
                tag,
              }
            : {
                id: videoInfo.snippet.resourceId.videoId,
                title: videoInfo.snippet.title,
                thumbnail_url: videoInfo.snippet.thumbnails.default.url,
                isFocused: false,
                isFavorite: false,
                tag,
              };
        });

        return myPlayListInfo;
      } catch (error) {
        console.log("error", error);
      }
    };

    async function getAllVideosInfo(key) {
      const playListIdArray = await getAllPlayList(key);

      let my2DAllPlayListInfo = [];
      for (const playListId of playListIdArray) {
        my2DAllPlayListInfo.push(
          await getPlayListInfo(key, playListId.id, playListId.tag)
        );
      }

      let my1DAllPlayListInfo = [];
      my2DAllPlayListInfo.forEach((myPlayListInfo) => {
        my1DAllPlayListInfo = [...my1DAllPlayListInfo, ...myPlayListInfo];
      });

      if (localStorage.getItem("favoriteVideosInfoArray")) {
        my1DAllPlayListInfo.forEach((myPlayListInfo) => {
          JSON.parse(localStorage.getItem("favoriteVideosInfoArray")).forEach(
            (favoriteVideosInfo) => {
              if (favoriteVideosInfo.id === myPlayListInfo.id) {
                myPlayListInfo.isFavorite = true;
              }
            }
          );
        });
      } else {
        localStorage.setItem("favoriteVideosInfoArray", "");
      }

      allVideosInfoArray.current = my1DAllPlayListInfo;
      setVideosInfoArray(my1DAllPlayListInfo);
    }

    getAllVideosInfo(process.env.REACT_APP_API_KEY);
  }, []);

  const onNextSlide = () => {
    if (!(videosInfoArray.length - 1 <= currentImgIndex)) {
      onChangeFocus("next");
      setCurrentImgIndex((prev) => prev + 1);
    }
  };

  const onPrevSlide = () => {
    if (!(currentImgIndex === 0)) {
      onChangeFocus("prev");
      setCurrentImgIndex((prev) => prev - 1);
    }
  };

  const onChangeFocus = (mode, currentArray) => {
    switch (mode) {
      case "prev":
        setVideosInfoArray((videosInfoArray) =>
          videosInfoArray.map((videosInfo, index) =>
            currentImgIndex - 1 === index || currentImgIndex === index
              ? { ...videosInfo, isFocused: true }
              : { ...videosInfo, isFocused: false }
          )
        );

        return;

      case "current":
        setCurrentImgIndex(0);
        setVideosInfoArray(
          currentArray.map((videosInfo, index) =>
            0 === index || 1 === index
              ? { ...videosInfo, isFocused: true }
              : { ...videosInfo, isFocused: false }
          )
        );

        return;

      case "next":
        setVideosInfoArray((videosInfoArray) =>
          videosInfoArray.map((videosInfo, index) =>
            currentImgIndex === index || currentImgIndex + 1 === index
              ? { ...videosInfo, isFocused: true }
              : { ...videosInfo, isFocused: false }
          )
        );

        return;

      default:
        return;
    }
  };

  return (
    <main>
      <BackGroundVideoWrapp>
        <video
          width="100%"
          height="100%"
          autoPlay
          loop
          muted
          key={backgroundVideo}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      </BackGroundVideoWrapp>

      <Header
        setVideosInfoArray={setVideosInfoArray}
        setBackgroundVideo={setBackgroundVideo}
        setCurrentImgIndex={setCurrentImgIndex}
        onChangeFocus={onChangeFocus}
        setDisplayGallery={setDisplayGallery}
        setCurrentTab={setCurrentTab}
        allVideosInfoArray={allVideosInfoArray}
      />
      {displayGallery ? (
        <WhiteBoxWrapp>
          <PlayerSlide
            onPrevSlide={onPrevSlide}
            onNextSlide={onNextSlide}
            videosInfoArray={videosInfoArray}
            currentImgIndex={currentImgIndex}
            setVideosInfoArray={setVideosInfoArray}
            allVideosInfoArray={allVideosInfoArray}
            setCurrentImgIndex={setCurrentImgIndex}
          ></PlayerSlide>

          <ThumbnailSlide
            videosInfoArray={videosInfoArray}
            currentImgIndex={currentImgIndex}
          ></ThumbnailSlide>
        </WhiteBoxWrapp>
      ) : (
        <Description
          currentTab={currentTab}
          setDisplayGallery={setDisplayGallery}
        />
      )}
    </main>
  );
}

export default Gallery;
