import React, { useState, useEffect } from "react";

import Loader from "../../components/common/Loader";
import NoticePresenter from "./NoticePresenter";

export default ({ navigation }) => {
  const [data, setData] = useState({
    loading: true,
    notifications: [],
  });

  const getData = async () => {
    setData({
      loading: false,
      notifications,
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return data.loading ? (
    <Loader></Loader>
  ) : (
    <NoticePresenter {...data}></NoticePresenter>
  );
};

const notifications = [
  {
    to: "12dsadcas",
    title: "PIXEL: 새로운 히스토리가 등록되었습니다.",
    body: "연극 ‘사활을 걸어라' 제작기",
    _displayInForeground: true,
    channelId: "chat-messages",
    group: {
      groupName: "PIXEL",
      poster:
        "https://images.unsplash.com/photo-1588785392665-f6d4a541417d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320",
    },
    key: "asdasd22",
  },
  {
    to: "12dsadcas",
    title: "PIXEL: 새로운 멤버가 가입되셨습니다!.",
    body: "김댕댕님이 새로운 멤버로 들어오셨습니다",
    _displayInForeground: true,
    channelId: "chat-messages",
    group: {
      groupName: "PIXEL",
      poster:
        "https://images.unsplash.com/photo-1588785392665-f6d4a541417d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320",
    },
    key: "asdas424d22",
  },
  {
    to: "12dsadcas",
    title: "무비 씨어터: 모임 멤버가 탈퇴하셨습니다.",
    body: "민통통님이 모임을 탈퇴하셨습니다.",
    _displayInForeground: true,
    channelId: "chat-messages",
    group: {
      groupName: "PIXEL",
      poster:
        "https://images.unsplash.com/photo-1588785392665-f6d4a541417d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320",
    },
    key: "as664dasd22",
  },
  {
    to: "12dsadcas",
    title: "PIXEL: 새로운 히스토리가 등록되었습니다.",
    body: "연극 ‘사활을 걸어라' 제작기",
    _displayInForeground: true,
    channelId: "chat-messages",
    group: {
      groupName: "PIXEL",
      poster:
        "https://images.unsplash.com/photo-1588785392665-f6d4a541417d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320",
    },
    key: "asd324asd22",
  },
];
