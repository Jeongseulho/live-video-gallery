import React from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const PlayerWrapp = styled.div`
  position: relative;
  width: 640px;
  height: 360px;
  & > svg {
    cursor: pointer;
  }
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
                onToggleFavorite(isFavorite);
              }}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{ color: "red" }}
              onClick={() => {
                onToggleFavorite(isFavorite);
              }}
            />
          )}
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            controls={true}
          />
        </PlayerWrapp>
      ) : (
        <PlayerWrapp></PlayerWrapp>
      )}
    </>
  );
}

export default Player;
