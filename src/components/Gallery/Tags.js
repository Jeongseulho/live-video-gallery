import React from "react";
import { Tag } from "antd";
import styled from "styled-components";

const TagsWrapp = styled.div`
  margin: 10px 0px 10px 10px;
`;

function Tags({
  setVideosInfoArray,
  allVideosInfoArray,
  setBackgroundVideo,
  setCurrentImgIndex,

  onChangeFocus,
}) {
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
    <TagsWrapp>
      <Tag
        color="black"
        style={{ cursor: "pointer" }}
        onClick={() => {
          onFilterByTag("ALL");
          changeBackgroundVideo("ALL");
        }}
      >
        ALL
      </Tag>
      <Tag
        color="#87d068"
        style={{ cursor: "pointer" }}
        onClick={() => {
          onFilterByTag("land scape");
          changeBackgroundVideo("land scape");
        }}
      >
        #land scape
      </Tag>
      <Tag
        color="#DAA520"
        style={{ cursor: "pointer" }}
        onClick={() => {
          onFilterByTag("animal");
          changeBackgroundVideo("animal");
        }}
      >
        #animal
      </Tag>
      <Tag
        color="#f50"
        style={{ cursor: "pointer" }}
        onClick={() => {
          onFilterByTag("space");
          changeBackgroundVideo("space");
        }}
      >
        #space
      </Tag>
      <Tag
        color="#108ee9"
        style={{ cursor: "pointer" }}
        onClick={() => {
          onFilterByTag("under water");
          changeBackgroundVideo("under water");
        }}
      >
        #under water
      </Tag>
      <Tag
        color="violet"
        style={{ cursor: "pointer" }}
        onClick={() => {
          onFilterByTag("street");
          changeBackgroundVideo("street");
        }}
      >
        #street
      </Tag>
    </TagsWrapp>
  );
}

export default Tags;
