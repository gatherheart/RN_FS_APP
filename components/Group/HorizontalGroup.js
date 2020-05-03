import React from "react";
import styled from "styled-components/native";
import Poster from "../Poster";
import PropTypes from "prop-types";
import { TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { trimText } from "../../utils/String";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

// Horizontal Components

/*
                Title
  [ Picture ]   Tag
                Schedule
                Notice
*/

const CardContainer = styled.View`
  width: ${(WIDTH * 90) / 100}px;
  height: ${(HEIGHT * 30) / 100}px;
  border-radius: 10px;
  border-color: grey;
  margin: 0px 0px 0px 0px;
  padding: 5px 10px 0px 0px;
`;

const Title = styled.Text``;

const HorizontalGroup = ({
  groupName,
  description,
  tags,
  applicable,
  applicableDate,
  poster,
}) => {
  const navigation = useNavigation();
  const goToGroup = () => {
    navigation.navigate("Group", { id, groupName });
  };
  return (
    <CardContainer>
      <Title>{groupName}</Title>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  withShadow: {
    backgroundColor: "#FFF",
    borderWidth: 0,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 1,
    shadowOffset: {
      height: 2.5,
      width: 2.5,
    },
  },
});

HorizontalGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  applicable: PropTypes.bool.isRequired,
};

export default HorizontalGroup;
