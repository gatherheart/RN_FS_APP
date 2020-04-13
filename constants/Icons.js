import { Platform } from "react-native";

const firstTabIcon = Platform.OS === "ios" ? "ios-film" : "md-film";
const secondTabIcon = Platform.OS === "ios" ? "ios-tv" : "md-tv";
const thirdTabIcon = Platform.OS === "ios" ? "ios-search" : "md-search";
const fourthTabIcon = Platform.OS === "ios" ? "ios-heart" : "md-heart";

export { firstTabIcon, secondTabIcon, thirdTabIcon, fourthTabIcon };
