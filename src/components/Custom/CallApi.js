const CallApi = () => {
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

      const myPlayListInfo = playListInfo.items.map((videoInfo, index) => {
        return tag === "space" && (index === 0 || index === 1)
          ? {
              id: videoInfo.snippet.resourceId.videoId,
              title: videoInfo.snippet.title,
              thumbnail_url: videoInfo.snippet.thumbnails.medium.url,
              thumbnail_url_default: videoInfo.snippet.thumbnails.default.url,
              isFocused: true,
              isFavorite: false,
              tag,
            }
          : {
              id: videoInfo.snippet.resourceId.videoId,
              title: videoInfo.snippet.title,
              thumbnail_url: videoInfo.snippet.thumbnails.medium.url,
              thumbnail_url_default: videoInfo.snippet.thumbnails.default.url,
              isFocused: false,
              isFavorite: false,
              tag,
            };
      });

      return myPlayListInfo;
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    getAllPlayList,
    getPlayListInfo,
  };
};

export default CallApi;
