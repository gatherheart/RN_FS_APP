import { Platform, StatusBar, Dimensions } from "react-native";
import { theme } from "galio-framework";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

export const isIPhoneX = () =>
  Platform.OS === "ios" && !Platform.isPad && !Platform.isTVOS
    ? (WIDTH === X_WIDTH && HEIGHT === X_HEIGHT) ||
      (WIDTH === XSMAX_WIDTH && HEIGHT === XSMAX_HEIGHT)
    : false;

export const StatusHeight = Platform.select({
  ios: isIPhoneX() ? 44 : 20,
  android: 0,
  default: 0,
});
const CUSTOM_HEADER_HEIGHT = (HEIGHT * 6) / 100;
export const HeaderHeight = Platform.select({
  ios: isIPhoneX() ? 44 : 44,
  android: 56,
  default: 0,
});

export const UnderHeader = StatusHeight + HeaderHeight;
