import React, { useState } from "react";
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
        setBackgroundVideo(
          "https://www.pexels.com/ko-kr/video/8345564/download/?fps=25.0&h=1080&w=1920"
        );
        return;
      case "land scape":
        setBackgroundVideo(
          "https://www.pexels.com/ko-kr/video/4471213/download/?h=1080&w=1920"
        );
        return;
      case "animal":
        setBackgroundVideo(
          "https://www.pexels.com/ko-kr/video/5220279/download/?fps=25.0&h=1080&w=1920"
        );
        return;
      case "space":
        setBackgroundVideo(
          "https://www.pexels.com/ko-kr/video/3194277/download/?fps=29.97&h=1080&w=1920"
        );
        return;
      case "under water":
        setBackgroundVideo(
          "https://www.pexels.com/ko-kr/video/3765059/download/?fps=29.97&h=1080&w=1920"
        );
        return;
      case "street":
        setBackgroundVideo(
          "https://www.pexels.com/ko-kr/video/854621/download/?fps=25.0&h=1080&w=1920"
        );
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
