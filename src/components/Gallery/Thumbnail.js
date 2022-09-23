import React from "react";
import styled from "styled-components";

function Thumbnail({ thumbnail_url, index }) {
  return (
    <>
      <img src={thumbnail_url} alt="loading" />
    </>
  );
}

export default Thumbnail;
