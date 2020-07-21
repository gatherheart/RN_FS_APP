import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  HeaderHeight,
  UnderHeader,
  StatusHeight,
} from "../../utils/HeaderHeight";
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
  BLACK_COLOR,
} from "../../constants/Color";
import CustomTabBar from "./CustomTabBar";

export default ({ rooms }) => {
  const navigation = useNavigation();
  const _classifyRooms = (rooms) => {
    return rooms.reduce(function (r, a) {
      const _key = `${a.group.id + "#" + a.group.groupName}`;
      r[_key] = r[_key] || [];
      r[_key].push(a);
      return r;
    }, Object.create(null));
  };
  const _classifiedRooms = _classifyRooms(rooms);
  console.log(_classifiedRooms);
  return (
    <>
      <ChatListHeader></ChatListHeader>
      <ScrollableTabView
        style={{
          paddingTop: HeaderHeight,
          backgroundColor: BG_COLOR,
        }}
        initialPage={0}
        renderTabBar={() => (
          <CustomTabBar
            tabStyle={{
              ...styles.tab,
              bottom: -10,
              alignSelf: "center",
            }}
            activeTextColor={BLACK_COLOR}
            inactiveTextColor={GREY_COLOR}
            underlineStyle={{ backgroundColor: LIGHT_GREEN_COLOR, height: 2 }}
          />
        )}
      >
        {Object.keys(_classifiedRooms).map((groupKey, idx) => {
          const _groupName = groupKey.split("#")[1];
          const group = _classifiedRooms[groupKey];
          return (
            <ScrollView
              key={`group-room-page-${idx}`}
              tabLabel={`${trimText(_groupName, 6)}`}
            >
              <View>
                <Text
                  onPress={() => {
                    navigation.navigate("Chat", {});
                  }}
                >
                  Hello World
                </Text>
              </View>
            </ScrollView>
          );
        })}
      </ScrollableTabView>
    </>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  tab: {
    width: "100%",
    height: "70%",
    backgroundColor: LIGHT_GREEN_COLOR,
    alignSelf: "center",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
