import React from "react";

function Thumbnail({ thumbnail_url, index, setCurrentImgIndex }) {
  return (
    <>
      <img
        width="120px"
        height="90px"
        src={thumbnail_url}
        alt="loading"
        onClick={() => {
          setCurrentImgIndex(index);
        }}
      />
    </>
  );
}

export default Thumbnail;
