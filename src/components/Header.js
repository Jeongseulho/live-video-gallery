import React from "react";
import { Input } from "antd";
import Tags from "./Tags";
import "antd/dist/antd.min.css";
import styled from "styled-components";

const HeaderWrapp = styled.div`
  margin: 0 auto;
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  & > h5 {
    flex: 1;
    text-align: right;
  }
`;

const SearchWrapp = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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

  return (
    <HeaderWrapp>
      <SearchWrapp>
        <Input.Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        />
        <Tags
          setVideosInfoArray={setVideosInfoArray}
          allVideosInfoArray={allVideosInfoArray}
          setBackgroundVideo={setBackgroundVideo}
          setCurrentImgIndex={setCurrentImgIndex}
          onChangeFocus={onChangeFocus}
        />
      </SearchWrapp>

      <Title>Live Video Gallery</Title>
      <h5>Jeong Seulho</h5>
    </HeaderWrapp>
  );
}

export default Header;
