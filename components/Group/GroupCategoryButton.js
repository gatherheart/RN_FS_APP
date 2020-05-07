import React, { useEffect, useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { Dimensions, StyleSheet, Animated } from "react-native";
import { useRoute } from "@react-navigation/native";

/* 
Button Components of
Filtering Page 
(First Category and Second Category screens of group search navigation)
*/

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Container = styled.View`
  background-color: #b1fbb1;
  width: ${(WIDTH * 25) / 100}px;
  height: ${(HEIGHT * 9) / 100}px;
  border-radius: 15px;
  margin: 0px 7px 15px 7px;
`;

const SmallContainer = styled.View`
  background-color: #b1fbb1;
  width: ${(WIDTH * 25) / 100}px;
  height: ${(HEIGHT * 7) / 100}px;
  border-radius: 15px;
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
  font-family: ${(props) => props.theme.regularFont};
`;

/**
 *
 * @param {String} size button size
 * @param {String} title text in button
 * @param {Function} onPress unction on pressing button
 * @param {Boolean} animation enable animation event
 * @return {node} button component
 *
 */

const GroupButtonSearch = ({
  size = "small",
  title,
  onPress,
  animation = false,
}) => {
  const themeContext = useContext(ThemeContext);
  const position = new Animated.ValueXY({ x: 0, y: loaded ? 0 : 15 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      bounciness: 20,
    }).start();
    setLoaded(true);
  }, [loaded]);

  if (animation && size === "large") {
    return (
      <Animated.View
        style={{
          ...styles.container,
          ...themeContext.withShadow,
          backgroundColor: themeContext.lightGreenColor,
          transform: [...position.getTranslateTransform()],
        }}
      >
        <Button onPress={onPress}>
          <ButtonText>{title}</ButtonText>
        </Button>
      </Animated.View>
    );
  } else if (animation && size === "small") {
    return (
      <Animated.View
        style={{
          ...styles.smallContainer,
          ...themeContext.withShadow,
          backgroundColor: themeContext.lightGreenColor,
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
      <Container
        style={{
          ...themeContext.withShadow,
          backgroundColor: themeContext.lightGreenColor,
        }}
      >
        <Button onPress={onPress}>
          <ButtonText>{title}</ButtonText>
        </Button>
      </Container>
    );
  else {
    return (
      <SmallContainer
        style={{
          ...themeContext.withShadow,
          backgroundColor: themeContext.lightGreenColor,
        }}
      >
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
    width: (WIDTH * 25) / 100,
    height: (HEIGHT * 9) / 100,
    borderRadius: 15,
    justifyContent: "center",
    marginRight: 7,
    marginLeft: 7,
    marginBottom: 15,
  },
  smallContainer: {
    width: (WIDTH * 25) / 100,
    height: (HEIGHT * 7) / 100,
    borderRadius: 15,
    justifyContent: "center",
    marginRight: 7,
    marginLeft: 7,
    marginBottom: 15,
  },
});

export default GroupButtonSearch;
