import React, { useEffect, useState, useReducer } from "react";
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
  DARK_GREEN_COLOR,
} from "../../../constants/Color";
import { StatusHeight, HeaderHeight } from "../../../utils/HeaderHeight";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SproutIcon from "../../../components/common/svg/SproutIcon";
import { firstCategory, secondCategory } from "../../../constants/Names";
import styled from "styled-components";
import Collapsible from "react-native-collapsible";

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

    if (list.length >= 3) {
      return;
    }

    setList((prev) => [...prev, field]);
  };

  const popField = (field) => {
    setList((prev) => prev.filter((item) => item != field));
  };

  const fieldIds = Object.keys(secondCategory);
  let _initialState = {};

  fieldIds.forEach((id) => {
    _initialState[id] = true;
  });

  const [collapsibleState, collapsibleDispatch] = useReducer(
    collapsibleReducer,
    _initialState
  );

  const submit = () => {
    navigation.navigate("GroupCreateContainer", {
      from: "SelectField",
      args: { fields: list },
    });
  };

  function collapsibleReducer(collapsibleState, action) {
    const id = (Number(action.type) + 1).toString();
    return { ...collapsibleState, [id]: !collapsibleState[id] };
  }
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
        style={{ backgroundColor: BG_COLOR, top: HeaderHeight }}
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
        {list.length != 0 ? (
          <View style={styles.selected}>
            {list.map((item, idx) => {
              return (
                <View key={`selected-item-${idx}`} style={styles.eachField}>
                  <Text
                    onPress={() => {
                      popField(item);
                    }}
                    style={styles.eachFieldText}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
        ) : null}
        <View style={styles.divider}></View>
        <View style={styles.campusContainer}>
          {firstCategory.map((category1, idx) => {
            const id = fieldIds[idx];
            return (
              <View key={`first-category-${idx}`} style={{}}>
                <View style={styles.fieldContainer}>
                  <TouchableOpacity
                    style={styles.fieldButton}
                    onPress={() => {
                      collapsibleDispatch({ type: idx.toString() });
                    }}
                  >
                    <Text style={styles.fieldTitle}>{category1}</Text>
                    <Ionicons
                      name={
                        collapsibleState[id] ? `ios-arrow-down` : `ios-arrow-up`
                      }
                      size={20}
                      style={styles.arrowDown}
                    ></Ionicons>
                  </TouchableOpacity>
                </View>
                <Collapsible collapsed={collapsibleState[id]}>
                  <View style={styles.secondCategory}>
                    {secondCategory[id].map((category2, index) => {
                      return (
                        <TouchableOpacity
                          style={styles.categoryButton}
                          key={`second-category-${index}`}
                          onPress={() => pushNewField(category2)}
                        >
                          <Text style={styles.categoryText}>{category2}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </Collapsible>
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
  selected: {
    flexDirection: "row",
    marginTop: 10,
  },
  divider: {
    borderBottomWidth: 0.3,
    borderColor: GREY_COLOR,
    height: 20,
    width: "90%",
  },
  eachField: {
    marginHorizontal: 5,
    backgroundColor: DARK_GREEN_COLOR,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  eachFieldText: {
    color: BG_COLOR,
  },
  fieldContainer: {
    borderBottomWidth: 0.3,
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
    fontWeight: "600",
  },
  categoryButton: {
    paddingVertical: 20,
  },
  categoryText: {
    marginLeft: 20,
  },
  arrowDown: {
    marginRight: 20,
  },
  secondCategory: {
    borderBottomWidth: 0.3,
    borderColor: GREY_COLOR,
    width: "90%",
    alignSelf: "center",
  },
});
