import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import CustomHeader from "../../../components/common/CustomHeader";
import {
  BG_COLOR,
  GREY_COLOR,
  LIGHT_GREY_COLOR,
} from "../../../constants/Color";
import { StatusHeight } from "../../../utils/HeaderHeight";
import SchoolIcon from "../../../components/common/svg/SchoolIcon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Loader from "../../../components/common/Loader";
import { schoolNames } from "../../../constants/Names";
import styled from "styled-components/native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const EmptySpace = styled.View`
  height: ${(HEIGHT * 5) / 100}px;
`;
export default () => {
  const [data, setData] = useState({
    loading: true,
  });
  const [list, setList] = useState([]);
  let institutions2 = [];
  schoolNames.forEach((school) => {
    const splited = school.split(" ");
    const _school = splited[0];
    let _campus;
    if (splited.length <= 1) {
      _campus = undefined;
    } else {
      _campus = splited[1];
    }
    institutions2.push({
      range: "CAMPUS_LEVEL",
      school: _school,
      campus: _campus,
      college: undefined,
      major: undefined,
    });
  });

  const navigation = useNavigation();
  const route = useRoute();
  const { from: prevScreen } = route.params;
  console.log(route);

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
      institutions: institutions2,
    });
  };
  const submit = () => {
    console.log(route);
    navigation.navigate(prevScreen, {
      from: "SelectSchool",
      args: { schools: list },
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
        style={{ backgroundColor: BG_COLOR }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ ...styles.optionContainer }}>
          <View style={{}}>
            <SchoolIcon
              width={(WIDTH * 10) / 100}
              height={(HEIGHT * 5) / 100}
            ></SchoolIcon>
          </View>
          <Text style={{ ...styles.title }}>학교를 선택해주세요!</Text>
        </View>
        <Text style={styles.info}>다중 선택이 가능합니다</Text>
        <View style={styles.divider}></View>
        <View style={styles.campusContainer}>
          {data?.institutions
            ? data.institutions.map((inst, idx) => {
                const _campus = inst.campus || "";
                const identity = inst.school + " " + _campus;
                return (
                  <TouchableOpacity
                    key={`institution-list-${idx}`}
                    style={styles.institutionContainer}
                    onPress={() => pushNewSchool(identity)}
                  >
                    <Text>
                      {inst.school} {inst.campus}
                    </Text>
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
    top: StatusHeight,
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
    range: "CAMPUS_LEVEL",
    school: "성균관대학교",
    campus: "자연과학캠퍼스",
    college: undefined,
    major: undefined,
  },
  {
    range: "CAMPUS_LEVEL",
    school: "성균관대학교",
    campus: "인문사회과학캠퍼스",
    college: undefined,
    major: undefined,
  },
];
