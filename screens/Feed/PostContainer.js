import React, { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import PostPresenter from "./PostPresenter";

export default ({}) => {
  const [data, setData] = useState({
    loading: true,
  });
  const getData = async () => {
    setData({
      loading: false,
      ..._data,
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return data?.loading ? (
    <Loader></Loader>
  ) : (
    <PostPresenter {...data}></PostPresenter>
  );
};

const _data = {
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
      text: "ASD",
      user: {
        id: "632",
        username: "asd",
        avatar: "https://miro.medium.com/max/256/1*d69DKqFDwBZn_23mizMWcQ.png",
      },
    },
  ],
  createdAt: "2020/07/21",
};
