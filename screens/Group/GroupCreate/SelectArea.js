import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import CustomHeader from "../../../components/common/CustomHeader";
import {
  BG_COLOR,
  GREY_COLOR,
  LIGHT_GREY_COLOR,
} from "../../../constants/Color";
import { StatusHeight, HeaderHeight } from "../../../utils/HeaderHeight";
import EarthGlobeIcon from "../../../components/common/svg/EarthGlobeIcon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { areaNames } from "../../../constants/Names";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

export default () => {
  const [list, setList] = useState([]);
  const navigation = useNavigation();
  const pushNewSchool = (area) => {
    if (list.includes(area)) {
      setList((prev) => prev.filter((item) => item != area));
      return;
    }
    setList((prev) => [...prev, area]);
  };

  const submit = () => {
    navigation.navigate("GroupCreateContainer", {
      from: "SelectArea",
      args: { areas: list },
    });
  };

  return (
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
        contentContainerStyle={{ ...styles.container }}
        style={{ backgroundColor: BG_COLOR }}
        contentInset={{
          top: HeaderHeight,
        }}
        contentOffset={{
          y: -HeaderHeight,
        }}
      >
        <View style={{ ...styles.optionContainer }}>
          <View style={{}}>
            <EarthGlobeIcon
              width={(WIDTH * 10) / 100}
              height={(HEIGHT * 5) / 100}
            ></EarthGlobeIcon>
          </View>
          <Text style={{ ...styles.title }}>지역을 선택해주세요!</Text>
        </View>
        <Text style={styles.info}>다중 선택이 가능합니다</Text>
        <View style={styles.divider}></View>
        <View style={styles.campusContainer}>
          {areaNames.map((area, idx) => {
            const identity = area;
            return (
              <TouchableOpacity
                key={`area-list-${idx}`}
                style={styles.institutionContainer}
                onPress={() => pushNewSchool(identity)}
              >
                <Text>{area}</Text>
                {list.includes(identity) ? (
                  <Ionicons name={"ios-checkmark"} size={30}></Ionicons>
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>
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
