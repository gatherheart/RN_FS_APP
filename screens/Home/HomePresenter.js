import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import ScrollContainer from "../../components/ScrollContainer";
import Horizontal from "../../components/Horizontal";
import List from "../../components/List";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Container = styled.View``;

const SliderContainer = styled.View`
  width: 100%;
  height: ${HEIGHT / 4}px;
  margin-bottom: 40px;
`;

export default ({ refreshFn, loading }) => (
  <ScrollContainer refreshFn={refreshFn} loading={loading}>
    <>
      <Container>
        <List title={"Groups"}>
          <Horizontal
            key={1}
            id={1}
            title={"title"}
            poster={null}
            overview={null}
          ></Horizontal>
        </List>
      </Container>
    </>
  </ScrollContainer>
);
