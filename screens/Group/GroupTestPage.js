import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import ImageViewer from "react-native-image-zoom-viewer";
import PropTypes from "prop-types";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Animated,
  Modal,
} from "react-native";
import SideMenu from "react-native-side-menu";

const window = Dimensions.get("window");
const uri = "https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png";

const styles2 = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: "gray",
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: "absolute",
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: "300",
    paddingTop: 5,
  },
});

const Menu = function ({ onItemSelected }) {
  return (
    <ScrollView scrollsToTop={false} style={styles2.menu}>
      <View style={styles2.avatarContainer}>
        <Image style={styles2.avatar} source={{ uri }} />
        <Text style={styles2.name}>Your name</Text>
      </View>

      <Text onPress={() => onItemSelected("About")} style={styles.item}>
        About
      </Text>

      <Text onPress={() => onItemSelected("Contacts")} style={styles.item}>
        Contacts
      </Text>
    </ScrollView>
  );
};

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export default () => {
  const [state, setState] = useState(false);

  const _animatedValue = new Animated.Value(0);
  const [_value, set_value] = useState(_value);
  const onItemSelected = (item) => {
    setState(false);
  };
  const menu = <Menu onItemSelected={onItemSelected} />;

  useEffect(() => {
    const _animatedValueListener = _animatedValue.addListener(({ value }) =>
      set_value(value)
    );
    Animated.timing(_animatedValue, {
      toValue: 100,
      duration: 500,
    }).start();
    return function cleanUp() {
      _animatedValue.removeListener(_animatedValueListener);
    };
  }, []);

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  return (
    <SideMenu
      menu={menu}
      isOpen={state}
      onChange={(isOpen) => {
        console.log("onChange", isOpen);
        setState(isOpen);
      }}
      useNativeDriver={true}
      menuPosition={"right"}
    >
      <View style={{ flex: 1, top: 0, backgroundColor: "white" }}>
        <Text
          style={{ top: 120 }}
          onPress={() => {
            setState((prev) => !prev);
          }}
        >
          Hello WOrld
        </Text>
      </View>
    </SideMenu>
  );
};
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
