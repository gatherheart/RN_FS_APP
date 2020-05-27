import React, {
  useState,
  useRef,
  forwardRef,
  useEffect,
  createRef,
} from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";
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
import { Text } from "react-native";

const View = styled.View``;

const Container = styled.View`
  height: ${HEIGHT}px;
  position: relative;
  justify-content: center;
  z-index: 2;
`;

const saveImage = async ({ url }) => {
  const uri = await downloadAsync(images[0].url);
  saveToLibrary(uri);
};

const SlideImageModal = ({ changeViewerState, imgViewerVisible, images }) => {
  const swiperRef = useRef(null);

  const goToNext = () => {
    swiperRef.current?.scrollTo(2, true);
  };
  return (
    <Modal
      visible={imgViewerVisible}
      transparent={false}
      backgroundColor={"black"}
      onRequestClose={() => changeViewerState()}
      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        <ImageSlider images={images} index={0} ref={swiperRef}></ImageSlider>
      </View>
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

        <TouchableOpacity onPress={goToNext}>
          <CustomIcon
            name="download"
            size={30}
            style={{ marginHorizontal: 20 }}
            color={"white"}
          ></CustomIcon>
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.rightButton }}>
        <TouchableWithoutFeedback
          onPress={changeHeaderState}
          style={styles.floatingButton}
        >
          <Text>ABDDD</Text>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const ImageSlider = forwardRef(({ images, index }, ref) => {
  return images ? (
    <Swiper
      showsPagination={false}
      index={index}
      showsPagination={false}
      style={{ zIndex: 0 }}
      ref={ref}
    >
      {images.map((image, idx) => (
        <ImageContainer source={image.uri} key={`image-silder-${idx}`} />
      ))}
    </Swiper>
  ) : null;
});

const ImageContainer = ({ source }) => (
  <Container>
    <Image
      source={{
        uri: source,
      }}
      style={{
        height: undefined,
        width: "100%",
        aspectRatio: 1,
      }}
    />
  </Container>
);

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: "100%",
    marginHorizontal: 0,
    margin: 0,
    alignItems: "center",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    top: StatusHeight,
    borderColor: "white",
    borderBottomWidth: 1,
    position: "absolute",
    zIndex: 2,
    width: WIDTH,
    height: HeaderHeight,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightButton: {
    top: StatusHeight,
    position: "absolute",
    zIndex: 1,
    width: WIDTH,
    height: HEIGHT - StatusHeight,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  floatingButton: {
    height: HEIGHT,
    width: WIDTH,
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
