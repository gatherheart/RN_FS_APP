import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { HeaderHeight } from "../../utils/HeaderHeight";
import ChatListHeader from "../../components/Chat/ChatListHeader";
import { useNavigation } from "@react-navigation/native";
import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";

export default ({ rooms }) => {
  const navigation = useNavigation();
  return (
    <>
      <ChatListHeader></ChatListHeader>
      <ScrollableTabView
        style={{ marginTop: 20 }}
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
      >
        <Text tabLabel="Tab #1">My</Text>
        <Text tabLabel="Tab #2 word word">favorite</Text>
        <Text tabLabel="Tab #3 word word word">project</Text>
        <Text tabLabel="Tab #4 word word word word">favorite</Text>
        <Text tabLabel="Tab #5">project</Text>
      </ScrollableTabView>
    </>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
});
