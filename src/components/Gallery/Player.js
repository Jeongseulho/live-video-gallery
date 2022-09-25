import React from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const PlayerWrapp = styled.div`
  position: relative;
  width: 640px;
  height: 384px;
  & > svg {
    cursor: pointer;
  }
  & > img {
    position: absolute;
    top: 28px;
    width: 640px;
    height: 355px;
  }
`;

function Player({
  id,
  isFocused,
  isFavorite,
  onToggleFavorite,
  thumbnail_url,
}) {
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
          <img src={thumbnail_url} alt="loading" />
        </PlayerWrapp>
      )}
    </>
  );
}

export default Player;
