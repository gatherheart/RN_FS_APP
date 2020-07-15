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
  Platform,
  BackHandler,
} from "react-native";
import Modal from "react-native-modal";
import CustomIcon from "./CustomIcon";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  UnderHeader,
  StatusHeight,
  HeaderHeight,
  isIPhoneX,
} from "../../utils/HeaderHeight";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { downloadAsync, saveToLibrary } from "../../utils/GetImage";
import {
  State,
  PinchGestureHandler,
  ScrollView,
} from "react-native-gesture-handler";
import { cond, eq } from "react-native-reanimated";
import { useNavigation, useRoute } from "@react-navigation/native";
import ImageView from "react-native-image-viewing";

const SWIPER_HEIGHT = HEIGHT / 2;
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const Gesture = Object.freeze({
  PINCH: "pinch",
  SHIFT: "shift",
  DEFAULT: "default",
});

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

const saveImage = async (url, callback) => {
  console.log(url);
  const uri = await downloadAsync(url);
  await saveToLibrary(uri);
  callback(uri);
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
const ImageProvider = ({ images, changeViewerState, children }) => {
  return (
    <ImageContext.Provider value={{ images, changeViewerState }}>
      {children}
    </ImageContext.Provider>
  );
};

const SlideImageModal = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  navigation.setOptions({
    gestureEnabled: false,
  });
  const { images, idx: index, from: _from } = route.params;
  StatusBar.setHidden(true, "fade");
  const _handleBackButtonClick = () => {
    console.log("_handleBackButtonClick");
    StatusBar.setHidden(false, "fade");

    navigation.goBack(_from, {});

    return true;
  };

  const changeViewerState = () => {
    console.log("changeViewerState");
    setVisible(false);
    console.log("END");
    navigation.goBack(_from, {});
  };
  const [currentIndex, setCurrentIndex] = useState(index);
  const [visible, setVisible] = useState(true);
  const swiperRef = useRef(null);
  StatusBar.setHidden(visible, "fade");

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", _handleBackButtonClick);
    return () =>
      BackHandler.removeEventListener(
        "hardwareBackPress",
        _handleBackButtonClick
      );
  }, []);
  return (
    <ImageProvider images={images} changeViewerState={changeViewerState}>
      <Animated.View
        style={{
          ...styles.modalContainer,
        }}
      >
        <ImageView
          images={images}
          imageIndex={index}
          visible={visible}
          onRequestClose={() => {
            changeViewerState();
          }}
          swipeToCloseEnabled={false}
          onImageIndexChange={(imageIndex) => {
            console.log(imageIndex);
            setCurrentIndex(imageIndex);
          }}
        />
        <FloatingButton currIndex={currentIndex}></FloatingButton>
      </Animated.View>
    </ImageProvider>
  );
};

const SlideStyles = StyleSheet.create({
  renderIndicator: {
    position: "absolute",
    top: StatusHeight,
    width: WIDTH,
    alignItems: "center",
  },
  renderIndicatorText: {
    fontSize: 15,
    color: "#fff",
  },
});
const FloatingButton = forwardRef(({ currIndex, animationValue }, ref) => {
  console.log(currIndex, isIPhoneX());
  const changeViewerState = useChangeViewerState();
  const images = useImages();
  const flashRef = useRef(null);

  return (
    <>
      <FlashMessage
        ref={flashRef}
        titleStyle={{ fontSize: 14 }}
        textStyle={{ fontSize: 1 }}
        style={{
          bottom: isIPhoneX() ? 0 : 30,
          width: WIDTH,
        }}
      />

      <Animated.View
        style={{
          ...styles.buttonContainer,
          opacity: animationValue,
        }}
        ref={ref}
      >
        <TouchableOpacity
          onPress={() => {
            console.log("Left Button");
            changeViewerState();
          }}
        >
          <Ionicons
            name="ios-arrow-back"
            size={30}
            style={{ marginHorizontal: 20 }}
            color={"white"}
          ></Ionicons>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            saveImage(images[currIndex].uri, (uri) => {
              flashRef.current.showMessage({
                message: "다운로드 되었습니다.",
                type: "success",
              });
            });
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
const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 0,
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    zIndex: 2,
    flex: 1,
    backgroundColor: "black",
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
    width: WIDTH,
    height: HEIGHT,
  },
  zoomableImage: {
    height: undefined,
    width: "100%",
    aspectRatio: 1,
  },
});

SlideImageModal.propTypes = {};

export default SlideImageModal;
