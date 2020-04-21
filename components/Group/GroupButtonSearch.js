import React, { useEffect } from "react";
import styled from "styled-components";
import { Dimensions, StyleSheet, Animated } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Container = styled.View`
  background-color: #b1fbb1;
  width: ${(WIDTH * 25) / 100}px;
  height: ${(HEIGHT * 9) / 100}px;
  border-radius: 15px;
  justify-content: center;
  margin: 0px 7px 15px 7px;
`;

const SmallContainer = styled.View`
  background-color: #b1fbb1;
  width: ${(WIDTH * 25) / 100}px;
  height: ${(HEIGHT * 7) / 100}px;
  border-radius: 15px;
  justify-content: center;
  margin: 0px 7px 15px 7px;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  font-weight: 400;
`;

const GroupButtonSearch = ({
  size = "small",
  title,
  onPress,
  animation = false,
}) => {
  const position = new Animated.ValueXY({ x: 0, y: 20 });

  useEffect(() => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      bounciness: 25,
    }).start();
    console.log(position);
  }, []);

  if (animation) {
    return (
      <Animated.View
        style={{
          ...styles.container,
          ...styles.withShadow,
          transform: [...position.getTranslateTransform()],
        }}
      >
        <Button onPress={onPress}>
          <ButtonText>{title}</ButtonText>
        </Button>
      </Animated.View>
    );
  }

  if (size === "large")
    return (
      <Container style={styles.withShadow}>
        <Button onPress={onPress}>
          <ButtonText>{title}</ButtonText>
        </Button>
      </Container>
    );
  else {
    return (
      <SmallContainer style={styles.withShadow}>
        <Button onPress={onPress}>
          <ButtonText>{title}</ButtonText>
        </Button>
      </SmallContainer>
    );
  }
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
  container: {
    backgroundColor: "#b1fbb1",
    width: (WIDTH * 25) / 100,
    height: (HEIGHT * 9) / 100,
    borderRadius: 15,
    justifyContent: "center",
    marginRight: 7,
    marginLeft: 7,
    marginBottom: 15,
  },
});

export default GroupButtonSearch;
