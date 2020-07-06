import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import styled, { ThemeContext } from "styled-components/native";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { isFuture, isToday, formatAMPM } from "../../utils/DateFormat";
import StarIcon from "../common/svg/StarIcon";
import { trimText } from "../../utils/String";
import {
  LIGHT_GREY_COLOR,
  LIGHT_GREEN_COLOR,
  GREEN_COLOR,
  BG_COLOR,
} from "../../constants/Color";
import Collapsible from "react-native-collapsible";
import { Ionicons } from "@expo/vector-icons";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Card = styled.View`
  width: ${(WIDTH * 100) / 100}px;
  justify-content: center;
  margin: 0px 0px 0px 0px;
  padding-bottom: 0px;
`;

const ScheduleBox = ({ sched }) => {
  return (
    <View style={{ ...styles.scheduleBoxContainer }}>
      <View style={styles2.starIcon}>
        <StarIcon height={`${(10 * WIDTH) / 100}%`}></StarIcon>
      </View>
      <View style={styles2.groupContainer}>
        {sched?.groupName ? (
          <Text style={{ ...styles.boldText, ...styles2.groupText }}>
            {sched.groupName}
          </Text>
        ) : null}
        <Text>{trimText(sched.title, 26)}</Text>
      </View>
      <View style={styles2.timeContainer}>
        {sched?.date ? (
          <Text style={styles2.timeText}>{formatAMPM(sched.date)}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles2 = StyleSheet.create({
  starIcon: {
    width: (WIDTH * 15) / 100,
    alignItems: "center",
    justifyContent: "center",
  },
  groupContainer: {
    justifyContent: "center",
    paddingLeft: 10,
    width: (WIDTH * 60) / 100,
  },
  groupText: {
    fontWeight: "700",
    marginVertical: 2,
  },
  timeContainer: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    width: (WIDTH * 25) / 100,
    marginVertical: 10,
    paddingRight: 5,
  },
  timeText: {
    width: "100%",
    paddingRight: 10,
    textAlign: "right",
  },
});

const TodaySchedule = ({ schedules: todaySchedules }) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  console.log(todaySchedules);
  return (
    <View>
      <Card style={{}}>
        {todaySchedules.length != 0 ? (
          todaySchedules.slice(0, 2).map((sched, idx) => {
            return (
              <ScheduleBox
                key={`todaySched-${idx}`}
                sched={sched}
              ></ScheduleBox>
            );
          })
        ) : (
          <ScheduleBox
            sched={{ schedule: { title: "일정이 없습니다." } }}
          ></ScheduleBox>
        )}

        <Collapsible collapsed={isCollapsed}>
          {todaySchedules.length != 0
            ? todaySchedules.slice(2).map((sched, idx) => {
                return (
                  <ScheduleBox
                    key={`todaySched-${idx}`}
                    sched={sched}
                  ></ScheduleBox>
                );
              })
            : null}
        </Collapsible>
      </Card>
      <View>
        <View
          style={{
            position: "absolute",
            left: WIDTH / 2 - 30,
            top: -10,
            backgroundColor: BG_COLOR,
          }}
        >
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: GREEN_COLOR,
              borderRadius: 5,
              width: 60,
              height: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              setIsCollapsed((prev) => !prev);
            }}
          >
            <Ionicons
              name={isCollapsed ? "ios-arrow-down" : "ios-arrow-up"}
              color={GREEN_COLOR}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scheduleBoxContainer: {
    flexDirection: "row",
    width: WIDTH,
    height: 65,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GREY_COLOR,
  },
  boldText: {
    fontWeight: "700",
  },
});

TodaySchedule.prototype = {};

export default TodaySchedule;
