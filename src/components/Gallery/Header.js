import React, { useState } from "react";
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import allBackGround from "../../assets/ALL.mp4";
import animalBackGround from "../../assets/animal.mp4";
import landScapeBackGround from "../../assets/land-scape.mp4";
import spaceBackGround from "../../assets/space.mp4";
import underWaterBackGround from "../../assets/under-water.mp4";
import streetBackGround from "../../assets/street.mp4";

const HeaderWrapp = styled(Stack)`
  padding-top: 10px;
  position: fixed;
  background-color: #fff;
  width: 100%;
  z-index: 100;
`;

const SearchWrapp = styled.div`
  margin-top: 10px;
  display: flex;
`;
const Title = styled.h1`
  text-shadow: -0.5px 0 white, 0 0.5px white, 0.5px 0 white, 0 -0.5px white;
  flex: 1;
  text-align: center;
  margin-bottom: 10px;
`;

const FavoriteWrapp = styled.div`
  display: flex;
  margin-right: 10px;
  cursor: pointer;
`;

function Header({
  setBackgroundVideo,
  onResetFocus,
  setDisplayGallery,
  setCurrentTab,
  allVideosInfoArray,
}) {
  const [tab, setTab] = useState(0);

  const handleChange = (e, newTab) => {
    setTab(newTab);
  };

  const onSearch = (e) => {
    setDisplayGallery(true);
    const searchedVideosInfoArray = allVideosInfoArray.current.filter(
      (videosInfo) =>
        videosInfo.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    onResetFocus(searchedVideosInfoArray);
  };

  const onFilterByTag = (tag) => {
    if (tag === "ALL") {
      onResetFocus(allVideosInfoArray.current);
    } else {
      const filteredVideosInfoArray = allVideosInfoArray.current.filter(
        (videosInfo) => videosInfo.tag === tag
      );
      onResetFocus(filteredVideosInfoArray);
    }
  };

  const changeBackgroundVideo = (tag) => {
    switch (tag) {
      case "ALL":
        setBackgroundVideo(allBackGround);
        return;
      case "land scape":
        setBackgroundVideo(landScapeBackGround);
        return;
      case "animal":
        setBackgroundVideo(animalBackGround);
        return;
      case "space":
        setBackgroundVideo(spaceBackGround);
        return;
      case "under water":
        setBackgroundVideo(underWaterBackGround);
        return;
      case "street":
        setBackgroundVideo(streetBackGround);
        return;
      case "":
        setBackgroundVideo("");
        return;
      default:
        return;
    }
  };

  const displayTabVideos = (tag, index) => {
    onFilterByTag(tag);
    changeBackgroundVideo(tag);
    setDisplayGallery(false);
    setCurrentTab(index);
  };

  const onTab = (tag, index) => {
    return (
      <Tab
        key={tag}
        label={tag}
        onClick={() => {
          displayTabVideos(tag, index);
        }}
      />
    );
  };

  const onFilterByFavorite = () => {
    if (localStorage.getItem("favoriteVideosInfoArray") === "[]") {
      setDisplayGallery(false);
    } else {
      onResetFocus(JSON.parse(localStorage.getItem("favoriteVideosInfoArray")));

      setDisplayGallery(true);
    }
  };

  const displayFavoriteVideos = () => {
    onFilterByFavorite();
    setCurrentTab(6);
    changeBackgroundVideo("");
  };

  return (
    <HeaderWrapp>
      <Title>Live Video Gallery</Title>
      <Divider variant="middle" />
      <SearchWrapp>
        <TextField
          label="Search by Title"
          type="search"
          variant="filled"
          onChange={onSearch}
          sx={{ width: "30%" }}
        />
        <Tabs value={tab} onChange={handleChange} centered>
          {[
            "ALL",
            "space",
            "land scape",
            "animal",
            "under water",
            "street",
          ].map((tag, index) => onTab(tag, index))}
          <Tab
            label={
              <FavoriteWrapp>
                My Favorite
                <FavoriteIcon sx={{ color: "red" }} />
              </FavoriteWrapp>
            }
            onClick={displayFavoriteVideos}
          />
        </Tabs>
      </SearchWrapp>
    </HeaderWrapp>
  );
}

export default Header;
