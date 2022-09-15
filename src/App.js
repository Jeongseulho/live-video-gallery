import React, { useState, useEffect } from "react";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import WatchVideo from "./components/WatchVideo";
import styled from "styled-components";

const AppWrapp = styled.div`
  z-index: 1;
`;

function App() {
  console.log("App 컴포넌트 렌더링");

  const [isClickThumbnail, setIsClickThumbnail] = useState(false);
  const [videosInfoArray, setVideosInfoArray] = useState([]);

  useEffect(() => {
    const getAllPlayList = async (key) => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UC6cAgLyar-QK2NInG7knd1Q&key=${key}`
        );
        const result = await response.json();
        const playListIdArray = result.items.map((item) => {
          return {
            id: item.id,
            tag: item.snippet.title,
          };
        });
        return playListIdArray;
      } catch (error) {
        console.log("error", error);
      }
    };

    const getPlayListInfo = async (key, playListId, tag) => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&maxResults=20&playlistId=${playListId}`
        );
        const playListInfo = await response.json();

        const myPlayListInfo = playListInfo.items.map((videoInfo) => {
          return {
            id: videoInfo.id,
            title: videoInfo.snippet.title,
            thumbnail_url: videoInfo.snippet.thumbnails.medium.url,
            tag,
          };
        });
        return myPlayListInfo;
      } catch (error) {
        console.log("error", error);
      }
    };

    async function getAllVideosInfo(key) {
      const playListIdArray = await getAllPlayList(key);

      let myAllPlayListInfo = [];
      for (const playListId of playListIdArray) {
        myAllPlayListInfo.push(
          await getPlayListInfo(key, playListId.id, playListId.tag)
        );
      }

      setVideosInfoArray(myAllPlayListInfo);
    }
    getAllVideosInfo(process.env.REACT_APP_API_KEY);
  }, []);

  return (
    <AppWrapp>
      <Header />
      <Gallery
        videosInfoArray={videosInfoArray}
        setIsClickThumbnail={setIsClickThumbnail}
      />
      ;
      {isClickThumbnail && (
        <WatchVideo setIsClickThumbnail={setIsClickThumbnail} />
      )}
    </AppWrapp>
  );
}

export default App;
