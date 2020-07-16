import React, { useEffect, useState, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import LeafIcon from "../../../components/common/svg/LeafIcon";
import CustomHeader from "../../../components/common/CustomHeader";
import {
  HeaderHeight,
  StatusHeight,
  UnderHeader,
  BottomSafeAreaHeight,
} from "../../../utils/HeaderHeight";
import {
  BG_COLOR,
  GREEN_COLOR,
  LIGHT_GREEN_COLOR,
  LIGHT_GREY_COLOR,
} from "../../../constants/Color";
import styled from "styled-components/native";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { _pickImage } from "../../../utils/FileSystem";
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
    bottom: BottomSafeAreaHeight,
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

const NAME_FIELD = "groupName";
const BODY_FIELD = "description";
const TAG_FIELD = "introTag";
export default () => {
  const [message, setMessage] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

  const initialState = { name: "", body: "" };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [logo, setLogo] = useState();

  const onChangeInput = (text, _type) => {
    dispatch({ type: _type, payload: text });
  };

  function reducer(state, action) {
    switch (action.type) {
      case NAME_FIELD:
        return { ...state, name: action.payload };
      case BODY_FIELD:
        return { ...state, body: action.payload };
      case TAG_FIELD:
        return { ...state, tag: action.payload };
      default:
        return { ...state };
    }
  }
  const {
    page,
    condSchoolList,
    condCollegeList,
    condMajorList,
    condYear,
    infoSchoolList,
    infoFieldList,
    infoAreaList,
  } = route.params;

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "height" : "height"}
      >
        <CustomHeader></CustomHeader>
        <ScrollView
          contentContainerStyle={{ ...styles.container }}
          style={{ backgroundColor: BG_COLOR, paddingTop: HeaderHeight }}
        >
          <Text style={{ ...styles.category }}>모임 프로필</Text>
          <TouchableOpacity
            style={styles.imageUpload}
            onPress={async () => {
              const pickerResult = await _pickImage();
              setLogo((prev) => {
                return pickerResult != null ? pickerResult : prev;
              });
            }}
          >
            {logo === undefined ? (
              <View style={{ ...styles.imageContainer }}>
                <MaterialIcons name={"add-to-photos"} size={26}></MaterialIcons>
              </View>
            ) : (
              <Image source={{ uri: logo.uri }} style={styles.newImage}></Image>
            )}
          </TouchableOpacity>

          <View style={{ ...styles.optionContainer }}>
            <View style={{ ...styles.optionName }}>
              <Text>모임 이름</Text>
            </View>
            <View style={{ ...styles.optionContent }}>
              <TextInput
                value={state.name}
                placeholder={"모임명을 입력해주세요"}
                onChangeText={(text) => onChangeInput(text, NAME_FIELD)}
                returnKeyType="next"
                autoCorrect={false}
                style={{
                  ...styles.keyboard,
                  paddingHorizontal: 10,
                }}
              ></TextInput>
            </View>
          </View>
          <View style={{ ...styles.optionContainer }}>
            <View style={{ ...styles.optionName }}>
              <Text>검색 태그</Text>
            </View>
            <View style={{ ...styles.optionContent }}>
              <TextInput
                value={state.tag}
                placeholder={"태그를 달아주세요(띄어쓰기 구분)"}
                onChangeText={(text) => onChangeInput(text, TAG_FIELD)}
                returnKeyType="next"
                autoCorrect={false}
                style={{
                  ...styles.keyboard,
                  paddingHorizontal: 10,
                }}
              ></TextInput>
            </View>
          </View>
          <View style={{ ...styles.description }}>
            <TextInput
              value={state.body}
              placeholder={"소개글을 입력해주세요."}
              onChangeText={(text) => onChangeInput(text, BODY_FIELD)}
              underlineColorAndroid="transparent"
              returnKeyType="none"
              style={{
                ...styles.keyboard,
                paddingHorizontal: 10,
              }}
              autoCorrect={false}
              scrollEnabled={false}
              autoFocus={false}
              multiline={true}
            ></TextInput>
          </View>

          <EmptySpace></EmptySpace>
          <EmptySpace></EmptySpace>
          <Text>{message}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
      <NextButton setMessage={setMessage}></NextButton>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
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
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.23,
    overflow: "hidden",
  },
  newImage: {
    justifyContent: "center",
    alignItems: "center",
    width: undefined,
    height: "100%",
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 300,
  },
  keyboard: {
    height: "100%",
    width: "75%",
    paddingHorizontal: 0,
  },
  category: {
    alignSelf: "flex-start",
    marginLeft: 30,
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
  description: {
    marginTop: 20,
    height: 250,
    width: "90%",
    borderRadius: 8,
    borderWidth: 1,
  },
});
