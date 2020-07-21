import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
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
  LIGHT_GREY_COLOR,
} from "../../constants/Color";
import CustomTabBar from "./CustomTabBar";
import { isToday, formatAMPM, getYearMonthDayKr } from "../../utils/DateFormat";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

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
          const groupRooms = _classifiedRooms[groupKey];
          return (
            <ScrollView
              key={`group-room-page-${idx}`}
              tabLabel={`${trimText(_groupName, 6)}`}
            >
              {groupRooms.map((room, i) => {
                return (
                  <TouchableOpacity
                    key={`${_groupName}'s-${i}th-room`}
                    style={styles.chatContainer}
                    onPress={() => navigation.navigate("Chat", {})}
                  >
                    <Image
                      source={{ uri: room.image || room.group?.poster }}
                      style={styles.roomImage}
                    ></Image>
                    <View style={styles.messageContainer}>
                      <Text style={styles.roomName}>{room.name}</Text>
                      <Text style={styles.lastChat}>
                        {trimText(room.messages[0]?.text, 50)}
                      </Text>
                    </View>
                    <View style={styles.infoContainer}>
                      <Text style={styles.dateText}>
                        {isToday(room.messages[0]?.createdAt)
                          ? formatAMPM(room.messages[0]?.createdAt)
                          : getYearMonthDayKr(room.messages[0]?.createdAt)}
                      </Text>
                      <View style={styles.unreadCount}>
                        <Text style={styles.unread}>
                          {room.unreadCount >= 100 ? "+99" : room.unreadCount}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
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
  chatContainer: {
    height: 78,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: LIGHT_GREY_COLOR,
  },
  roomImage: {
    width: 58,
    height: 58,
    borderRadius: 58 / 2,
    marginLeft: 10,
  },
  messageContainer: {
    width: WIDTH - 58 - 85 - 10,
    marginLeft: 20,
    height: "100%",
    paddingVertical: 10,
  },
  roomName: {
    fontWeight: "800",
    fontSize: 14,
  },
  lastChat: {
    fontSize: 13,
  },
  dateText: {
    fontSize: 12,
    fontWeight: "300",
  },
  infoContainer: {
    width: 65,
    height: "100%",
    paddingTop: 0,
    alignItems: "center",
  },
  unreadCount: {
    fontWeight: "300",
    backgroundColor: LIGHT_GREEN_COLOR,
    width: 28,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  unread: {
    color: BG_COLOR,
    fontSize: 12,
  },
});
