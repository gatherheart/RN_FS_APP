import React, { useEffect, useState, useRef } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Calendar, CalendarList } from "react-native-calendars";
import { StatusHeight } from "../../utils/HeaderHeight";
import { useRoute } from "@react-navigation/native";

export default ({}) => {
  const calendarRef = useRef(null);
  const route = useRoute();
  const { result, _test: test } = route.params;
  console.log(result, test);
  useEffect(() => {}, []);
  return (
    <CalendarList
      //testID={testIDs.calendarList.CONTAINER}
      //current={'2020-06-10'}
      ref={calendarRef}
      style={{ top: StatusHeight, backgroundColor: "white" }}
      pastScrollRange={12}
      futureScrollRange={12}
      horizontal={true}
      pagingEnabled={true}
      onMonthChange={(month) => {
        console.log("month changed", month);
      }}
      onVisibleMonthChange={(month) => {
        console.log("month changed", month);
      }}
      onDayPress={(day) => {
        console.log("selected day", day);
      }}
      renderHeader={(date) => {
        const header = date.toString("MMMM yyyy");
        const [month, year] = header.split(" ");
        const textStyle = {
          fontSize: 18,
          fontWeight: "bold",
          paddingTop: 10,
          paddingBottom: 10,
          color: "#5E60CE",
          paddingRight: 5,
        };

        return (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ marginLeft: 5, ...textStyle }}>{`${month}`}</Text>
            <Text style={{ marginRight: 5, ...textStyle }}>{year}</Text>
          </View>
        );
      }}
      theme={{
        "stylesheet.calendar.header": {
          dayHeader: {
            fontWeight: "600",
            color: "#48BFE3",
          },
        },
        "stylesheet.day.basic": {
          today: {
            borderColor: "#48BFE3",
            borderWidth: 0.8,
          },
          todayText: {
            color: "#5390D9",
            fontWeight: "800",
          },
        },
      }}
    />
  );
};
