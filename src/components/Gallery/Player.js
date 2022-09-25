import React from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CircularProgress from "@mui/material/CircularProgress";

const PlayerWrapp = styled.div`
  position: relative;
  width: 640px;
  height: 360px;
  & > svg {
    cursor: pointer;
  }
`;
const CircularProgressWrapp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

function Player({ id, isFocused, isFavorite, onToggleFavorite }) {
  return (
    <>
      {isFocused ? (
        <PlayerWrapp>
          {isFavorite ? (
            <FavoriteIcon
              sx={{ color: "red" }}
              onClick={() => {
                onToggleFavorite(isFavorite, id);
              }}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{ color: "red" }}
              onClick={() => {
                onToggleFavorite(isFavorite, id);
              }}
            />
          )}
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            controls={true}
          />
        </PlayerWrapp>
      ) : (
        <PlayerWrapp>
          <CircularProgressWrapp>
            <CircularProgress />
          </CircularProgressWrapp>
        </PlayerWrapp>
      )}
    </>
  );
}

export default Player;
