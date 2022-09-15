import React from "react";
import styled from "styled-components";

const WatchVideoWrapp = styled.div`
  position: fixed;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
  z-index: 2;
`;

function WatchVideo({ setIsClickThumbnail }) {
  return (
    <WatchVideoWrapp
      onClick={() => setIsClickThumbnail(false)}
    ></WatchVideoWrapp>
  );
}

export default WatchVideo;
