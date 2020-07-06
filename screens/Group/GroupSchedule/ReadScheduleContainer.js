import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ThemeContext } from "styled-components";
import Loader from "../../../components/common/Loader";
import CustomHeader from "../../../components/common/CustomHeader";
import ReadSchedulePresenter from "./ReadSchedulePresenter";
import { CycleType } from "../../../constants/Enum";

export default () => {
  const [data, setData] = useState({
    loading: true,
  });

  const getData = async () => {
    setData({
      loading: false,
      schedule: scheduleData,
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return data?.loading ? (
    <Loader></Loader>
  ) : (
    <>
      <ReadSchedulePresenter schedule={data.schedule}></ReadSchedulePresenter>
    </>
  );
};

const scheduleData = [
  {
    id: "1234",
    title: "회식 일정",
    memo: "집에서 회식할 예정",
    date: new Date(),
    cycle: CycleType.WEEK,
    issuedDate: new Date(),
    groupName: "PIXEL",
  },
  {
    id: "123434",
    title: "연습 일정",
    memo: "연습하자 예정",
    date: new Date(),
    cycle: CycleType.WEEK,
    issuedDate: new Date(),
    groupName: "PIXEL",
  },
  {
    id: "1223634",
    title: "회식 일정",
    memo: "집에서 회식할 예정",
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    cycle: CycleType.MONTH,
    issuedDate: new Date(),
    groupName: "PIXEL",
  },
  {
    id: "1238654",
    title: "회식 일정",
    memo: "집에서 회식할 예정",
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    cycle: CycleType.DEFAULT,
    issuedDate: new Date(),
    groupName: "PIXEL",
  },
  {
    id: "1457234",
    title: "회식 일정",
    memo: "집에서 회식할 예정",
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
    cycle: CycleType.WEEK,
    issuedDate: new Date(),
    groupName: "PIXEL",
  },
];
