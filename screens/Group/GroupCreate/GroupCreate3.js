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
import {
  HeaderHeight,
  StatusHeight,
  UnderHeader,
} from "../../../utils/HeaderHeight";
import {
  BG_COLOR,
  GREEN_COLOR,
  LIGHT_GREEN_COLOR,
  LIGHT_GREY_COLOR,
} from "../../../constants/Color";
import styled from "styled-components/native";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
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
    //navigation.navigate("GroupCreate2", {});
  };

  return (
    <View style={nextButtonStyle.container}>
      <TouchableOpacity
        style={nextButtonStyle.button}
        onPress={() => goToNext()}
      >
        <Text style={styles.text}>완료</Text>
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
  const [message, setMessage] = useState("");
  const page = 0;
  return (
    <>
      <CustomHeader></CustomHeader>

      <ScrollView
        contentContainerStyle={{ ...styles.container }}
        style={{ backgroundColor: BG_COLOR }}
      >
        <Text style={{ ...styles.category }}>모임 프로필</Text>

        {page === 0 ? (
          <>
            <View style={{ ...styles.imageContainer }}>
              <TouchableOpacity style={styles.imageUpload}>
                <MaterialIcons name={"add-to-photos"} size={26}></MaterialIcons>
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.optionContainer }}>
              <View style={{ ...styles.optionName }}>
                <Text>모임 이름</Text>
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
                <Text>소개</Text>
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
                <Text>소개</Text>
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
    top: StatusHeight,
    backgroundColor: BG_COLOR,
    alignItems: "center",
  },
  imageContainer: {
    height: (HEIGHT * 20) / 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imageUpload: {
    width: (WIDHT * 37) / 100,
    height: (WIDHT * 37) / 100,
    borderRadius: (WIDHT * 37) / 100 / 2,
    backgroundColor: LIGHT_GREY_COLOR,
    opacity: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.23,
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
