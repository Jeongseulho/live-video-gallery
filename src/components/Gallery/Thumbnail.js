import React from "react";

function Thumbnail({ thumbnail_url_default, index, setCurrentImgIndex }) {
  return (
    <>
      <img
        width="120px"
        height="90px"
        src={thumbnail_url_default}
        alt="loading"
        onClick={() => {
          setCurrentImgIndex(index);
        }}
      />
    </>
  );
}

export default Thumbnail;
