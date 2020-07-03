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
import { AntDesign } from "@expo/vector-icons";
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

const SWIPER_HEIGHT = HEIGHT / 2;
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
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

const SlideImageModal = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { images, idx: index, from: _from } = route.params;
  const [imgViewerVisible, setImgViewerVisible] = useState(true);
  StatusBar.setHidden(true, "fade");

  const changeViewerState = () => {
    StatusBar.setHidden(!imgViewerVisible, "fade");
    navigation.goBack(_from, {});
  };
  const _handleBackButtonClick = () => {
    StatusBar.setHidden(!imgViewerVisible, "fade");
  };
  BackHandler.addEventListener("hardwareBackPress", _handleBackButtonClick);

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
      <Animated.View style={styles.modalContainer}>
        <ImageSlider
          goToNext={goToNext}
          index={index}
          ref={swiperRef}
        ></ImageSlider>
      </Animated.View>
    </ImageProvider>
  );
};
const animationValue = new Animated.Value(0);
const changeHeaderState = () => {
  if (animationValue._value === 1) {
    animationValue.setValue(0);
  } else {
    animationValue.setValue(1);
  }
};
let INITIAL_DISTANCE = 150;
let _lastZoomValue = 0;
const pinchToZoomInSensitivity = 3;
const pinchToZoomOutSensitivity = 1;
const maxZoom = 2;
const minZoom = 0.5;

const ImageSlider = forwardRef(({ index, goToNext }, scrollViewRef) => {
  const changeViewerState = useChangeViewerState();
  const images = useImages();
  const viewRef = useRef();

  State.BEGAN = 1;
  const items = images.map((image) => ({
    image,
    state: new Animated.Value(State.UNDETERMINED),
    scale: new Animated.Value(State.BEGAN),
    lastZoomLevel: new Animated.Value(State.BEGAN),
    pinchZoomPosition: null,
    pinchRef: useRef(null),
  }));
  const pinchRefs = items.map(({ pinchRef }) => pinchRef);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => {
      console.log("onMoveShouldSetPanResponder", new Date());
    },
    onMoveShouldSetPanResponderCapture: (event, gestureState) => {
      const touches = event.nativeEvent.touches;
      let baseComponentResult =
        true &&
        (Math.abs(gestureState.dx) > 2 ||
          Math.abs(gestureState.dy) > 2 ||
          gestureState.numberActiveTouches === 2);

      // PINCH Gesture Capture
      if (gestureState.numberActiveTouches === 2) {
        let dx = Math.abs(touches[0].pageX - touches[1].pageX);
        let dy = Math.abs(touches[0].pageY - touches[1].pageY);
        // Set Inital Distance
        INITIAL_DISTANCE = Math.sqrt(dx * dx + dy * dy);
        setZooming(true);
      }

      return baseComponentResult;
    },
    onPanResponderGrant: (event, gestureState) => {},
    onPanResponderStart: (event, gestureState) => {},
    onPanResponderMove: (event, { dx, dy }) => {
      const touches = event.nativeEvent.touches;
      if (touches.length >= 2) {
        let dx = Math.abs(touches[0].pageX - touches[1].pageX);
        let dy = Math.abs(touches[0].pageY - touches[1].pageY);

        const _distance = Math.sqrt(dx * dx + dy * dy);
        const zoomChangeFromStartOfPinch = _distance / INITIAL_DISTANCE;
        const pinchToZoomSensitivity =
          zoomChangeFromStartOfPinch < 1
            ? pinchToZoomOutSensitivity
            : pinchToZoomInSensitivity;
        let zoomLevel =
          zoomChangeFromStartOfPinch * items[currIndex].lastZoomLevel._value;
        console.log(items[currIndex].lastZoomLevel._value, zoomLevel);
        // We have a pinch-to-zoom movement
        // Track locationX/locationY to know by how much the user moved their fingers
        // make sure max and min zoom levels are respected
        if (maxZoom !== null && zoomLevel > maxZoom) {
          zoomLevel = maxZoom;
        }

        if (zoomLevel < minZoom) {
          zoomLevel = minZoom;
        }

        items[currIndex].scale.setValue(zoomLevel);
        _lastZoomValue = zoomLevel;
      } else {
        // We have a regular scroll movement
      }
    },

    onPanResponderRelease: (event, {}) => {
      console.log("Released");

      changeHeaderState();
      items[currIndex].lastZoomLevel.setValue(_lastZoomValue);
      setZooming(false);
    },
  });
  const [currIndex, setCurrIndex] = useState(index);
  const [zooming, setZooming] = useState(false);
  useEffect(() => {
    setTimeout(
      () =>
        scrollViewRef.current.getNode().scrollTo({
          x: index * WIDTH,
          y: 0,
          animated: false,
        }),
      0
    );
  }, []);

  return images ? (
    <>
      <Animated.ScrollView
        canCancelContentTouches={false}
        contentContainerStyle={{}}
        horizontal
        showsPagination={false}
        scrollEnabled={!zooming}
        ref={scrollViewRef}
        scrollEventThrottle={16}
        pagingEnabled={true}
        onTouchEnd={(event) => {}}
        onMomentumScrollEnd={(event) => {
          console.log("ScrollView Event", new Date());
          setCurrIndex(event.nativeEvent.contentOffset.x / WIDTH);
        }}
        {...panResponder.panHandlers}
      >
        {items.map(({ image, state, pinchRef, scale }, idx) => (
          <ImageContainer
            source={image.uri}
            {...{ state, scrollViewRef, pinchRef, pinchRefs, scale }}
            key={`image-silder-${idx}`}
          />
        ))}
      </Animated.ScrollView>

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
const USE_NATIVE_DRIVER = true;
const SIZE = WIDTH;

const ImageContainer = ({
  source,
  scale,

  state,
  pinchRef,
  pinchRefs,
  scrollViewRef,
}) => {
  return (
    <Animated.View
      style={{
        ...styles.imageContainer,
      }}
    >
      <Animated.Image
        source={{
          uri: source,
        }}
        style={[
          styles.zoomableImage,
          {
            transform: [{ perspective: 200 }, { scale: scale }],
          },
        ]}
      />
    </Animated.View>
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
ImageSlider.propTypes = {
  images: PropTypes.array,
};

export default SlideImageModal;
