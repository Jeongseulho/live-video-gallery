import React, { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import CircularProgress from "@mui/material/CircularProgress";

const ItemWrapp = styled.div`
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

function Item({ id, isFocused }) {
  const [isVideoReady, setIsVideoReady] = useState(false);

  return (
    <>
      {isFocused ? (
        <ItemWrapp>
          <LoadingIcon $isVideoReady={isVideoReady} />
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            controls={true}
            onReady={() => setIsVideoReady(true)}
          />
        </ItemWrapp>
      ) : (
        <ItemWrapp>
          <LoadingIcon $isVideoReady={isVideoReady} />
        </ItemWrapp>
      )}
    </>
  );
}

export default Item;