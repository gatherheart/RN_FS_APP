import React, { useState } from "react";
import styled from "styled-components";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import { StyleSheet, Dimensions, Animated, Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

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
const images = [
  {
    // Simplest usage.
    url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",

    // width: number
    // height: number
    // Optional, if you know the image size, you can set the optimization performance

    // You can pass props to <Image />.
    props: {
      // headers: ...
    },
  },
  {
    url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
    props: {
      // Or you can set source directory.
    },
  },
];
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
    <View>
      <Modal visible={true} transparent={true}>
        <ImageViewer imageUrls={images} />
      </Modal>
    </View>
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
