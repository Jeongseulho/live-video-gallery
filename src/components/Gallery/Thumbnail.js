import React from "react";

function Thumbnail({
  thumbnail_url,
  index,
  setCurrentImgIndex,
  onChangeFocus,
}) {
  const onClickThumbnail = (index) => {
    console.log(index);
    setCurrentImgIndex(index);
    onChangeFocus("clickThumbnail");
  };
  return (
    <>
      <img
        src={thumbnail_url}
        alt="loading"
        onClick={() => {
          onClickThumbnail(index);
        }}
      />
    </>
  );
}

export default Thumbnail;
