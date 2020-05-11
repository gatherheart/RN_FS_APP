import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import GroupPrenster from "./GroupPresenter";
import Loader from "../../components/Loader";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default ({
  navigation,
  route: {
    params: { id, groupName },
  },
}) => {
  const [group, setGroup] = useState({
    loading: true,
  });

  const getData = async () => {
    setGroup({
      loading: false,
      id: 1,
      groupName: "PIXEL",
      isSchool: true, // School or Union
      applicable: true,
      applicableDate: "2020-06-30",
      createdAt: "2019-02-01",
      updatedAt: "2020-05-31",
      school: { name: "성균관대학교", id: 22 },
      campus: { name: "자연과학캠퍼스", id: 32 },
      area: [], // If the type of a group is school, area field is not required
      college: { name: "사범대학", id: 12 },
      major: { name: "유아교육과", id: 112 },
      fieldTag: ["미술", "친목", "문화감상"],
      introTag: ["미술", "가족같은"],
      memberCount: 32,
      followerCount: 30,
      members: [{ name: "김현우", id: 342324 }], // [User!]! exclude the owner and managers
      owner: [{ name: "이안수", id: 12345 }],
      manager: [{ name: "장강우", id: 6844 }],
      description: "우리는 Pixel입니다",
      joiningConditions: [
        {
          school: [{ name: "성균관대학교", id: 22 }],
          college: [
            { name: "자연과학캠퍼스", id: 32 },
            { name: "인문사회캠퍼스", id: 33 },
          ],
          major: [],
          class: [], // 학번 condition
        },
      ],
      votes: [
        {
          type: "vote",
          id: 132352,
          title: "4월 회식 날짜",
          date: "2020-04-21",
        },
        {
          type: "vote",
          id: 12341,
          title: "5월 회식 날짜",
          date: "2019-05-01",
        },
      ],
      schedules: [
        {
          type: "schedule",

          id: 115532,
          title: "4월 회식",
          date: "2020-04-19",
        },
      ],
      mandatoryNotice: ["4월 회식"],
      notices: [
        {
          type: "notice",
          id: 112,
          title: "4월 회식",
          date: "2020-04-19",
        },
      ],
      bills: [
        {
          type: "bill",
          id: 112342,
          title: "4월 회식",
          date: "2020-04-20",
          amount: 20000,
          members: [{ name: "김현우", id: 342324 }],
        },
        {
          type: "bill",
          id: 11222,
          title: "2월 회식",
          date: "2020-02-20",
          amount: 30000,
          members: [{ name: "김현우", id: 342324 }],
        },
      ],
      posts: [
        {
          id: 22,
          author: {},
          isPublic: 1, // 0 private 1 allowed by author 2 allowed by a group manager
          title: "좋은 날",
          body: "오늘은 좋은날",
          images: [],
          likeCount: 2,
          comments: [],
          scrapCount: 2,
        },
      ],
      qna: [
        {
          id: 222,
          body: "무슨 요일인가요",
          answer: "",
          author: {},
        },
      ],
      poster: "", // uri
      background: "", // uri
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return !group.loading ? (
    <GroupPrenster group={group} refreshFn={getData}></GroupPrenster>
  ) : (
    <Loader></Loader>
  );
};
