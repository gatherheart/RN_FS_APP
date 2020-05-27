import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ThemeContext } from "styled-components";
import Loader from "../../../components/common/Loader";
import CustomHeader from "../../../components/common/CustomHeader";

export default () => {
  const themeContext = useContext(ThemeContext);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [modalVisible, setModalVisible] = useState(true);

  const [data, setData] = useState({
    loading: true,
    billTitle: "",
    billMemo: "",
    deadline: "",
    closed: false,
    memberList: [],
    createdAt: "",
    author: {},
    billAmount: 0,
    bank: "",
  });

  const getData = async () => {
    setData({
      loading: false,
      ...noticeData,
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return data?.loading ? (
    <Loader></Loader>
  ) : (
    <>
      <CustomHeader
        title={"더치페이글 보기"}
        rightButton={() => setModalVisible((prev) => !prev)}
      ></CustomHeader>
      <ScrollView
        style={{
          backgroundColor: themeContext.backgroundColor,
          paddingTop: "15%",
        }}
        contentContainerStyle={{
          fontFamily: themeContext.regularFont,
        }}
        showsVerticalScrollIndicator={false}
      ></ScrollView>
    </>
  );
};

const noticeData = {
  noticeTitle: "중간고사로 인한 일정 변경",
  noticeMemo:
    "안녕하세요. 서기 박야옹입니다. 다름이 아니라 4월 초 회장단 회의 결과를 말씀드리고자 글을 올리게 되었습니다.\
  이번 1학기 총학생회측에서 말씀드린 바와 같이 4월 중순으로 잡혀있던 중간고사 일정이 4월 말로 미뤄짐에 따라, 저희 중앙동아리 PIXEL의 4월달과 5월달의 일정을 중간고사 기간에 영향을 미치지 않도록 5월과 6월 초로 미루게 되었습니다. 일정은 현재 운영진과 함께 조율 중에 있어, 날짜가 확정되는대로 알려드리도록 하겠습니다.\
  문의사항이나 다른 의견사항이 있으면 언제든 말씀해주세요.",
  author: {
    name: "장안구",
    id: "7",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 2,
    major: "소프트웨어학과",
  },
  createdAt: "2020-05-19T08:14:00.000Z",
  isMandatory: true,
};
