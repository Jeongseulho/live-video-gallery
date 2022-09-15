import React from "react";
import styled from "styled-components";

const ItemWrapp = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e2e2e2;
  & > img {
    width: 100%;
    height: 100%;
  }
`;

function Item({ id, title, thumbnail_url, tag, setIsClickThumbnail }) {
  return (
    <ItemWrapp>
      <h3>{title}</h3>
      <img
        src={thumbnail_url}
        alt={"loading"}
        onClick={() => setIsClickThumbnail(true)}
      />
      <p>{`#${tag}`}</p>
    </ItemWrapp>
  );
}

export default Item;
