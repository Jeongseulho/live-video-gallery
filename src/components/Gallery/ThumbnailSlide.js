import React from "react";
import styled from "styled-components";
import Thumbnail from "./Thumbnail";

const ThumbnailSlideWrapp = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 35px;
  & > img:nth-child(1) {
    border: 2px solid green;
  }
`;

function ThumbnailSlide({ videosInfoArray }) {
  return (
    <ThumbnailSlideWrapp>
      {videosInfoArray.map((videosInfo) => (
        <Thumbnail
          thumbnail_url={videosInfo.thumbnail_url}
          key={videosInfo.id}
        />
      ))}
    </ThumbnailSlideWrapp>
  );
}

export default ThumbnailSlide;
