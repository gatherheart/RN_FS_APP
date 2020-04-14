import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import ScrollContainer from "../../components/ScrollContainer";
import Horizontal from "../../components/Horizontal";
import List from "../../components/List";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Container = styled.View``;

const result = {
  groups: [
    {
      name: "Golf Groups",
      id: 1,
      tag: ["Game", "Play", "Sports"],
      schedule: "Schedule #1",
      notice: "Go to Home",
      poster: "",
    },
    {
      name: "Soccer Groups",
      id: 2,
      tag: ["Game", "Sports"],
      schedule: "Schedule #1",
      notice: "Go to School",
      poster: "",
    },
    {
      name: "Golf Groups",
      id: 3,
      tag: [],
      schedule: "Schedule #3",
      notice: "Go to Home",
      poster: "",
    },
  ],
};

const SliderContainer = styled.View`
  width: 100%;
  height: ${HEIGHT / 4}px;
  margin-bottom: 40px;
`;

export default ({ refreshFn, loading }) => {
  const { groups } = result;
  return (
    <ScrollContainer refreshFn={refreshFn} loading={loading}>
      <>
        <Container>
          <List title={"Groups"}>
            {groups.map((group) => (
              <Horizontal
                key={group.id}
                id={group.id}
                tag={group.tag}
                schedule={group.schedule}
                notice={group.notice}
                groupName={group.name}
                poster={group.poster}
              ></Horizontal>
            ))}
          </List>
        </Container>
      </>
    </ScrollContainer>
  );
};
