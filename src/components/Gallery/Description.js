import React from "react";
import styled from "styled-components";

const DescriptionWrapp = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

function Description({ currentTab, setDisplayGallery }) {
  const tabContArr = [
    <div>
      <h1>all 제목</h1> <h5>all 내용</h5>
    </div>,
    <div>
      <h1>space 제목</h1> <h5>space 내용</h5>
    </div>,
  ];

  return (
    <DescriptionWrapp>
      {tabContArr[currentTab]}
      <button onClick={() => setDisplayGallery(true)}>갤러리 보기</button>
    </DescriptionWrapp>
  );
}

export default Description;
