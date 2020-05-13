import { Platform, StatusBar, Dimensions } from "react-native";
import { theme } from "galio-framework";

const { width, height } = Dimensions.get("screen");

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

export const isIPhoneX = () =>
  Platform.OS === "ios" && !Platform.isPad && !Platform.isTVOS
    ? (width === X_WIDTH && height === X_HEIGHT) ||
      (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
    : false;

export const StatusHeight = Platform.select({
  ios: isIPhoneX() ? 44 : 20,
  android: StatusBar.currentHeight,
  default: 0,
});
export const HeaderHeight = StatusHeight || 0;
export const UnderHeader = Platform.OS === "ios" ? StatusHeight : StatusHeight;
