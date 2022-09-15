import React from "react";
import { Input, PageHeader, Button } from "antd";
import Tags from "./Tags";
import "antd/dist/antd.min.css";
import styled from "styled-components";

const PageHeaderWrapp = styled.div`
  padding: 24px;
  background-color: #f5f5f5;
`;

const SearchWrapp = styled.div`
  margin-left: 10px;
  margin-top: 24px;
  width: 25vw;
`;

function Header() {
  const onSearch = (value) => console.log(value);

  return (
    <header>
      <PageHeaderWrapp>
        <PageHeader
          ghost={false}
          title="Title"
          subTitle="This is a subtitle"
          extra={[
            <Button key="3" type="primary">
              Primary
            </Button>,
          ]}
        />
      </PageHeaderWrapp>
      <SearchWrapp>
        <Input.Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        />
      </SearchWrapp>

      <Tags />
    </header>
  );
}

export default Header;
