import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "./Header";
import ThumbnailSlide from "./ThumbnailSlide";
import PlayerSlide from "./PlayerSlide";
import Description from "./Description";
import CallApi from "../Custom/CallApi";
import InitLocalStorage from "../Custom/InitLocalStorage";

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

  async function getAllVideosInfo(key) {
    const playListIdArray = await CallApi().getAllPlayList(key);

    let my2DAllPlayListInfo = [];
    for (const playListId of playListIdArray) {
      my2DAllPlayListInfo.push(
        await CallApi().getPlayListInfo(key, playListId.id, playListId.tag)
      );
    }

    let my1DAllPlayListInfo = [];
    my2DAllPlayListInfo.forEach((myPlayListInfo) => {
      my1DAllPlayListInfo = [...my1DAllPlayListInfo, ...myPlayListInfo];
    });

    return my1DAllPlayListInfo;
  }

  async function initGallery(key) {
    const my1DAllPlayListInfo = await getAllVideosInfo(key);
    InitLocalStorage(my1DAllPlayListInfo);

    allVideosInfoArray.current = my1DAllPlayListInfo;
    setVideosInfoArray(my1DAllPlayListInfo);
  }

  useEffect(() => {
    initGallery(process.env.REACT_APP_API_KEY);
  }, []);

  const onNextSlide = () => {
    if (!(videosInfoArray.length - 1 <= currentImgIndex)) {
      setCurrentImgIndex((prev) => prev + 1);
    }
  };

  const onPrevSlide = () => {
    if (!(currentImgIndex === 0)) {
      setCurrentImgIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    onChangeFocus();
  }, [currentImgIndex]);

  const onChangeFocus = () => {
    setVideosInfoArray((videosInfoArray) =>
      videosInfoArray.map((videosInfo, index) =>
        currentImgIndex === index
          ? { ...videosInfo, isFocused: true }
          : { ...videosInfo, isFocused: false }
      )
    );
  };

  const onResetFocus = (newVideosInfoArray) => {
    setCurrentImgIndex(0);
    setVideosInfoArray(
      newVideosInfoArray.map((videosInfo, index) =>
        0 === index
          ? { ...videosInfo, isFocused: true }
          : { ...videosInfo, isFocused: false }
      )
    );
  };

  return (
    <main>
      <BackGroundVideoWrapp>
        {backgroundVideo === "" ? (
          <img
            src="https://jeongseulho.github.io/live-video-gallery/assets/Favorite.jpg"
            alt="loading"
          />
        ) : (
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
        )}
      </BackGroundVideoWrapp>

      <Header
        setBackgroundVideo={setBackgroundVideo}
        onResetFocus={onResetFocus}
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
            setCurrentImgIndex={setCurrentImgIndex}
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
