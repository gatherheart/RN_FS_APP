import React, { useEffect, useState, useRef, useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import CustomHeader from "../../../components/common/CustomHeader";
import { CalendarList } from "react-native-calendars";
import { StatusHeight, HeaderHeight } from "../../../utils/HeaderHeight";
import { useRoute } from "@react-navigation/native";
import { moderateScale } from "react-native-size-matters";
import { getYearMonthDay, getMonth, getDate } from "../../../utils/DateFormat";
import { GREEN_COLOR, BG_COLOR } from "../../../constants/Color";
export default ({ schedule, CycleType }) => {
  const calendarRef = useRef(null);
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
  const DAY = Object.freeze({
    MONDAY: 0,
    TUESDAY: 1,
    WEDNESDAY: 2,
    THURSDAY: 3,
    FRIDAY: 4,
    SATURDAY: 5,
    SUNDAY: 6,
  });
  const getEveryDayInMonth = (day = DAY.MONDAY) => {
    let d = new Date(currentMonth.dateString),
      month = d.getMonth(),
      mondays = [];

    d.setDate(1);

    // Get the first Monday in the month
    while (d.getDay() !== day) {
      d.setDate(d.getDate() + 1);
    }

    // Get all the other Mondays in the month
    while (d.getMonth() === month) {
      mondays.push(new Date(d.getTime()));
      d.setDate(d.getDate() + 7);
    }

    return mondays;
  };

  const [selectedDate, setSelectedDate] = useState(_selectedDate);
  const [currentMonth, setCurrentMonth] = useState(_gottenCurrentMonth + 1);
  let _processedSched = [];
  const _calculateMarkedDates = () => {
    console.log("_calculateMarkedDates", schedule.length);
    const _oneWeek = 7;
    for (let i = 0; i < schedule.length; i++) {
      const _sched = schedule[i];

      const _theDate = _sched.date;
      if (_sched.cycle === CycleType.default) {
        _processedSched.push(_sched);
      } else if (_sched.cycle === CycleType.WEEK) {
        const _cycleDay = _theDate.getDay();
        const _cycleWeek = getEveryDayInMonth(_cycleDay);
        console.log("_cycleDay", _cycleDay);
        console.log(_cycleWeek);
      }
    }
  };

  useMemo(() => {
    console.log("currentMonth", currentMonth);
    _calculateMarkedDates();
  }, [currentMonth]);

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
            date[0],
            new Date()
          );
          if (date[0].month === currentMonth.month) return;
          setTimeout(() => {
            setCurrentMonth(date[0]);
          }, 100);
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
