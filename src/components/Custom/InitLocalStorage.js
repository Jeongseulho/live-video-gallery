const InitLocalStorage = (my1DAllPlayListInfo) => {
  if (localStorage.getItem("favoriteVideosInfoArray")) {
    my1DAllPlayListInfo.forEach((myPlayListInfo) => {
      JSON.parse(localStorage.getItem("favoriteVideosInfoArray")).forEach(
        (favoriteVideosInfo) => {
          if (favoriteVideosInfo.id === myPlayListInfo.id) {
            myPlayListInfo.isFavorite = true;
          }
        }
      );
    });
  } else {
    localStorage.setItem("favoriteVideosInfoArray", "");
  }
};

export default InitLocalStorage;
