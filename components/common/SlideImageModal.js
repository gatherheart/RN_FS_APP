import React, { useState, useRef, forwardRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Text,
  Animated,
  StatusBar,
} from "react-native";
import Modal from "react-native-modal";
import CustomIcon from "./CustomIcon";
import {
  UnderHeader,
  StatusHeight,
  HeaderHeight,
} from "../../utils/HeaderHeight";
const SWIPER_HEIGHT = HEIGHT / 2;
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
import { downloadAsync, saveToLibrary } from "../../utils/GetImage";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const View = styled.View``;

const Container = styled.View`
  height: ${HEIGHT}px;
  position: relative;
  justify-content: center;
  z-index: 1;
`;
const SliderContainer = styled.View`
  width: 100%;
  height: ${HEIGHT / 4}px;
  margin-bottom: 40px;
`;

const saveImage = async ({ url }) => {
  const uri = await downloadAsync(images[0].url);
  saveToLibrary(uri);
};

const SlideImageModal = ({ changeViewerState, imgViewerVisible, images }) => {
  const swiperRef = useRef(null);
  const position = new Animated.ValueXY();

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onResponderTerminationRequest: () => false,
    onStartShouldSetPanResponder: (evt, gestureState) => true,

    onPanResponderMove: (event, { dx, dy }) => {
      console.log("MOVE", dx, dy);
      position.setValue({ x: dx, y: dy });
      return true;
    },
    onPanResponderRelease: (event, { dx, dy }) => {
      console.log("RELEASE", dx, dy);

      if (dx >= 40) goToNext(-1);
      else if (dx <= -40) goToNext(1);
      else {
        console.log("NO Move");
      }
      return true;
    },
  });
  const goToNext = (dist = 1) => {
    swiperRef.current?.scrollBy(dist, true);
  };
  return (
    <Modal
      isVisible={imgViewerVisible}
      transparent={true}
      backgroundColor={"black"}
      onRequestClose={() => changeViewerState()}
      style={styles.modal}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating={false}
      useNativeDriver={true}
      animationIn={{ from: { opacity: 1 }, to: { opacity: 1 } }}
      animationOut={{ from: { opacity: 0 }, to: { opacity: 0 } }}
    >
      <View style={styles.modalContainer}>
        <ImageSlider images={images} index={0} ref={swiperRef}></ImageSlider>
      </View>
      {/*<Animated.View
        {...panResponder.panHandlers}
        style={{
          borderColor: "white",
          borderWidth: 1,
          height: HEIGHT,
          width: WIDTH,
          backgroundColor: "white",
          opacity: 0,
          position: "absolute",
          zIndex: 2,
        }}
      ></Animated.View>*/}
      <FloatingButton
        changeViewerState={changeViewerState}
        goToNext={goToNext}
      ></FloatingButton>
    </Modal>
  );
};

const FloatingButton = ({ changeViewerState, goToNext }) => {
  const [headerShown, setHeaderShown] = useState(false);
  const changeHeaderState = () => {
    setHeaderShown((prev) => !prev);
  };
  return (
    <>
      <View style={{ ...styles.buttonContainer, opacity: headerShown ? 0 : 1 }}>
        <TouchableOpacity onPress={changeViewerState}>
          <CustomIcon
            name="arrow-back"
            size={30}
            style={{ marginHorizontal: 20 }}
            color={"white"}
          ></CustomIcon>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => goToNext(1)}>
          <CustomIcon
            name="download"
            size={30}
            style={{ marginHorizontal: 20 }}
            color={"white"}
          ></CustomIcon>
        </TouchableOpacity>
      </View>
    </>
  );
};

const ImageSlider = forwardRef(({ images, index }, ref) => {
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onResponderTerminationRequest: () => false,
    onStartShouldSetPanResponder: (evt, gestureState) => true,

    onPanResponderMove: (event, { dx, dy }) => {
      console.log("MOVE", dx, dy);
    },
    onPanResponderRelease: (event, { dx, dy }) => {
      console.log("RELEASE", dx, dy);
    },
  });

  return images ? (
    <Swiper
      showsPagination={false}
      scrollEnabled={true}
      ref={ref}
      index={index}
      onTouchEnd={() => console.log("A")}
      style={{}}
      loop={false}
    >
      {images.map((image, idx) => (
        <ImageContainer source={image.uri} key={`image-silder-${idx}`} />
      ))}
    </Swiper>
  ) : null;
});

const ImageContainer = ({ source }) => (
  <Animated.View
    style={{
      ...styles.imageContainer,
      transform: [{ translateY: -WIDTH / 2 }],
    }}
  >
    <Animated.Image
      source={{
        uri: source,
      }}
      style={{
        height: undefined,
        width: "100%",
        aspectRatio: 1,
      }}
    />
  </Animated.View>
);

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
  buttonContainer: {
    bottom: StatusHeight,
    position: "absolute",
    zIndex: 2,
    width: WIDTH,
    height: HeaderHeight,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    top: "50%",
  },
});

SlideImageModal.prototypes = {
  imgViewerVisible: PropTypes.bool.isRequired,
  changeViewerState: PropTypes.func.isRequired,
};
ImageSlider.propTypes = {
  images: PropTypes.array,
};

export default SlideImageModal;
