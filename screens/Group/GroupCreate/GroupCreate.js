import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import LeafIcon from "../../../components/common/LeafIcon";
import CustomHeader from "../../../components/common/CustomHeader";
import { HeaderHeight } from "../../../utils/HeaderHeight";
import {
  BG_COLOR,
  GREEN_COLOR,
  LIGHT_GREEN_COLOR,
} from "../../../constants/Color";
import styled from "styled-components/native";

const Divider = styled.View`
  margin-vertical: 25px;
  margin-top: 40px;
  border-bottom-width: 1px;
  border-color: black;
  width: 90%;
  opacity: 0.5;
`;
const { width: WIDHT, height: HEIGHT } = Dimensions.get("screen");

export default () => {
  const [page, setPage] = useState(0);

  return (
    <View style={{ ...styles.container }}>
      <CustomHeader></CustomHeader>
      <View style={{ ...styles.logo }}>
        <LeafIcon></LeafIcon>
      </View>
      <View style={{ ...styles.titleContainer }}>
        <Text style={{ ...styles.title }}>우리의 숲을 만들어볼까요?</Text>
      </View>
      <Text style={{ ...styles.category }}>모임 정보</Text>
      <View style={{ ...styles.optionContainer }}>
        <View style={{ ...styles.optionName }}>
          <Text>범위</Text>
        </View>
        <View style={{ ...styles.optionContent }}>
          <TouchableOpacity
            style={{
              ...styles.pageButton,
              backgroundColor: page === 0 ? LIGHT_GREEN_COLOR : BG_COLOR,
            }}
            onPress={() => setPage(0)}
          >
            <Text style={{ ...styles.optionText, opacity: 1 }}>학교</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.pageButton,
              backgroundColor: page === 1 ? LIGHT_GREEN_COLOR : BG_COLOR,
            }}
            onPress={() => setPage(1)}
          >
            <Text style={{ ...styles.optionText, opacity: 1 }}>연합</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ ...styles.optionContainer }}>
        <View style={{ ...styles.optionName }}>
          <Text>학교</Text>
        </View>
        <View style={{ ...styles.optionContent }}>
          <TouchableOpacity style={{ ...styles.optionContent }}>
            <Text style={{ ...styles.optionText }}>
              학교 및 캠퍼스를 선택해주세요
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ ...styles.optionContainer }}>
        <View style={{ ...styles.optionName }}>
          <Text>분야</Text>
        </View>
        <View style={{ ...styles.optionContent }}>
          <TouchableOpacity style={{ ...styles.optionContent }}>
            <Text style={{ ...styles.optionText }}>분야를 선택해주세요</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider></Divider>
      <Text style={{ ...styles.category }}>가입 조건</Text>

      <View style={{ ...styles.optionContainer }}>
        <View style={{ ...styles.optionName }}>
          <Text>학교</Text>
        </View>
        <View style={{ ...styles.optionContent }}>
          <TouchableOpacity style={{ ...styles.optionContent }}>
            <Text style={{ ...styles.optionText }}>
              학교 및 캠퍼스를 선택해주세요
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ ...styles.optionContainer }}>
        <View style={{ ...styles.optionName }}>
          <Text>단과대학</Text>
        </View>
        <View style={{ ...styles.optionContent }}>
          <TouchableOpacity style={{ ...styles.optionContent }}>
            <Text style={{ ...styles.optionText }}>무관</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ ...styles.optionContainer }}>
        <View style={{ ...styles.optionName }}>
          <Text>학과</Text>
        </View>
        <View style={{ ...styles.optionContent }}>
          <TouchableOpacity>
            <Text style={{ ...styles.optionText }}>무관</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ ...styles.optionContainer }}>
        <View style={{ ...styles.optionName }}>
          <Text>학번</Text>
        </View>
        <View style={{ ...styles.optionContent }}>
          <TouchableOpacity
            style={{
              ...styles.pageButton,
            }}
            onPress={() => setPage(0)}
          >
            <Text style={{ ...styles.optionText }}>부터</Text>
          </TouchableOpacity>
          <Text> ~ </Text>
          <TouchableOpacity
            style={{
              ...styles.pageButton,
            }}
            onPress={() => setPage(1)}
          >
            <Text style={{ ...styles.optionText }}>까지</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
    flex: 1,
    alignItems: "center",
  },
  category: {
    alignSelf: "flex-start",
    marginLeft: 30,
    marginTop: 10,
    fontWeight: "500",
  },
  logo: {
    top: HeaderHeight,
    height: HEIGHT / 18,
    aspectRatio: 1,
    left: "-25%",
    marginTop: 30,
    overflow: "hidden",
    borderWidth: 1,
  },
  titleContainer: {
    marginTop: 10,
    left: "5%",
    height: HEIGHT / 18,
  },
  title: {
    fontWeight: "500",
  },
  optionContainer: {
    marginTop: 20,
    flexDirection: "row",
    borderWidth: 1,
    height: 40,
    width: "90%",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  optionName: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: "18%",
    backgroundColor: LIGHT_GREEN_COLOR,
    borderRadius: 8,
  },
  optionContent: {
    height: "100%",
    width: "82%",
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    flexDirection: "row",
  },
  pageButton: {
    borderWidth: 1,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  optionText: {
    opacity: 0.5,
    textAlign: "center",
    justifyContent: "center",
    width: "100%",
    borderWidth: 1,
  },
});
