import React from "react";
import styled from "styled-components";
import { Dimensions, StyleSheet } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Container = styled.View`
  background-color: #b1fbb1;
  width: ${(WIDTH * 40) / 100}px;
  height: ${(HEIGHT * 5) / 100}px;
  border-radius: 5px;
  justify-content: center;
  margin: 10px 0px 10px 0px;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  font-weight: 400;
`;

const GroupButton = ({ title, onclickFunc }) => {
  return (
    <Container style={styles.withShadow}>
      <Button onPress={onclickFunc}>
        <ButtonText>{title}</ButtonText>
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  withShadow: {
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 1,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
});

export default GroupButton;
