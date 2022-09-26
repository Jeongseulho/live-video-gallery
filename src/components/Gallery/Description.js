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
      <h1>ALL Contents</h1>
      <p>
        ALL Contents include Space, Under Water, City, Nature, on the Train, on
        the Boat, etc...
      </p>
      <Button variant="outlined" onClick={() => setDisplayGallery(true)}>
        <p>Explore ALL Contents</p>
      </Button>
    </div>,

    <div>
      <h1>Space Live Videos</h1>
      <p>
        live videos of the Earth from the ISS, You can watch these from two
        angles
      </p>
      <Button variant="outlined" onClick={() => setDisplayGallery(true)}>
        <p>Explore Space</p>
      </Button>
    </div>,
    <div>
      <h1>Land Scape Live Videos</h1>
      <p>
        Land Scape Live Videos include Beach, Sea, On the Train, on the Boat,
        etc...
      </p>
      <Button variant="outlined" onClick={() => setDisplayGallery(true)}>
        <p>Explore Land Scape Live Videos</p>
      </Button>
    </div>,
    <div>
      <h1>Animal Live Videos</h1>
      <p>
        Animal Live Videos include Namib Dessert, Kalahari Dessert, Katmai
        National Park and cats, Lions, Elephants, Pandas, etc...
      </p>
      <Button variant="outlined" onClick={() => setDisplayGallery(true)}>
        <p>Explore Animal Live Videos</p>
      </Button>
    </div>,
    <div>
      <h1>Under Water Live Videos</h1>
      <p>
        Under Water Live Videos include Deerfield Beach, Frying Pan Sea and
        shark, etc...
      </p>
      <Button variant="outlined" onClick={() => setDisplayGallery(true)}>
        <p>Explore Under Water Live Videos</p>
      </Button>
    </div>,
    <div>
      <h1>Street Live Videos</h1>
      <p>
        Street Live Videos include Time Square, Shinjuku, New York, Venice,
        LonDon, etc...
      </p>
      <Button variant="outlined" onClick={() => setDisplayGallery(true)}>
        <p>Explore Street Live Videos</p>
      </Button>
    </div>,
    <div>
      <h1>There is no Favorite Video</h1>
    </div>,
  ];

  return <DescriptionWrapp>{tabContArr[currentTab]}</DescriptionWrapp>;
}

export default Description;
