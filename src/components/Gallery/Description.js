import React from "react";
import styled from "styled-components";

const DescriptionWrapp = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Button = styled.button`
  background: rgba(0, 0, 0, 0);
  color: black;
  z-index: 1;
  position: relative;

  &:after {
    position: absolute;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    direction: rtl;
    z-index: -1;
    background: rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
  }

  &:hover:after {
    left: auto;
    right: 0;
    width: 100%;
  }
  & > p,
  & > svg {
    font-size: 2rem;
  }
`;

function Description({ currentTab, setDisplayGallery }) {
  const tabContArr = [
    <div>
      <h1>all 제목</h1> <p>all 내용</p>
      <Button variant="outlined" onClick={() => setDisplayGallery(true)}>
        <p>Explore ALL Contents</p>
      </Button>
    </div>,

    <div>
      <h1>all 제목</h1> <p>all 내용</p>
      <Button variant="outlined" onClick={() => setDisplayGallery(true)}>
        <p>Explore ALL Contents</p>
      </Button>
    </div>,
    <div>
      <h1>all 제목</h1> <p>all 내용</p>
      <Button variant="outlined" onClick={() => setDisplayGallery(true)}>
        <p>Explore ALL Contents</p>
      </Button>
    </div>,
    <div>
      <h1>all 제목</h1> <p>all 내용</p>
      <Button variant="outlined" onClick={() => setDisplayGallery(true)}>
        <p>Explore ALL Contents</p>
      </Button>
    </div>,
    <div>
      <h1>all 제목</h1> <p>all 내용</p>
      <Button variant="outlined" onClick={() => setDisplayGallery(true)}>
        <p>Explore ALL Contents</p>
      </Button>
    </div>,
    <div>
      <h1>all 제목</h1> <p>all 내용</p>
      <Button variant="outlined" onClick={() => setDisplayGallery(true)}>
        <p>Explore ALL Contents</p>
      </Button>
    </div>,
    <div>
      <h1>There is no Favorite Video</h1>
    </div>,
  ];

  return <DescriptionWrapp>{tabContArr[currentTab]}</DescriptionWrapp>;
}

export default Description;
