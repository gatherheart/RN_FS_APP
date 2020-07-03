import React, { useState } from "react";
import styled from "styled-components";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import { StyleSheet, Dimensions, Animated } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default () => (
  <Animated.View>
    <ImageContainer></ImageContainer>
  </Animated.View>
);

const ImageContainer = ({
  source = {
    uri:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
  },
}) => {
  const _baseScale = new Animated.Value(1);
  const _pinchScale = new Animated.Value(1);
  const _focal = new Animated.ValueXY();

  console.log("AAAA");
  const [currIndex, setCurrIndex] = useState(0);

  const _scale = Animated.multiply(_baseScale, _pinchScale);
  let _lastScale = 1;
  const state = new Animated.Value(State.UNDETERMINED);
  const _onPinchGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          scale: _pinchScale,
          focalX: _focal.x,
          focalY: _focal.y,
          state: state,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const _onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      _lastScale *= event.nativeEvent.scale;
      _baseScale.setValue(_lastScale);
      _pinchScale.setValue(1);
    }
  };
  return (
    <Animated.ScrollView horizontal pagingEnabled>
      <PinchGestureHandler
        onGestureEvent={_onPinchGestureEvent}
        onHandlerStateChange={_onPinchHandlerStateChange}
        simultaneousHandlers={[]}
      >
        <Animated.View
          style={{
            ...styles.imageContainer,
            transform: [{ translateY: -WIDTH }],
            borderColor: "white",
            borderWidth: 1,
          }}
          onMomentumScrollEnd={(event) => {
            setCurrIndex(event.nativeEvent.contentOffset.x / WIDTH);
          }}
        >
          <Animated.Image
            source={source}
            style={[
              styles.zoomableImage,
              {
                transform: [{ perspective: 200 }, { scale: _scale }],
              },
            ]}
          />
        </Animated.View>
      </PinchGestureHandler>
      <PinchGestureHandler
        onGestureEvent={_onPinchGestureEvent}
        onHandlerStateChange={_onPinchHandlerStateChange}
        simultaneousHandlers={[]}
      >
        <Animated.View
          style={{
            ...styles.imageContainer,
            transform: [{ translateY: -WIDTH }],
            borderColor: "white",
            borderWidth: 1,
          }}
        >
          <Animated.Image
            source={source}
            style={[
              styles.zoomableImage,
              {
                transform: [{ perspective: 200 }, { scale: _scale }],
              },
            ]}
          />
        </Animated.View>
      </PinchGestureHandler>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 0,
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    zIndex: 2,
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    top: "50%",
    width: WIDTH,
    height: HEIGHT,
  },
  zoomableImage: {
    height: undefined,
    width: "100%",
    aspectRatio: 1,
  },
});
