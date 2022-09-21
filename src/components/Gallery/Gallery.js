import React, { useState, useEffect } from "react";
import Item from "./Item";
import styled from "styled-components";
import Thumbnail from "./Thumbnail";
import Header from "./Header";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
import ArrowCircleLeftTwoToneIcon from "@mui/icons-material/ArrowCircleLeftTwoTone";

const VideosWrapp = styled.div`
  width: 640px;
  height: 360px;
  overflow: hidden;
  position: relative;
`;

const AllVideosWrapp = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  transform: ${(props) => `translateX(-${640 * props.currentImgIndex}px)`};
  transition: all 2s ease-in-out;
`;

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

const GallerySlide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const ThumbnailWrapp = styled.div`
  display: flex;
`;

const WhiteBoxWrapp = styled.div`
  position: absolute;
  left: 10%;
  top: 100%;
  width: 80%;
  height: 55%;
  background-color: rgba(255, 255, 255, 0.5);
`;

function Gallery() {
  const [backgroundVideo, setBackgroundVideo] = useState("/assets/ALL.mp4");
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [videosInfoArray, setVideosInfoArray] = useState([]);
  const [allVideosInfoArray, setallVideosInfoArray] = useState([]);

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
                thumbnail_url: videoInfo.snippet.thumbnails.medium.url,
                isFocused: true,
                tag,
              }
            : {
                id: videoInfo.snippet.resourceId.videoId,
                title: videoInfo.snippet.title,
                thumbnail_url: videoInfo.snippet.thumbnails.medium.url,
                isFocused: false,
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

      setVideosInfoArray(my1DAllPlayListInfo);
      setallVideosInfoArray(my1DAllPlayListInfo);
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
        allVideosInfoArray={allVideosInfoArray}
        setBackgroundVideo={setBackgroundVideo}
        setCurrentImgIndex={setCurrentImgIndex}
        onChangeFocus={onChangeFocus}
      />
      <WhiteBoxWrapp>
        <GallerySlide>
          <ArrowCircleLeftTwoToneIcon
            style={{ fontSize: "3rem" }}
            onClick={onPrevSlide}
          />
          <VideosWrapp>
            <AllVideosWrapp currentImgIndex={currentImgIndex}>
              {videosInfoArray.map((videosInfo) => (
                <Item
                  id={videosInfo.id}
                  key={videosInfo.id}
                  isFocused={videosInfo.isFocused}
                />
              ))}
            </AllVideosWrapp>
          </VideosWrapp>
          <ArrowCircleRightTwoToneIcon
            style={{ fontSize: "3rem" }}
            onClick={onNextSlide}
          />
        </GallerySlide>

        <ThumbnailWrapp>
          {videosInfoArray.map((videosInfo) => (
            <Thumbnail
              thumbnail_url={videosInfo.thumbnail_url}
              key={videosInfo.id}
            />
          ))}
        </ThumbnailWrapp>
      </WhiteBoxWrapp>
    </main>
  );
}

export default Gallery;
