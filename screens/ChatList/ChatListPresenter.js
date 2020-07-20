import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { HeaderHeight, UnderHeader } from "../../utils/HeaderHeight";
import ChatListHeader from "../../components/Chat/ChatListHeader";
import { useNavigation } from "@react-navigation/native";
import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";
import { trimText } from "../../utils/String";
import FacebookTabBar from "./FacebookTabBar";
import {
  GREEN_COLOR,
  BG_COLOR,
  GREY_COLOR,
  LIGHT_GREEN_COLOR,
} from "../../constants/Color";
import CustomTabBar from "./CustomTabBar";

export default ({ rooms }) => {
  const navigation = useNavigation();
  return (
    <>
      <ChatListHeader></ChatListHeader>
      <ScrollableTabView
        style={{ paddingTop: HeaderHeight }}
        initialPage={0}
        renderTabBar={() => (
          <CustomTabBar
            tabStyle={{
              backgroundColor: LIGHT_GREEN_COLOR,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingHorizontal: 10,
            }}
            activeTextColor={BG_COLOR}
            inactiveTextColor={GREY_COLOR}
            tabUnderlineStyle={{ borderColor: BG_COLOR }}
          />
        )}
      >
        <View tabLabel={`${trimText("ios-arrow-forward", 20)}`}>
          <Text>My</Text>
        </View>
        <View tabLabel={`${trimText("ios-arrow-forward", 20)}`}>
          <Text>My</Text>
        </View>
        <View tabLabel={`${trimText("ios-arrow-forward", 20)}`}>
          <Text>My</Text>
        </View>
        <View tabLabel={`${trimText("ios-arrow-forward", 20)}`}>
          <Text>My</Text>
        </View>
        <View tabLabel={`${trimText("ios-arrow-forward", 20)}`}>
          <Text>My</Text>
        </View>
        <View tabLabel={`${trimText("ios-arrow-forward", 20)}`}>
          <Text>My</Text>
        </View>
        <View tabLabel={`${trimText("ios-arrow-forward", 20)}`}>
          <Text>My</Text>
        </View>
      </ScrollableTabView>
    </>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
});
