import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import LeafIcon from "../../../components/common/svg/LeafIcon";
import CustomHeader from "../../../components/common/CustomHeader";
import { HeaderHeight, StatusHeight } from "../../../utils/HeaderHeight";
import {
  BG_COLOR,
  GREEN_COLOR,
  LIGHT_GREEN_COLOR,
} from "../../../constants/Color";
import styled from "styled-components/native";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
const { width: WIDHT, height: HEIGHT } = Dimensions.get("screen");

const Divider = styled.View`
  margin-vertical: 25px;
  margin-top: 40px;
  border-bottom-width: 1px;
  border-color: black;
  width: 90%;
  opacity: 0.5;
`;
const EmptySpace = styled.View`
  height: ${(HEIGHT * 5) / 100}px;
`;

const NextButton = ({}) => {
  const navigation = useNavigation();

  const goToNext = () => {
    navigation.navigate("GroupCreate2", {});
  };

  return (
    <View style={nextButtonStyle.container}>
      <TouchableOpacity
        style={nextButtonStyle.button}
        onPress={() => goToNext()}
      >
        <Text style={styles.text}>다음으로 이동 (1/3)</Text>
      </TouchableOpacity>
    </View>
  );
};

const nextButtonStyle = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: LIGHT_GREEN_COLOR,
    height: (HEIGHT * 8) / 100,
    width: WIDHT,
    bottom: 0,
  },
  button: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    width: "100%",
    height: "100%",
    textAlign: "center",
  },
});

export default () => {
  const [page, setPage] = useState(0);
  const [message, setMessage] = useState("");

  return (
    <>
      <CustomHeader></CustomHeader>

      <ScrollView
        contentContainerStyle={{ ...styles.container }}
        style={{ backgroundColor: BG_COLOR }}
      >
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
        {page === 0 ? (
          <>
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
                  <Text style={{ ...styles.optionText }}>
                    분야를 선택해주세요
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={{ ...styles.optionContainer }}>
              <View style={{ ...styles.optionName }}>
                <Text>지역</Text>
              </View>
              <View style={{ ...styles.optionContent }}>
                <TouchableOpacity style={{ ...styles.optionContent }}>
                  <Text style={{ ...styles.optionText }}>
                    지역을 선택해주세요
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
                  <Text style={{ ...styles.optionText }}>
                    분야를 선택해주세요
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        <EmptySpace></EmptySpace>
        <EmptySpace></EmptySpace>
        <Text>{message}</Text>
      </ScrollView>
      <NextButton setMessage={setMessage}></NextButton>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
    alignItems: "center",
  },
  category: {
    alignSelf: "flex-start",
    marginLeft: 30,
    marginTop: 30,
    fontWeight: "500",
  },
  logo: {
    top: (HEIGHT * 6.6) / 100,
    height: HEIGHT / 18,
    aspectRatio: 1,
    left: "-25%",
    marginTop: (HEIGHT * 3) / 100,
    overflow: "hidden",
    borderWidth: 1,
  },
  titleContainer: {
    marginTop: (HEIGHT * 3) / 100,
    left: "5%",
    height: HEIGHT / 18,
  },
  title: {
    fontWeight: "500",
  },
  optionContainer: {
    marginTop: 25,
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
