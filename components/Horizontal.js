import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import Poster from "./Poster";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { trimText } from "../utils/String";

// Horizontal Components

/*
                Title
  [ Picture ]   Tag
                Schedule
                Notice
*/

const Container = styled.View`
  padding: 0px 30px;
  margin-bottom: 30px;
  flex-direction: row;
  align-items: flex-start;
`;

const Data = styled.View`
  align-items: flex-start;
  width: 60%;
  margin-left: 25px;
`;

const Title = styled.Text`
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Horizontal = ({
  isTv = false,
  id,
  title,
  releaseDate,
  poster,
  overview,
}) => {
  const navigation = useNavigation();
  const goToGroup = () => {
    navigation.navigate("GroupStack", {});
  };
  return (
    <TouchableOpacity onPress={goToGroup}>
      <Container>
        <Poster url={poster} />
        <Data>
          {title ? <Title>{trimText(title, 30)}</Title> : null}
          {overview ? <Overview>{trimText(overview, 130)}</Overview> : null}
        </Data>
      </Container>
    </TouchableOpacity>
  );
};

Horizontal.propTypes = {};

export default Horizontal;
