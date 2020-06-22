import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Loader from "../../../components/common/Loader";
import GroupIntroPresenter from "./GroupIntroPresenter";
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
      ..._data,
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return !group.loading ? (
    <GroupIntroPresenter
      group={group}
      refreshFn={getData}
    ></GroupIntroPresenter>
  ) : (
    <Loader></Loader>
  );
};

const _post = {
  id: "212",
  location: "Seoul",
  title: "연극 ‘사활을 걸어라’ 제작기",
  body:
    "안녕하세요, 픽셀입니다. 이번 2월 초부터 3월 중순까지 연극 ‘사활을 걸어라’ 공연이 진행되었습니다. 이번 코로나 사태로 잦은 휴관이 반복되어 많은 분들과 함께하지 못해 아…",
  user: {
    id: "213",
    avatar: "https://miro.medium.com/max/256/1*d69DKqFDwBZn_23mizMWcQ.png",
    username: "ABC",
  },
  images: [
    {
      id: "12321",
      uri:
        "https://images.unsplash.com/photo-1589784305277-065c6c27fb5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=480&q=80",
    },
    {
      id: "16221",
      uri: "https://i.imgur.com/hU252jE.jpg",
    },
  ],
  likeCount: 23,
  isLiked: true,
  comments: [
    {
      id: "123",
      text:
        "안녕하세요, 픽셀입니다. 이번 2월 초부터 3월 중순까지 연극 ‘사활을 걸어라’ 공연이 진행되었습니다. 이번 코로나 사태로 잦은 휴관이 반복되어 많은 분들과 함께하지 못해 아…",

      user: {
        id: "632",
        username: "강인우",
        avatar: "https://miro.medium.com/max/256/1*d69DKqFDwBZn_23mizMWcQ.png",
      },
      issuedDate: "2020-06-12T16:40:35.223Z",

      comments: [
        {
          id: "123",
          text: "ASD",
          user: {
            id: "632",
            username: "이지우",
            avatar:
              "https://miro.medium.com/max/256/1*d69DKqFDwBZn_23mizMWcQ.png",
          },
          issuedDate: "2020-02-01",
        },
      ],
    },
    {
      id: "123",
      text: "ASD",
      user: {
        id: "632",
        username: "강한울",
        avatar: "https://miro.medium.com/max/256/1*d69DKqFDwBZn_23mizMWcQ.png",
      },
      issuedDate: "2020-02-01",
      comments: [
        {
          id: "123",
          text: "ASD",
          user: {
            id: "632",
            username: "오인후",
            avatar:
              "https://miro.medium.com/max/256/1*d69DKqFDwBZn_23mizMWcQ.png",
          },
          issuedDate: "2020-02-01",
        },
      ],
    },
  ],
  createdAt: "2020/07/21",
};
const _data = {
  id: "1",
  groupName: "PIXEL",
  isSchool: true, // School or Union
  applicable: true,
  applicableDate: { from: "2020-06-30", to: "2020-07-30" },
  createdAt: "2019-02-01",
  updatedAt: "2020-05-31",
  school: { name: "성균관대학교", id: "22" },
  campus: { name: "자연과학캠퍼스", id: "32" },
  area: [], // If the type of a group is school, area field is not required
  college: { name: "사범대학", id: "12" },
  major: { name: "유아교육과", id: "112" },
  fieldTag: ["미술", "친목", "문화감상"],
  introTag: ["미술", "가족같은"],
  memberCount: 32,
  followerCount: 30,
  members: [{ name: "김현우", id: "342324" }], // [User!]! exclude the owner and managers
  owner: [{ name: "이안수", id: "12345" }],
  managers: [{ name: "장강우", id: "6844" }],
  description:
    "안녕하세요, 무비씨어터입니다! \n무비씨어터는 독립영화와 감성영화, 잔잔한 분위기의 영화를 같이 보고 감상을 나누는 감성 영화동아리입니다. 평소에 감성영화를 즐겨보시거나, 다른 사람의 생각을 들어보고 싶다 하신 분들은 저희 동아리로 오셔서 재미나게 놀아보아요:)\n 매주 금요일 저녁 6시에 정기적으로 모입니다. \n한 달에 한 번씩 독립영화 시청 및 감독님과의 대화시간이 있습니다. (독립영화는 선택이며, 다수결로 결정됩니다!)",
  joiningConditions: [
    {
      school: [{ name: "성균관대학교", id: "22" }],
      college: [
        { name: "자연과학캠퍼스", id: "32" },
        { name: "인문사회캠퍼스", id: "33" },
      ],
      major: [{ name: "컴퓨터공학과", id: "24" }],
      class: { from: 15, to: 20 }, // 학번 condition
    },
  ],
  votes: [
    {
      type: "vote",
      id: "132352",
      title: "4월 회식 날짜",
      date: "2020-04-21",
    },
    {
      type: "vote",
      id: "12341",
      title: "5월 회식 날짜",
      date: "2019-05-01",
    },
  ],
  schedules: [
    {
      type: "schedule",

      id: "115532",
      title: "4월 회식",
      date: "2020-04-19",
    },
  ],
  mandatoryNotice: ["4월 회식"],
  notices: [
    {
      type: "notice",
      id: "112",
      title: "4월 회식",
      date: "2020-04-19",
    },
  ],
  bills: [
    {
      type: "bill",
      id: "112342",
      title: "4월 회식",
      date: "2020-04-20",
      amount: 20000,
      members: [{ name: "김현우", id: 342324 }],
    },
    {
      type: "bill",
      id: "11222",
      title: "2월 회식",
      date: "2020-02-20",
      amount: 30000,
      members: [{ name: "김현우", id: 342324 }],
    },
  ],
  posts: [
    { ..._post, id: "111" },
    { ..._post, id: "222" },
    { ..._post, id: "333" },
    { ..._post, id: "444" },
    { ..._post, id: "555" },
    { ..._post, id: "666" },
    { ..._post, id: "777" },
    { ..._post, id: "888" },
  ],
  qna: [
    {
      id: "222",
      body: "무슨 요일인가요",
      answer: "",
      author: {},
    },
  ],
  poster: "", // uri
  background: "", // uri
};
