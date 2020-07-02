import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const BubbleChat = ({ children }) => {
  return (
    <>
      <View style={[styles.item, styles.itemOut]}>
        <View style={[styles.balloon, { backgroundColor: "#F0F0F0" }]}>
          {children}
          <View style={[styles.arrowContainer]}>
            <Svg
              style={styles.arrowLeft}
              width={moderateScale(15.5, 1)}
              height={moderateScale(17.5, 1)}
              viewBox="0 0 88 48"
              enable-background="new 32.485 17.5 15.515 17.5"
            >
              <Path
                d="M0 -7.36428e-06L88 -7.36428e-06V48L0 -7.36428e-06Z"
                fill="#F0F0F0"
              />
            </Svg>
          </View>
        </View>
      </View>
    </>
  );
};
export default BubbleChat;
const styles = StyleSheet.create({
  item: {
    marginVertical: moderateScale(7, 2),
    flexDirection: "row",
  },
  itemIn: {
    marginLeft: 20,
  },
  itemOut: {
    alignSelf: "flex-end",
    marginRight: 20,
  },
  balloon: {
    left: 30,
    width: (WIDTH * 90) / 100,
    paddingHorizontal: moderateScale(5, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 8,
  },
  arrowContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1,
  },
  arrowLeftContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  arrowRightContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  arrowLeft: {
    left: moderateScale(-10, 0.5),
  },

  arrowRight: {
    right: moderateScale(-6, 0.5),
  },
});
