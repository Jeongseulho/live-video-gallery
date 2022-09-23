import React from "react";

function Thumbnail({ thumbnail_url, index }) {
  return (
    <>
      <img src={thumbnail_url} alt="loading" />
    </>
  );
}

export default Thumbnail;
