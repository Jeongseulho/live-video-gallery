import React from "react";
import styled from "styled-components";

const ThumbnailWrapp = styled.div`
  width: 120px;
  height: 90px;
`;

function Thumbnail({ thumbnail_url, index }) {
  return (
    <>
      <img src={thumbnail_url} alt="loading" />
    </>
  );
}

export default Thumbnail;
