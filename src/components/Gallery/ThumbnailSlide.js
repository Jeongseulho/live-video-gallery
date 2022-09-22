import React from "react";
import styled, { css } from "styled-components";
import Thumbnail from "./Thumbnail";

const ThumbnailSlideWrapp = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 35px;
  ${(props) =>
    css`
      & > img:nth-child(${props.currentImgIndex + 1}) {
        border: 3px dashed red;
      }
    `}
`;

function ThumbnailSlide({ videosInfoArray, currentImgIndex }) {
  return (
    <ThumbnailSlideWrapp currentImgIndex={currentImgIndex}>
      {videosInfoArray.map((videosInfo, index) => (
        <Thumbnail
          thumbnail_url={videosInfo.thumbnail_url}
          key={videosInfo.id}
          index={index}
        />
      ))}
    </ThumbnailSlideWrapp>
  );
}

export default ThumbnailSlide;
