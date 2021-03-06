import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import CustomHeader from "../../../components/common/CustomHeader";
import styled from "styled-components/native";
import {
  BG_COLOR,
  LIGHT_GREEN_COLOR,
  GREEN_COLOR,
  GREY_COLOR,
} from "../../../constants/Color";
import { HeaderHeight } from "../../../utils/HeaderHeight";
import BubbleChat from "../../../components/common/BubbleChat";
import {
  timePickedConverter,
  getYearMonthDay,
} from "../../../utils/DateFormat";
import { useNavigation } from "@react-navigation/native";
import AlertModal from "../../../components/common/AlertModal";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const EmptySpace = styled.View``;

const DELETE_TYPE = Object.freeze({
  QUESTION: "question",
  ANSWER: "answer",
});

const QnAComponent = ({
  id,
  question,
  answer,
  author,
  questionedDate,
  answeredDate,
}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState({
    visible: false,
    message: "삭제하시겠습니까?",
    type: undefined,
  });
  const [completed, setCompleted] = useState(false);
  const goToWrite = (id, question, answer) => {
    navigation.navigate("GroupAnswerWrite", { id, question, answer });
  };

  return (
    <>
      <AlertModal
        modalVisible={!!modalVisible.visible}
        setModalVisible={setModalVisible}
        title={""}
        body={modalVisible.message}
        cancleEnabled
        callback={() => {}}
        onModalHide={() => {
          console.log("onModalHide");
          setCompleted(true);
        }}
      ></AlertModal>
      <AlertModal
        modalVisible={completed}
        setModalVisible={setCompleted}
        body={"완료되었습니다."}
        callback={() => {
          console.log(completed);
        }}
      ></AlertModal>
      <View style={QnAStyles.container}>
        <View style={QnAStyles.question}>
          <View>
            <Text style={QnAStyles.questionText}>{question}</Text>
            <View style={QnAStyles.info}>
              <Text
                style={{ ...QnAStyles.questionInfo, ...QnAStyles.greenColor }}
              >
                {answeredDate ? "답변 완료" : "답변 대기"}
              </Text>
              <Text style={{ ...QnAStyles.questionInfo }}>
                {" "}
                | {author.name}
              </Text>
              <Text style={{ ...QnAStyles.questionInfo }}>
                {" "}
                | {getYearMonthDay(questionedDate)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible((prev) => {
                return {
                  visible: true,
                  message: "삭제하시겠습니까?",
                  type: DELETE_TYPE.QUESTION,
                };
              });
            }}
          >
            <View>
              <Text style={{ ...QnAStyles.greenColor }}>삭제</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={QnAStyles.answer}>
          {answeredDate ? (
            <BubbleChat>
              <View style={{ ...QnAStyles.bubbleContainer }}>
                <Text style={QnAStyles.answerText}>{answer}</Text>
                <View style={QnAStyles.answerInfo}>
                  <Text
                    style={{
                      ...QnAStyles.questionInfo,
                      marginTop: 10,
                    }}
                  >
                    {getYearMonthDay(answeredDate)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      goToWrite(id, question, answer);
                    }}
                  >
                    <Text
                      style={{
                        ...QnAStyles.textMargin,
                        ...QnAStyles.greenColor,
                      }}
                    >
                      수정
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible((prev) => {
                        return {
                          visible: true,
                          message: prev.message,
                          type: DELETE_TYPE.ANSWER,
                        };
                      });
                    }}
                  >
                    <Text
                      style={{
                        ...QnAStyles.textMargin,
                        ...QnAStyles.greenColor,
                      }}
                    >
                      삭제
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BubbleChat>
          ) : (
            <BubbleChat>
              <TouchableOpacity
                style={{ ...QnAStyles.bubbleContainer }}
                onPress={() => goToWrite(id, question)}
              >
                <Text style={QnAStyles.unanswerText}>답변을 입력해주세요</Text>
              </TouchableOpacity>
            </BubbleChat>
          )}
        </View>
      </View>
    </>
  );
};

const QnAStyles = StyleSheet.create({
  container: { width: (WIDTH * 90) / 100, borderWidth: 0 },
  bubbleContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  question: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 10,
  },
  questionText: {},
  questionInfo: {
    fontSize: 12,
    fontWeight: "200",
  },
  answerText: {
    lineHeight: 20,
  },
  unanswerText: {
    color: GREY_COLOR,
  },
  answerInfo: {
    flexDirection: "row",
  },
  textMargin: {
    marginTop: 10,

    marginLeft: 20,
  },
  greenColor: { color: GREEN_COLOR },
  info: {
    marginTop: 10,
    flexDirection: "row",
  },
  answer: { width: "100%", marginTop: 20 },
});
export default ({ qnas }) => {
  const navigation = useNavigation();
  const goToWriteQuestion = () => {
    navigation.navigate("GroupQuestionWrite", {});
  };
  return (
    <>
      <CustomHeader
        title={"Q&A"}
        rightButtonEnabled={true}
        rightButton={
          <Text onPress={() => goToWriteQuestion()} style={{ marginRight: 5 }}>
            질문 하기
          </Text>
        }
      ></CustomHeader>
      <ScrollView
        style={{
          backgroundColor: BG_COLOR,
          borderWidth: 1,
        }}
        contentInset={{
          top: HeaderHeight,
        }}
        contentOffset={{
          y: -HeaderHeight,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ borderWidth: 0, alignItems: "center" }}
      >
        {qnas.map((qna, idx) => (
          <View style={{ ...styles.qnaContainer }} key={`qna-component-${idx}`}>
            <QnAComponent
              id={qna.id}
              question={qna.question}
              answer={qna.answer}
              questionedDate={qna.issuedDate}
              answeredDate={qna.answeredDate}
              author={qna.author}
            ></QnAComponent>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  qnaContainer: {
    borderBottomColor: GREY_COLOR,
    width: WIDTH,
    alignItems: "center",
    borderBottomWidth: 0.4,
    paddingVertical: 10,
  },
});
