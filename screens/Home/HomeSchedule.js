import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import CustomHeader from "../../components/common/CustomHeader";
import { HeaderHeight } from "../../utils/HeaderHeight";
import { useRoute, useNavigation } from "@react-navigation/native";
import { scale } from "react-native-size-matters";
import {
  getYearMonthDay,
  getMonth,
  timePickedConverter,
  getYearMonthDayKr,
} from "../../utils/DateFormat";
import { BG_COLOR, LIGHT_GREEN_COLOR } from "../../constants/Color";
import Schedule from "../../components/common/Schedule";
import PropTypes from "prop-types";
import { CycleType } from "../../constants/Enum";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const DAY = Object.freeze({
  MONDAY: 0,
  TUESDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FRIDAY: 4,
  SATURDAY: 5,
  SUNDAY: 6,
});
const _today = new Date();

const _selectedDate = getYearMonthDay(new Date());
const _gottenCurrentMonth = getMonth(new Date());
const _lastDayOfMonth = new Date(
  _today.getFullYear(),
  _today.getMonth() + 1,
  0
).getDate();
const getEveryDayInMonth = (day = DAY.MONDAY, currentMonth) => {
  let d = new Date(currentMonth),
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

const HomeSchedule = ({}) => {
  const calendarRef = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { schedules } = route.params;
  const [selectedDate, setSelectedDate] = useState(_selectedDate);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const processedSched = useMemo(() => {
    const _oneWeek = 7;
    let _processedSched = [];

    for (let i = 0; i < schedules.length; i++) {
      const _sched = schedules[i];

      const _theDate = _sched.date;
      if (_sched.cycle === CycleType.default) {
        _sched._date = getYearMonthDay(_sched.date);
        _processedSched.push(_sched);
      } else if (_sched.cycle === CycleType.WEEK) {
        const _cycleDay = _theDate.getDay();
        const _augmentedSched = getEveryDayInMonth(_cycleDay, currentMonth).map(
          (d) => {
            const s = { ..._sched };
            // s.date is original date
            // s._date is for react-native-calendar
            s._date = getYearMonthDay(d);
            return s;
          }
        );
        _processedSched.push(..._augmentedSched);
      }
    }
    return _processedSched;
  }, [currentMonth]);

  return (
    <>
      <CustomHeader
        rightButtonEnabled={false}
        rightButton={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GroupScheduleWrite", {});
            }}
            title="goBack"
            style={{ marginHorizontal: 10 }}
          >
            <Text>일정 추가</Text>
          </TouchableOpacity>
        }
      ></CustomHeader>

      <Schedule
        schedule={processedSched}
        {...{ setSelectedDate, selectedDate, setCurrentMonth, currentMonth }}
      ></Schedule>
      <View style={styles.selectedDateContainer}>
        <Text style={styles.selectedDate}>일정</Text>
        <Text>{getYearMonthDayKr(selectedDate)}</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {processedSched
          .filter((sched) => sched._date === selectedDate)
          .map((sched, index) => {
            return (
              <View
                key={`sched-card-${index}`}
                style={schedCardStyle.container}
              >
                <View style={{ ...schedCardStyle.groupName }}>
                  <Text>{sched.groupName}</Text>
                </View>
                <View style={schedCardStyle.bodyContainer}>
                  <Text>
                    <Text style={schedCardStyle.bodyText}>일정명:</Text>{" "}
                    {sched.title}
                  </Text>
                  <Text>
                    <Text style={schedCardStyle.bodyText}>내용:</Text>{" "}
                    {sched.memo}
                  </Text>
                  <Text>{timePickedConverter(sched._date)}</Text>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </>
  );
};
const schedCardStyle = StyleSheet.create({
  container: {
    height: scale(80),
    width: (WIDTH * 90) / 100,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(15),
    borderWidth: 0.3,
    overflow: "hidden",
  },
  groupName: {
    height: "100%",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    width: "30%",
    backgroundColor: LIGHT_GREEN_COLOR,
  },
  bodyContainer: {
    marginLeft: 20,
    height: "100%",
    justifyContent: "space-evenly",
  },
  bodyText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
const styles = StyleSheet.create({
  selectedDateContainer: {
    top: HeaderHeight,
    backgroundColor: BG_COLOR,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedDate: {
    fontWeight: "600",
    fontSize: scale(15),
    marginLeft: 20,
    marginRight: 20,
  },
  contentContainerStyle: { alignItems: "center" },
  scrollView: {
    borderWidth: 0,

    backgroundColor: BG_COLOR,
  },
});

HomeSchedule.propTypes = {
  schedule: PropTypes.array,
};

export default HomeSchedule;
