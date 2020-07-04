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
import ImageViewer from "react-native-image-zoom-viewer";

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
    StatusBar.setHidden(false, "fade");
    navigation.goBack(_from, {});

    return true;
  };
  BackHandler.addEventListener("hardwareBackPress", _handleBackButtonClick);

  const changeViewerState = () => {
    console.log("changeViewerState");
    StatusBar.setHidden(false, "fade");
    navigation.goBack(_from, {});
  };

  const swiperRef = useRef(null);
  const _images = images.map((image) => {
    return {
      url: image,
      props: {},
    };
  });

  return (
    <ImageProvider images={images} changeViewerState={changeViewerState}>
      <Animated.View
        style={{
          ...styles.modalContainer,
        }}
      >
        <ImageViewer
          imageUrls={_images}
          index={index}
          useNativeDriver={true}
          enablePreload={true}
          pageAnimateTime={240}
          menus={() => <View></View>}
          renderIndicator={(currentIndex, allSize) => {
            return (
              <View style={SlideStyles.renderIndicator}>
                <Text style={SlideStyles.renderIndicatorText}>
                  {currentIndex} / {allSize}
                </Text>
              </View>
            );
          }}
        />
      </Animated.View>
      <FloatingButton></FloatingButton>
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
  const changeViewerState = useChangeViewerState();
  const images = useImages();
  const flashRef = useRef(null);

  return (
    <>
      <FlashMessage
        ref={flashRef}
        position="top"
        titleStyle={{ fontSize: 14 }}
        textStyle={{ fontSize: 1 }}
        style={{ bottom: isIPhoneX() ? 0 : 30 }}
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
            saveImage(images[currIndex].uri);
            flashRef.current.showMessage({
              message: "다운로드 되었습니다.",
              type: "success",
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
