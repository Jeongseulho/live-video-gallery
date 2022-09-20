import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomeWrapp = styled.div`
  background-image: url("/assets/Home.jpg");
  height: 100%;
`;

const Title = styled.span`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid black;
`;

const MyLink = styled(Link)``;
function Home() {
  return (
    <HomeWrapp>
      <Title>
        <h1>Title</h1>
        <h5>description</h5>
        <MyLink to="/gallery"> 갤러리로 </MyLink>
      </Title>
    </HomeWrapp>
  );
}

export default Home;
