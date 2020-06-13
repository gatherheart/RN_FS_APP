import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Loader from "../../components/common/Loader";
import { useRoute } from "@react-navigation/native";
import PostListPresenter from "./PostListPresenter";
import { POST_HEIGHT } from "../../constants/Size";

export default ({ navigation }) => {
  const route = useRoute();
  const { posts, totalLength, currerntIdx, LOAD_IMG_NUM } = route.params;
  const _getScrollDistance = (index) => {
    const _start = index + 1 - LOAD_IMG_NUM <= 0 ? 0 : index - LOAD_IMG_NUM;
    return _start == 0 ? currerntIdx : LOAD_IMG_NUM;
  };
  const scrollDistance = _getScrollDistance(currerntIdx) * POST_HEIGHT;
  console.log(_getScrollDistance(currerntIdx), scrollDistance);

  const [data, setData] = useState({
    posts: [],
  });
  const getData = async () => {
    const { fromIndex } = route.params;
    setData({
      loading: false,
      posts: posts,
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return data.loading ? (
    <Loader></Loader>
  ) : (
    <PostListPresenter
      {...data}
      scrollDistance={scrollDistance}
    ></PostListPresenter>
  );
};

const _data = [
  {
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
    files: [
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
          avatar:
            "https://miro.medium.com/max/256/1*d69DKqFDwBZn_23mizMWcQ.png",
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
          avatar:
            "https://miro.medium.com/max/256/1*d69DKqFDwBZn_23mizMWcQ.png",
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
  },
];
