import React, {
  useState,
  useRef,
  forwardRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Text,
  Animated,
  StatusBar,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import CustomIcon from "./CustomIcon";
import { AntDesign } from "@expo/vector-icons";
import {
  UnderHeader,
  StatusHeight,
  HeaderHeight,
} from "../../utils/HeaderHeight";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
const SWIPER_HEIGHT = HEIGHT / 2;
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
import { downloadAsync, saveToLibrary } from "../../utils/GetImage";

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

const saveImage = async (url) => {
  console.log(url);
  const uri = await downloadAsync(url);
  saveToLibrary(uri);
};

const ImageContext = createContext();

const useImages = () => {
  const { images } = useContext(ImageContext);
  return images;
};
const useImgViewerVisible = () => {
  const { imgViewerVisible } = useContext(ImageContext);
  return imgViewerVisible;
};
const useChangeViewerState = () => {
  const { changeViewerState } = useContext(ImageContext);
  return changeViewerState;
};

// Make a Component that provide context regarding to images
const ImageProvider = ({
  images,
  imgViewerVisible,
  changeViewerState,
  children,
}) => {
  return (
    <ImageContext.Provider
      value={{ images, imgViewerVisible, changeViewerState }}
    >
      {children}
    </ImageContext.Provider>
  );
};

const SlideImageModal = ({
  changeViewerState,
  imgViewerVisible,
  images,
  index,
}) => {
  StatusBar.setHidden(imgViewerVisible, "fade");

  const flashRef = useRef(null);
  const swiperRef = useRef(null);
  const goToNext = (dist = 1) => {
    swiperRef.current?.scrollBy(dist, true);
  };
  return (
    <ImageProvider
      images={images}
      imgViewerVisible={imgViewerVisible}
      changeViewerState={changeViewerState}
    >
      <Modal
        isVisible={imgViewerVisible}
        transparent={true}
        backgroundColor={"black"}
        onRequestClose={() => {
          changeViewerState();
        }}
        backdropOpacity={0}
        style={styles.modal}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        animationIn={{ from: { opacity: 1 }, to: { opacity: 1 } }}
        animationOut={{ from: { opacity: 0 }, to: { opacity: 0 } }}
      >
        <View style={styles.modalContainer}>
          <ImageSlider
            goToNext={goToNext}
            index={index}
            ref={swiperRef}
          ></ImageSlider>
        </View>
        <FlashMessage position="top" ref={flashRef} />
      </Modal>
    </ImageProvider>
  );
};
const animationValue = new Animated.Value(0);

const ImageSlider = forwardRef(({ index, goToNext }, ref) => {
  const changeViewerState = useChangeViewerState();
  const images = useImages();
  const viewRef = useRef();
  const [currIndex, setCurrIndex] = useState(index);

  const changeHeaderState = () => {
    if (animationValue._value === 1) {
      animationValue.setValue(0);
    } else {
      animationValue.setValue(1);
    }
  };

  useEffect(() => {
    console.log(index * WIDTH);
    setTimeout(
      () =>
        ref.current.scrollTo({
          x: index * WIDTH,
          y: 0,
          animated: false,
        }),
      0
    );
  }, []);

  return images ? (
    <>
      <ScrollView
        contentContainerStyle={{
          borderWidth: 1,
          borderColor: "white",
        }}
        horizontal={true}
        showsPagination={false}
        scrollEnabled={true}
        ref={ref}
        index={currIndex}
        pagingEnabled={true}
        onTouchEnd={(event) => {
          changeHeaderState();
        }}
        onMomentumScrollEnd={(event) => {
          setCurrIndex(event.nativeEvent.contentOffset.x / WIDTH);
        }}
      >
        {images.map((image, idx) => (
          <ImageContainer source={image.uri} key={`image-silder-${idx}`} />
        ))}
      </ScrollView>

      <FloatingButton
        changeViewerState={changeViewerState}
        ref={viewRef}
        animationValue={animationValue}
        currIndex={currIndex}
      ></FloatingButton>
    </>
  ) : null;
});

const FloatingButton = forwardRef(({ currIndex, animationValue }, ref) => {
  const changeViewerState = useChangeViewerState();
  const images = useImages();

  return (
    <>
      <Animated.View
        style={{
          ...styles.buttonContainer,
          opacity: animationValue,
        }}
        ref={ref}
      >
        <TouchableOpacity onPress={() => changeViewerState()}>
          <CustomIcon
            name="arrow-back"
            size={30}
            style={{ marginHorizontal: 20 }}
            color={"white"}
          ></CustomIcon>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            saveImage(images[currIndex].uri);
          }}
        >
          <AntDesign
            name="download"
            size={25}
            color={"white"}
            style={{
              marginHorizontal: 20,
            }}
          ></AntDesign>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
});

const ImageContainer = ({ source }) => (
  <Animated.View
    style={{
      ...styles.imageContainer,
      transform: [{ translateY: -WIDTH }],
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
    borderColor: "grey",
    borderTopWidth: 1,
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    top: "50%",
    width: WIDTH,
    height: HEIGHT,
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
