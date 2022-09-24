import React from "react";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
import ArrowCircleLeftTwoToneIcon from "@mui/icons-material/ArrowCircleLeftTwoTone";
import styled from "styled-components";
import Player from "./Player";

const PlayerSlideWrapp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const VideoWrapp = styled.div`
  width: 640px;
  height: 384px;
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

function PlayerSlide({
  onPrevSlide,
  onNextSlide,
  videosInfoArray,
  currentImgIndex,
  setVideosInfoArray,
  setAllVideosInfoArray,
  allVideosInfoArray,
}) {
  const onToggleFavorite = (isFavorite) => {
    setVideosInfoArray((videosInfoArray) =>
      videosInfoArray.map((videosInfo, index) =>
        currentImgIndex === index
          ? { ...videosInfo, isFavorite: !isFavorite }
          : { ...videosInfo }
      )
    );

    setAllVideosInfoArray((allVideosInfoArray) =>
      allVideosInfoArray.map((videosInfo, index) =>
        currentImgIndex === index
          ? { ...videosInfo, isFavorite: !isFavorite }
          : { ...videosInfo }
      )
    );

    const filteredVideosInfoArray = allVideosInfoArray.filter(
      (videosInfo) => videosInfo.isFavorite
    );

    localStorage.setItem(
      "favoriteVideosInfoArray",
      JSON.stringify(filteredVideosInfoArray)
    );
  };

  return (
    <PlayerSlideWrapp>
      <ArrowCircleLeftTwoToneIcon
        style={{ fontSize: "3rem", cursor: "pointer" }}
        onClick={onPrevSlide}
      />
      <VideoWrapp>
        <AllVideosWrapp currentImgIndex={currentImgIndex}>
          {videosInfoArray.map((videosInfo) => (
            <Player
              id={videosInfo.id}
              key={videosInfo.id}
              isFocused={videosInfo.isFocused}
              isFavorite={videosInfo.isFavorite}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </AllVideosWrapp>
      </VideoWrapp>
      <ArrowCircleRightTwoToneIcon
        style={{ fontSize: "3rem", cursor: "pointer" }}
        onClick={onNextSlide}
      />
    </PlayerSlideWrapp>
  );
}

export default PlayerSlide;
