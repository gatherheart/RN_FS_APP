import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import CustomHeader from "../../../components/common/CustomHeader";
import { CalendarList } from "react-native-calendars";
import { StatusHeight, HeaderHeight } from "../../../utils/HeaderHeight";
import { useRoute } from "@react-navigation/native";
import { moderateScale } from "react-native-size-matters";
import { getYearMonthDay, getMonth, getDate } from "../../../utils/DateFormat";
import { GREEN_COLOR, BG_COLOR } from "../../../constants/Color";
import Schedule from "./Schedule";
import Loader from "../../../components/common/Loader";

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

const _selectedDate = getYearMonthDay(
  new Date(new Date().setDate(new Date().getDate() - 1))
);
const _gottenCurrentMonth = getMonth(new Date());
const _lastDayOfMonth = new Date(
  _today.getFullYear(),
  _today.getMonth() + 1,
  0
).getDate();
const getEveryDayInMonth = (day = DAY.MONDAY, currentMonth) => {
  console.log("getEveryDayInMonth", currentMonth);
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

export default ({ schedule, CycleType }) => {
  const calendarRef = useRef(null);
  console.log("ReadSchedulePresenter", new Date());
  const [selectedDate, setSelectedDate] = useState(_selectedDate);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const processedSched = useMemo(() => {
    console.log("_calculateMarkedDates", schedule.length);

    const _oneWeek = 7;
    let _processedSched = [];

    for (let i = 0; i < schedule.length; i++) {
      const _sched = schedule[i];

      const _theDate = _sched.date;
      if (_sched.cycle === CycleType.default) {
        _sched.date = getYearMonthDay(_sched.date);
        _processedSched.push(_sched);
      } else if (_sched.cycle === CycleType.WEEK) {
        const _cycleDay = _theDate.getDay();
        const _augmentedSched = getEveryDayInMonth(_cycleDay, currentMonth).map(
          (d) => {
            const s = { ..._sched };
            s.date = getYearMonthDay(d);
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
        rightButtonEnabled={true}
        rightButton={
          <TouchableOpacity
            onPress={() => {
              setCurrentMonth(selectedDate);
            }}
            title="goBack"
            style={{ marginHorizontal: 20 }}
          >
            <Text>완료</Text>
          </TouchableOpacity>
        }
      ></CustomHeader>

      <Schedule
        schedule={processedSched}
        {...{ setSelectedDate, selectedDate, setCurrentMonth, currentMonth }}
      ></Schedule>
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
