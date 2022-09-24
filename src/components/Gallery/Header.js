import React from "react";
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
  justify-content: space-between;
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
  setVideosInfoArray,
  allVideosInfoArray,
  setBackgroundVideo,
  setCurrentImgIndex,
  onChangeFocus,
  setDisplayGallery,
  setCurrentTab,
}) {
  const [tab, setTab] = React.useState(0);

  const handleChange = (e, newTab) => {
    setTab(newTab);
  };

  const onSearch = (e) => {
    if (!(e.target.value === "")) {
      const searchedVideosInfoArray = allVideosInfoArray.filter((videosInfo) =>
        videosInfo.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      onChangeFocus("current", searchedVideosInfoArray);
    }
  };

  const onFilterByTag = (tag) => {
    setCurrentImgIndex(0);
    if (tag === "ALL") {
      setVideosInfoArray(allVideosInfoArray);
    } else {
      const filteredVideosInfoArray = allVideosInfoArray.filter(
        (videosInfo) => videosInfo.tag === tag
      );
      onChangeFocus("current", filteredVideosInfoArray);
    }
  };

  const changeBackgroundVideo = (tag) => {
    switch (tag) {
      case "ALL":
        setBackgroundVideo("/assets/ALL.mp4");
        return;
      case "land scape":
        setBackgroundVideo("/assets/land scape.mp4");
        return;
      case "animal":
        setBackgroundVideo("/assets/animal.mp4");
        return;
      case "space":
        setBackgroundVideo("/assets/space.mp4");
        return;
      case "under water":
        setBackgroundVideo("/assets/under water.mp4");
        return;
      case "street":
        setBackgroundVideo("/assets/street.mp4");
        return;
      default:
        return;
    }
  };

  const onTab = (tag, index) => {
    return (
      <Tab
        key={tag}
        label={tag}
        onClick={() => {
          onFilterByTag(tag);
          changeBackgroundVideo(tag);
          setDisplayGallery(false);
          setCurrentTab(index);
        }}
      />
    );
  };

  const onMyFavorite = () => {
    onChangeFocus(
      "current",
      JSON.parse(localStorage.getItem("favoriteVideosInfoArray"))
    );

    setDisplayGallery(true);
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
            onClick={onMyFavorite}
          />
        </Tabs>
      </SearchWrapp>
    </HeaderWrapp>
  );
}

export default Header;
