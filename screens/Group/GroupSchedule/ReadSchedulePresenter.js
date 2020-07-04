import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import CustomHeader from "../../../components/common/CustomHeader";
import { CalendarList } from "react-native-calendars";
import { StatusHeight, HeaderHeight } from "../../../utils/HeaderHeight";
import { useRoute } from "@react-navigation/native";
import { moderateScale } from "react-native-size-matters";
import { getYearMonthDay, getMonth } from "../../../utils/DateFormat";
import { GREEN_COLOR, BG_COLOR } from "../../../constants/Color";
export default ({ schedule, CycleType }) => {
  const calendarRef = useRef(null);
  const _selectedDate = getYearMonthDay(
    new Date(new Date().setDate(new Date().getDate() - 1))
  );
  const _currentMonth = getMonth(new Date());
  const [selectedDate, setSelectedDate] = useState(_selectedDate);
  const [currentMonth, setCurrentMonth] = useState(_currentMonth + 1);
  return (
    <>
      <CustomHeader
        rightButtonEnabled={true}
        rightButton={
          <TouchableOpacity
            onPress={() => {
              const _selectedDate = getYearMonthDay(
                new Date(
                  new Date().setDate(new Date(selectedDate).getDate() - 1)
                )
              );
              setSelectedDate(_selectedDate);
            }}
            title="goBack"
            style={{ marginHorizontal: 20 }}
          >
            <Text>완료</Text>
          </TouchableOpacity>
        }
      ></CustomHeader>
      <CalendarList
        //testID={testIDs.calendarList.CONTAINER}
        //current={'2020-06-10'}
        markedDates={{
          "2020-07-28": {
            marked: true,
          },
          [selectedDate]: { selected: true },
        }}
        ref={calendarRef}
        onVisibleMonthsChange={(date) => {
          console.log(
            "onVisibleMonthsChange",
            currentMonth,
            date[0].month,
            new Date()
          );
        }}
        onMonthChange={(date) => {
          console.log("onMonthChange", date);
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
      <ScrollView
        style={{ borderWidth: 1, marginTop: HeaderHeight }}
        contentContainerStyle={{ borderWidth: 1 }}
      >
        <View>
          <Text>{selectedDate}</Text>
        </View>
      </ScrollView>
    </>
  );
};
