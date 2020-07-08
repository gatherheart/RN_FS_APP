// @flow

import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  PanResponder,
  View,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";

const absoluteStretch = {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

const styles = StyleSheet.create({
  container: {
    ...absoluteStretch,
    justifyContent: "center",
  },
  menu: {
    ...absoluteStretch,
  },
  frontView: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  overlay: {
    ...absoluteStretch,
    backgroundColor: "transparent",
  },
});

const deviceScreen = Dimensions.get("window");
const barrierForward = deviceScreen.width / 4;

function shouldOpenMenu(dx) {
  return dx > barrierForward;
}
const useForceUpdate = () => useState()[1];

const SideMenu = ({
  edgeHitWidth,
  toleranceX,
  toleranceY,
  menuPosition,
  onChange,
  onMove,
  onSliding,
  openMenuOffset,
  hiddenMenuOffset,
  disableGestures,
  animationFunction,
  onStartShouldSetResponderCapture,
  isOpen,
  bounceBackOnOverdraw,
  autoClosing,
  animationStyle,
  children,
}) => {
  let prevLeft = 0;
  let sideMenu;
  const forceUpdate = useForceUpdate();
  console.log("SideMenu", isOpen);

  const initialMenuPositionMultiplier = menuPosition === "right" ? -1 : 1;
  const openOffsetMenuPercentage = openMenuOffset / deviceScreen.width;
  const hiddenMenuOffsetPercentage = hiddenMenuOffset / deviceScreen.width;
  const left = new Animated.Value(
    isOpen ? openMenuOffset * initialMenuPositionMultiplier : hiddenMenuOffset
  );
  const [state, setState] = useState({
    width: deviceScreen.width,
    height: deviceScreen.height,
    openOffsetMenuPercentage,
    openMenuOffset: deviceScreen.width * openOffsetMenuPercentage,
    hiddenMenuOffsetPercentage,
    hiddenMenuOffset: deviceScreen.width * hiddenMenuOffsetPercentage,
    left,
  });

  const moveLeft = (offset) => {
    const newOffset = menuPositionMultiplier() * offset;

    animationFunction(state.left, newOffset).start();

    prevLeft = newOffset;
  };

  const openMenu = function (isOpen) {
    const { hiddenMenuOffset, openMenuOffset } = state;
    moveLeft(isOpen ? openMenuOffset : hiddenMenuOffset);

    forceUpdate();
    onChange(isOpen);
  };

  useEffect(() => {
    state.left.addListener(({ value }) =>
      onSliding(
        Math.abs(
          (value - state.hiddenMenuOffset) /
            (openMenuOffset - state.hiddenMenuOffset)
        )
      )
    );
    return function cleanUp() {
      state.left.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (typeof isOpen !== "undefined" && isOpen === false) {
      openMenu(isOpen);
    }
  }, [isOpen]);

  const onLayoutChange = (e) => {
    const { width, height } = e.nativeEvent.layout;
    const openMenuOffset = width * openOffsetMenuPercentage;
    const hiddenMenuOffset = width * hiddenMenuOffsetPercentage;
    setState((prev) => {
      return { ...prev, width, height, openMenuOffset, hiddenMenuOffset };
    });
  };

  /**
   * Get content view. This view will be rendered over menu
   * @return {React.Component}
   */
  const getContentView = () => {
    let overlay = null;

    if (isOpen) {
      overlay = (
        <TouchableWithoutFeedback onPress={() => openMenu(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      );
    }

    const { width, height } = state;
    const ref = (_sideMenu) => (sideMenu = _sideMenu);
    const style = [
      styles.frontView,
      { width, height },
      animationStyle(state.left),
    ];

    const responder = PanResponder.create({
      onStartShouldSetResponderCapture: onStartShouldSetResponderCapture,
      onMoveShouldSetPanResponder: handleMoveShouldSetPanResponder,
      onPanResponderMove: handlePanResponderMove,
      onPanResponderRelease: handlePanResponderEnd,
      onPanResponderTerminate: handlePanResponderEnd,
    });

    return (
      <Animated.View style={style} ref={ref} {...responder.panHandlers}>
        {children}
        {overlay}
      </Animated.View>
    );
  };

  const menuPositionMultiplier = () => {
    return menuPosition === "right" ? -1 : 1;
  };

  const handlePanResponderMove = function (e, gestureState) {
    if (state.left.__getValue() * menuPositionMultiplier() >= 0) {
      let newLeft = prevLeft + gestureState.dx;

      if (!bounceBackOnOverdraw && Math.abs(newLeft) > state.openMenuOffset) {
        newLeft = menuPositionMultiplier() * state.openMenuOffset;
      }

      onMove(newLeft);
      state.left.setValue(newLeft);
    }
  };

  const handlePanResponderEnd = function (e, gestureState) {
    const offsetLeft =
      menuPositionMultiplier() * (state.left.__getValue() + gestureState.dx);

    openMenu(shouldOpenMenu(offsetLeft));
  };

  const handleMoveShouldSetPanResponder = function (e, gestureState) {
    if (gesturesAreEnabled()) {
      const x = Math.round(Math.abs(gestureState.dx));
      const y = Math.round(Math.abs(gestureState.dy));

      const touchMoved = x > toleranceX && y < toleranceY;

      if (isOpen) {
        return touchMoved;
      }

      const withinEdgeHitWidth =
        menuPosition === "right"
          ? gestureState.moveX > deviceScreen.width - edgeHitWidth
          : gestureState.moveX < edgeHitWidth;

      const swipingToOpen = menuPositionMultiplier() * gestureState.dx > 0;
      return withinEdgeHitWidth && touchMoved && swipingToOpen;
    }

    return false;
  };

  const gesturesAreEnabled = () => {
    if (typeof disableGestures === "function") {
      return !disableGestures();
    }

    return !disableGestures;
  };

  const boundryStyle =
    menuPosition === "right"
      ? { left: state.width - state.openMenuOffset }
      : { right: state.width - state.openMenuOffset };

  const menu = <View style={[styles.menu, boundryStyle]}>{menu}</View>;

  return (
    <View style={styles.container} onLayout={onLayoutChange}>
      {menu}
      {getContentView()}
    </View>
  );
};

SideMenu.propTypes = {
  edgeHitWidth: PropTypes.number,
  toleranceX: PropTypes.number,
  toleranceY: PropTypes.number,
  menuPosition: PropTypes.oneOf(["left", "right"]),
  onChange: PropTypes.func,
  onMove: PropTypes.func,
  children: PropTypes.node,
  menu: PropTypes.node,
  openMenuOffset: PropTypes.number,
  hiddenMenuOffset: PropTypes.number,
  animationStyle: PropTypes.func,
  disableGestures: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  animationFunction: PropTypes.func,
  onStartShouldSetResponderCapture: PropTypes.func,
  isOpen: PropTypes.bool,
  bounceBackOnOverdraw: PropTypes.bool,
  autoClosing: PropTypes.bool,
};

SideMenu.defaultProps = {
  toleranceY: 10,
  toleranceX: 10,
  edgeHitWidth: 60,
  children: null,
  menu: null,
  openMenuOffset: deviceScreen.width * (2 / 3),
  disableGestures: false,
  menuPosition: "left",
  hiddenMenuOffset: 0,
  onMove: () => {},
  onStartShouldSetResponderCapture: () => true,
  onChange: () => {},
  onSliding: () => {},
  animationStyle: (value) => ({
    transform: [
      {
        translateX: value,
      },
    ],
  }),
  animationFunction: (prop, value) =>
    Animated.spring(prop, {
      toValue: value,
      friction: 8,
    }),
  isOpen: false,
  bounceBackOnOverdraw: true,
  autoClosing: true,
};

export default SideMenu;
