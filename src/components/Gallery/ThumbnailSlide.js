import React from "react";
import styled, { css } from "styled-components";
import Thumbnail from "./Thumbnail";

const ThumbnailSlideWrapp = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 35px;
  & > img {
    box-sizing: border-box;
  }
  ${(props) =>
    css`
      & > img:nth-child(${props.currentImgIndex + 1}) {
        border: 2px dashed red;
      }
    `}
`;

function ThumbnailSlide({
  videosInfoArray,
  currentImgIndex,
  setCurrentImgIndex,
}) {
  return (
    <ThumbnailSlideWrapp currentImgIndex={currentImgIndex}>
      {videosInfoArray.map((videosInfo, index) => (
        <Thumbnail
          thumbnail_url_default={videosInfo.thumbnail_url_default}
          key={videosInfo.id}
          index={index}
          setCurrentImgIndex={setCurrentImgIndex}
        />
      ))}
    </ThumbnailSlideWrapp>
  );
}

export default ThumbnailSlide;
