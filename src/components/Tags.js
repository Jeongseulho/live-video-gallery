import React from "react";
import { Tag } from "antd";
import styled from "styled-components";

const TagsWrapp = styled.div`
  margin: 10px 0px 10px 10px;
`;

function Tags() {
  return (
    <TagsWrapp>
      <Tag color="#f50">#f50</Tag>
      <Tag color="#2db7f5">#2db7f5</Tag>
      <Tag color="#87d068">#87d068</Tag>
      <Tag color="#108ee9">#108ee9</Tag>
    </TagsWrapp>
  );
}

export default Tags;
