import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { CalendarList } from "react-native-calendars";
import { StatusHeight, HeaderHeight } from "../../../utils/HeaderHeight";
import { moderateScale } from "react-native-size-matters";
import { getYearMonthDay, getMonth, getDate } from "../../../utils/DateFormat";
import { GREEN_COLOR, BG_COLOR } from "../../../constants/Color";
const _today = new Date();

const _selectedDate = getYearMonthDay(
  new Date(new Date().setDate(new Date().getDate() - 1))
);
const _gottenCurrentMonth = getMonth(new Date());
const _lastDayOfMonth = new Date(
  _today.getFullYear(),
  _today.getMonth() + 1,
  0
).getDate();

export default ({
  currentMonth,
  setCurrentMonth,
  setSelectedDate,
  selectedDate,
  schedule,
}) => {
  let settingCurrentMonth = false;
  const _markedDates = schedule.reduce(
    (c, v) => Object.assign(c, { [v.date]: { marked: true } }),
    {}
  );

  return (
    <CalendarList
      //testID={testIDs.calendarList.CONTAINER}
      //current={'2020-06-10'}
      markedDates={{
        ..._markedDates,
        [selectedDate]: { selected: true },
      }}
      onVisibleMonthsChange={(date) => {
        if (
          date[0].month === currentMonth.getMonth() + 1 ||
          settingCurrentMonth
        )
          return;
        console.log("--------------------------------------");

        console.log("onVisibleMonthsChange", date, currentMonth.getMonth());

        settingCurrentMonth = true;
        setCurrentMonth(new Date(date[0].dateString));

        setTimeout(() => {
          settingCurrentMonth = false;
        }, 1000);
      }}
      style={{ top: StatusHeight, backgroundColor: "white" }}
      pastScrollRange={12}
      futureScrollRange={12}
      horizontal={true}
      pagingEnabled={true}
      onDayPress={(day) => {
        setSelectedDate(day.dateString);
      }}
      renderHeader={(date) => {
        const header = date.toString("MMMM yyyy");
        const [month, year] = header.split(" ");
        const textStyle = {
          fontSize: 18,
          fontWeight: "bold",
          paddingTop: 10,
          paddingBottom: 10,
          color: GREEN_COLOR,
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
        selectedDayTextColor: "black",
        "stylesheet.calendar.header": {
          week: {
            flexDirection: "row",
            justifyContent: "space-around",
            marginRight: 5,
            borderWidth: 1,
          },
          dayHeader: {
            color: GREEN_COLOR,
            borderWidth: 1,
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
          selected: {
            borderColor: GREEN_COLOR,
            borderBottomWidth: 1,
          },
          marked: {
            borderColor: GREEN_COLOR,
            borderBottomWidth: 1,
          },
        },
      }}
    />
  );
};
