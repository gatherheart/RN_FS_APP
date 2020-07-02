import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import ReadQnAPresenter from "./ReadQnAPresenter";
import Loader from "../../../components/common/Loader";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default ({}) => {
  const [data, setData] = useState({
    loading: true,
  });

  const getData = async () => {
    setData({
      loading: false,
      qna: _data,
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return !data.loading ? (
    <ReadQnAPresenter qnas={data.qna}></ReadQnAPresenter>
  ) : (
    <Loader></Loader>
  );
};

const _data = [
  {
    id: "123",
    question: "동아리 2차 추가모집은 있나요?",
    answer: "",
    author: {
      name: "김**",
    },
    issuedDate: new Date(),
    answeredDate: undefined,
  },
  {
    id: "142423",
    question: "동아리 2차 추가모집은 있나요?",
    answer:
      "선택적으로 참여여부를 결정할 수 있지만, MT나 총회 등, 동아리 정기 모임을 3번 이상은 참여하셔야 합니다.",
    author: {
      name: "김**",
    },
    issuedDate: new Date(),
    answeredDate: new Date(),
  },
  {
    id: "123243",
    question: "동아리 2차 추가모집은 있나요?",
    answer:
      "선택적으로 참여여부를 결정할 수 있지만, MT나 총회 등, 동아리 정기 모임을 3번 이상은 참여하셔야 합니다.",
    author: {
      name: "김**",
    },
    issuedDate: new Date(),
    answeredDate: new Date(),
  },
  {
    id: "1223563",
    question: "동아리 2차 추가모집은 있나요?",
    answer:
      "선택적으로 참여여부를 결정할 수 있지만, MT나 총회 등, 동아리 정기 모임을 3번 이상은 참여하셔야 합니다.",
    author: {
      name: "김**",
    },
    issuedDate: new Date(),
    answeredDate: new Date(),
  },
];
