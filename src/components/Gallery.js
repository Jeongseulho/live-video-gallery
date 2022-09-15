import React from "react";
import Item from "./Item";
import styled from "styled-components";

const GalleryWrapp = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15%, 20%));
  gap: 10px;
  margin-left: 10px;
`;

function Gallery({ videosInfoArray, setIsClickThumbnail }) {
  console.log("Gallery 컴포넌트 렌더링");
  return (
    <GalleryWrapp>
      {videosInfoArray.map((videosInfo) =>
        videosInfo.map((videoInfo) => (
          <Item
            setIsClickThumbnail={setIsClickThumbnail}
            id={videoInfo.id}
            title={videoInfo.title}
            thumbnail_url={videoInfo.thumbnail_url}
            tag={videoInfo.tag}
            key={videoInfo.id}
          />
        ))
      )}
    </GalleryWrapp>
  );
}

export default Gallery;
