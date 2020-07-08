import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import CustomHeader from "../../../components/common/CustomHeader";
import {
  BG_COLOR,
  GREY_COLOR,
  LIGHT_GREY_COLOR,
} from "../../../constants/Color";
import { StatusHeight, HeaderHeight } from "../../../utils/HeaderHeight";
import SchoolIcon from "../../../components/common/svg/SchoolIcon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Loader from "../../../components/common/Loader";
import { schoolNames } from "../../../constants/Names";
import styled from "styled-components/native";
import StudyIcon from "../../../components/common/svg/StudyIcon";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const EmptySpace = styled.View`
  height: ${(HEIGHT * 5) / 100}px;
`;
export default () => {
  const [data, setData] = useState({
    loading: true,
  });
  const [list, setList] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { from: prevScreen } = route.params;

  const pushNewSchool = (school) => {
    if (list.includes(school)) {
      setList((prev) => prev.filter((item) => item != school));
      return;
    }
    setList((prev) => [...prev, school]);
  };
  const getData = async () => {
    //const [result, error] = await movieApi.nowPlaying();
    setData({
      loading: false,
      institutions: institutions,
    });
  };
  const submit = () => {
    navigation.navigate(prevScreen, {
      from: "SelectMajor",
      args: { majors: list },
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return data.loading ? (
    <Loader></Loader>
  ) : (
    <>
      <CustomHeader
        rightButton={
          <Text
            style={styles.customHeader}
            onPress={() => {
              submit();
            }}
          >
            완료
          </Text>
        }
      ></CustomHeader>

      <ScrollView
        contentContainerStyle={{ ...styles.container, borderWidth: 1 }}
        style={{ backgroundColor: BG_COLOR, top: HeaderHeight }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ ...styles.optionContainer }}>
          <View style={{}}>
            <StudyIcon
              width={(WIDTH * 10) / 100}
              height={(HEIGHT * 5) / 100}
            ></StudyIcon>
          </View>
          <Text style={{ ...styles.title }}>전공을 선택해주세요!</Text>
        </View>
        <Text style={styles.info}>다중 선택이 가능합니다</Text>
        <View style={styles.divider}></View>
        <View style={styles.campusContainer}>
          {data?.institutions
            ? data.institutions.map((inst, idx) => {
                const identity = inst.major;
                return (
                  <TouchableOpacity
                    key={`institution-list-${idx}`}
                    style={styles.institutionContainer}
                    onPress={() => pushNewSchool(identity)}
                  >
                    <Text>{identity}</Text>
                    {list.includes(identity) ? (
                      <Ionicons name={"ios-checkmark"} size={30}></Ionicons>
                    ) : null}
                  </TouchableOpacity>
                );
              })
            : null}
        </View>
        <EmptySpace></EmptySpace>
        <EmptySpace></EmptySpace>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
    alignItems: "center",
  },
  customHeader: {
    marginRight: 5,
  },
  optionContainer: {
    height: 80,
    width: WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 40,
  },
  title: {
    marginLeft: 20,
  },
  info: {
    fontSize: 13,
    color: GREY_COLOR,
  },
  divider: {
    borderBottomWidth: 0.3,
    borderColor: GREY_COLOR,
    height: 20,
    width: "90%",
  },
  institutionContainer: {
    flexDirection: "row",
    height: 65,
    borderBottomWidth: 1,
    borderBottomColor: GREY_COLOR,
    width: (WIDTH * 90) / 100,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
});
const institutions = [
  {
    range: "COLLEGE_LEVEL",
    school: "성균관대학교",
    campus: "자연과학캠퍼스",
    college: "공과대학",
    major: "나노공학",
  },
  {
    range: "COLLEGE_LEVEL",
    school: "성균관대학교",
    campus: "자연과학캠퍼스",
    college: "공과대학",
    major: "건축학과",
  },
  {
    range: "COLLEGE_LEVEL",
    school: "성균관대학교",
    campus: "자연과학캠퍼스",
    college: "공과대학",
    major: "시스템경영공학과",
  },
  {
    range: "COLLEGE_LEVEL",
    school: "성균관대학교",
    campus: "자연과학캠퍼스",
    college: "공과대학",
    major: "건설환경공학부",
  },
  {
    range: "COLLEGE_LEVEL",
    school: "성균관대학교",
    campus: "자연과학캠퍼스",
    college: "공과대학",
    major: "기계공학부",
  },
  {
    range: "COLLEGE_LEVEL",
    school: "성균관대학교",
    campus: "자연과학캠퍼스",
    college: "공과대학",
    major: "신소재공학부",
  },
  {
    range: "COLLEGE_LEVEL",
    school: "성균관대학교",
    campus: "자연과학캠퍼스",
    college: "공과대학",
    major: "화학공학/고분자공학부",
  },
];
