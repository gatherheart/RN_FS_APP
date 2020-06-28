import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import CustomHeader from "../../../components/common/CustomHeader";
import {
  BG_COLOR,
  GREY_COLOR,
  LIGHT_GREY_COLOR,
} from "../../../constants/Color";
import { StatusHeight } from "../../../utils/HeaderHeight";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SproutIcon from "../../../components/common/svg/SproutIcon";
import { firstCategory, secondCategory } from "../../../constants/Names";
import styled from "styled-components";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const SELECTION_LIMIT = 3;

const EmptySpace = styled.View`
  height: ${(HEIGHT * 5) / 100}px;
`;

export default () => {
  const [list, setList] = useState([]);
  const navigation = useNavigation();
  const pushNewField = (field) => {
    if (list.includes(field)) {
      setList((prev) => prev.filter((item) => item != field));
      return;
    }
    setList((prev) => [...prev, field]);
  };
  const fieldIds = Object.keys(secondCategory);
  const submit = () => {
    navigation.navigate("GroupCreateContainer", {
      from: "SelectField",
      args: { fields: list },
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
      >
        <View style={{ ...styles.optionContainer }}>
          <View style={{}}>
            <SproutIcon
              width={(WIDTH * 10) / 100}
              height={(HEIGHT * 5) / 100}
            ></SproutIcon>
          </View>
          <Text style={{ ...styles.title }}>분야를 선택해주세요!</Text>
        </View>
        <Text style={styles.info}>세개까지 선택이 가능합니다</Text>
        <View style={styles.divider}></View>
        <View style={styles.campusContainer}>
          {firstCategory.map((category1, idx) => {
            const id = fieldIds[idx];
            return (
              <View key={`first-category-${idx}`} style={{}}>
                <View style={styles.fieldContainer}>
                  <TouchableOpacity style={styles.fieldButton}>
                    <Text style={styles.fieldTitle}>{category1}</Text>
                    <Ionicons
                      name={`ios-arrow-down`}
                      size={20}
                      style={styles.arrowDown}
                    ></Ionicons>
                  </TouchableOpacity>
                </View>
                <View style={{}}>
                  {secondCategory[id].map((category2, index) => {
                    return (
                      <View key={`second-category-${index}`}>
                        <TouchableOpacity>
                          <Text>{category2}</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
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
  fieldContainer: {
    borderWidth: 1,
    height: 80,
    width: WIDTH,
    justifyContent: "center",
  },
  fieldButton: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  fieldTitle: {
    marginLeft: 40,
  },
  arrowDown: {
    marginRight: 20,
  },
});
