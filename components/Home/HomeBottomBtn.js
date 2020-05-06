import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { Dimensions, StyleSheet } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Container = styled.TouchableOpacity`
  width: ${(WIDTH * 40) / 100}px;
  height: ${(HEIGHT * 5) / 100}px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin: 10px 0px 10px 0px;
`;

const Button = styled.TouchableOpacity``;

const ButtonText = styled.Text`
  font-weight: 400;
`;

const GroupButton = ({ title, onclickFunc }) => {
  const themeContext = useContext(ThemeContext);
  return (
    <Container
      style={{
        ...themeContext.withShadow,
        backgroundColor: themeContext.lightGreenColor,
      }}
      onPress={onclickFunc}
    >
      <ButtonText>{title}</ButtonText>
    </Container>
  );
};

export default GroupButton;
