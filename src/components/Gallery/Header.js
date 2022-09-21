import React from "react";
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";

const HeaderWrapp = styled(Stack)`
  padding-top: 10px;

  position: fixed;

  background-color: #fff;
  width: 100%;

  & > h5 {
    flex: 1;
    text-align: right;
  }
`;

const SearchWrapp = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;
const Title = styled.h1`
  text-shadow: -0.5px 0 white, 0 0.5px white, 0.5px 0 white, 0 -0.5px white;
  flex: 1;
  text-align: center;
`;

function Header({
  setVideosInfoArray,
  allVideosInfoArray,
  setBackgroundVideo,
  setCurrentImgIndex,
  onChangeFocus,
}) {
  const [tab, setTab] = React.useState(0);

  const handleChange = (e, newTab) => {
    setTab(newTab);
  };

  const onSearch = (value) => {
    if (value === "") {
      return;
    } else {
      const searchedVideosInfoArray = allVideosInfoArray.filter((videosInfo) =>
        videosInfo.title.toLowerCase().includes(value.toLowerCase())
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

  return (
    <HeaderWrapp
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
    >
      <Title>Live Video Gallery</Title>

      <SearchWrapp>
        <TextField
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
        />
        <Tabs value={tab} onChange={handleChange} centered>
          <Tab
            label="Item One"
            onClick={() => {
              onFilterByTag("ALL");
              changeBackgroundVideo("ALL");
            }}
          />
          <Tab
            label="Item Two"
            onClick={() => {
              onFilterByTag("land scape");
              changeBackgroundVideo("land scape");
            }}
          />
          <Tab
            label="Item Three"
            onClick={() => {
              onFilterByTag("animal");
              changeBackgroundVideo("animal");
            }}
          />
        </Tabs>
      </SearchWrapp>
    </HeaderWrapp>
  );
}

export default Header;
