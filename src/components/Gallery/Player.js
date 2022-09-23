import React, { useState } from "react";
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

function Player({ id, isFocused, isFavortie, onToggleFavorite }) {
  const [heart, SetHeart] = useState(isFavortie);
  return (
    <>
      {isFocused ? (
        <PlayerWrapp>
          {heart ? (
            <FavoriteIcon
              sx={{ color: "red" }}
              onClick={() => {
                onToggleFavorite(isFavortie);
                SetHeart((prev) => !prev);
              }}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{ color: "red" }}
              onClick={() => {
                onToggleFavorite(isFavortie);
                SetHeart((prev) => !prev);
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
