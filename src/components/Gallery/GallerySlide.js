import React from "react";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
import ArrowCircleLeftTwoToneIcon from "@mui/icons-material/ArrowCircleLeftTwoTone";
import styled from "styled-components";
import Item from "./Item";

const GallerySlideWrapp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const VideoWrapp = styled.div`
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

function GallerySlide({
  onPrevSlide,
  onNextSlide,
  videosInfoArray,
  currentImgIndex,
}) {
  return (
    <GallerySlideWrapp>
      <ArrowCircleLeftTwoToneIcon
        style={{ fontSize: "3rem", cursor: "pointer" }}
        onClick={onPrevSlide}
      />
      <VideoWrapp>
        <AllVideosWrapp currentImgIndex={currentImgIndex}>
          {videosInfoArray.map((videosInfo) => (
            <Item
              id={videosInfo.id}
              key={videosInfo.id}
              isFocused={videosInfo.isFocused}
            />
          ))}
        </AllVideosWrapp>
      </VideoWrapp>
      <ArrowCircleRightTwoToneIcon
        style={{ fontSize: "3rem", cursor: "pointer" }}
        onClick={onNextSlide}
      />
    </GallerySlideWrapp>
  );
}

export default GallerySlide;
