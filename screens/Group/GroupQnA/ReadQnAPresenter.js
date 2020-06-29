import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import CustomHeader from "../../../components/common/CustomHeader";
import styled from "styled-components/native";
import { BG_COLOR } from "../../../constants/Color";
import { HeaderHeight } from "../../../utils/HeaderHeight";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Svg, { Path } from "react-native-svg";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const EmptySpace = styled.View``;

const BubbleChat = () => {
  return (
    <>
      <View style={[styles.item, styles.itemOut]}>
        <View style={[styles.balloon, { backgroundColor: "#EFEFEF" }]}>
          <Text style={{ paddingTop: 5, color: "black" }}>
            Hey! I am good. How are you?s adasdasdasdsad asdasdasd asd asd asd
            sa sadasdas dsad as das dasdasdasdasdasdsadasdasdasdsad s Hey! I am
            good. How are you?s adasdasdasdsad asdasdasd asd asd asd sa sadasdas
            dsad as das dasdasdasdasdasdsadasdasdasdsad s Hey! I am good. How
            are you?s adasdasdasdsad asdasdasd asd asd asd sa sadasdas dsad as
            das dasdasdasdasdasdsadasdasdasdsad s Hey! I am good. How are you?s
            adasdasdasdsad asdasdasd asd asd asd sa sadasdas dsad as das
            dasdasdasdasdasdsadasdasdasdsad s Hey! I am good. How are you?s
            adasdasdasdsad asdasdasd asd asd asd sa sadasdas dsad as das
            dasdasdasdasdasdsadasdasdasdsad s Hey! I am good. How are you?s
            adasdasdasdsad asdasdasd asd asd asd sa sadasdas dsad as das
            dasdasdasdasdasdsadasdasdasdsad s
          </Text>
          <View style={[styles.arrowContainer]}>
            <Svg
              style={styles.arrowLeft}
              width={moderateScale(15.5, 1)}
              height={moderateScale(17.5, 1)}
              viewBox="0 0 88 48"
              enable-background="new 32.485 17.5 15.515 17.5"
            >
              <Path
                d="M0 -7.36428e-06L88 -7.36428e-06V48L0 -7.36428e-06Z"
                fill="#F0F0F0"
              />
            </Svg>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: moderateScale(7, 2),
    flexDirection: "row",
  },
  itemIn: {
    marginLeft: 20,
  },
  itemOut: {
    alignSelf: "flex-end",
    marginRight: 20,
  },
  balloon: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(5, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 8,
  },
  arrowContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1,
  },
  arrowLeftContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  arrowRightContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  arrowLeft: {
    left: moderateScale(-10, 0.5),
  },

  arrowRight: {
    right: moderateScale(-6, 0.5),
  },
});

const QnAComponent = ({ question, answer }) => {
  return (
    <View style={QnAStyles.container}>
      <View style={QnAStyles.question}>
        <View>
          <Text>{question}</Text>
          <View style={QnAStyles.info}>
            <Text>답변 대기</Text>
            <Text>2020-02-02</Text>
          </View>
        </View>
        <View>
          <Text>삭제</Text>
        </View>
      </View>
      <View style={QnAStyles.answer}>
        <Text>{answer}</Text>
      </View>
      <BubbleChat></BubbleChat>
    </View>
  );
};

const QnAStyles = StyleSheet.create({
  container: { width: (WIDTH * 90) / 100, borderWidth: 1 },
  question: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    flexDirection: "row",
  },
  answer: { width: "100%", marginTop: 20 },
});
export default ({ qna }) => {
  console.log(qna[0]);
  return (
    <>
      <CustomHeader title={"Q&A"} rightButtonEnabled={false}></CustomHeader>
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
        contentContainerStyle={{ borderWidth: 1, alignItems: "center" }}
      >
        <QnAComponent
          question={qna[0].question}
          answer={qna[0].answer}
        ></QnAComponent>
      </ScrollView>
    </>
  );
};
