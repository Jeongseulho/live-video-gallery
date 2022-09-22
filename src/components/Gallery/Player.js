import React, { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import CircularProgress from "@mui/material/CircularProgress";

const PlayerWrapp = styled.div`
  position: relative;
  width: 640px;
  height: 360px;
`;

const LoadingIcon = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
  display: ${(props) => (props.$isVideoReady ? "none" : "")};
`;

function Player({ id, isFocused }) {
  const [isVideoReady, setIsVideoReady] = useState(false);

  return (
    <>
      {isFocused ? (
        <PlayerWrapp>
          <LoadingIcon $isVideoReady={isVideoReady} />
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            controls={true}
            onReady={() => setIsVideoReady(true)}
          />
        </PlayerWrapp>
      ) : (
        <PlayerWrapp>
          <LoadingIcon $isVideoReady={isVideoReady} />
        </PlayerWrapp>
      )}
    </>
  );
}

export default Player;
