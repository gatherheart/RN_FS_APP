import React from "react";
import Title from "./Title";
import styled from "styled-components/native";

const Container = styled.View``;

const List = ({ title, children }) => {
  return (
    <>
      <Title title={title}></Title>
      <Container>{children}</Container>
    </>
  );
};

export default List;
