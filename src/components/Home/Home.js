import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomeWrapp = styled.div`
  background-image: url("https://jeongseulho.github.io/live-video-gallery/assets/Home.jpg");
  height: 100%;
  width: 100%;
`;

const Title = styled.span`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const linkStyle = {
  textDecoration: "none",
  color: "blue",
};

function Home() {
  return (
    <HomeWrapp>
      <Title>
        <h1>Live Videos Gallery</h1>
        <h5>This website provides a live video of my choice from YouTube.</h5>
        <h5>
          This video is divided into five categories, and you can choose your
          favorite videos.
        </h5>
        <Link to="/gallery" style={linkStyle}>
          Start Gallery
        </Link>
      </Title>
    </HomeWrapp>
  );
}

export default Home;
