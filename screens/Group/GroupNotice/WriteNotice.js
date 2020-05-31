import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useReducer,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
} from "react-native";
import { ThemeContext } from "styled-components";
import Loader from "../../../components/common/Loader";
import CustomHeader from "../../../components/common/CustomHeader";
import styled from "styled-components/native";
import SmallUserCard from "../../../components/User/SmallUserCard";
import { simplifiedFormat } from "../../../utils/DateFormat";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const MANDATORY_FIELD = "isMandatory";
const TITLE_FIELD = "title";
const BODY_FIELD = "body";

const SubContainer = styled.View`
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.darkGreenColor};
  height: ${(HEIGHT * 8) / 100}px;
  border-width: 1px;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
`;
const OptionContainer = styled.View`
  width: 100%;
  height: 60px;
  padding-left: 10px;

  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.lightGreyColor};
`;

const BodyContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.darkGreenColor};
  padding-vertical: 45px;
  padding-horizontal: 25px;
`;

const ImgContainer = styled.View`
  flex-direction: row;
  height: ${(HEIGHT * 10) / 100}px;
  width: 100%;
  border-width: 1px;
`;
const EmptySpace = styled.View`
  height: ${(HEIGHT * 10) / 100}px;
`;
const FileContainer = styled.View``;

const NanumText = styled.Text`
  font-family: ${(props) => props.theme.regularFont};
`;

export default () => {
  const themeContext = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(true);
  const initialState = { title: "", body: "", isMandatory: false };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const onChangeInput = (text, _type) => {
    dispatch({ type: _type, payload: text });
  };
  function reducer(state, action) {
    switch (action.type) {
      case TITLE_FIELD:
        return { ...state, title: action.payload };
      case BODY_FIELD:
        return { ...state, body: action.payload };
      case MANDATORY_FIELD:
        return { ...state, isMandatory: !isMandatory };
      default:
        return { ...state };
    }
  }

  useEffect(() => {
    console.log(state.body);
  }, [state.body]);

  return (
    <>
      <CustomHeader
        title={"공지글 작성"}
        rightButton={() => setModalVisible((prev) => !prev)}
        rightButtonText={"완료"}
      ></CustomHeader>

      <ScrollView
        style={{
          backgroundColor: themeContext.backgroundColor,
          paddingTop: "13%",
        }}
        showsVerticalScrollIndicator={false}
      >
        <SubContainer style={{ justifyContent: "space-between" }}>
          <NanumText
            style={{ fontFamily: themeContext.regularFont, paddingLeft: 10 }}
          >
            필독 설정
          </NanumText>
          <CheckBox
            right={true}
            iconRight={true}
            checkedColor={themeContext.lightGreenColor}
            checkedIcon="check-circle"
            uncheckedIcon="check-circle"
            checked={true}
            onPress={() => {}}
          />
        </SubContainer>
        <OptionContainer>
          <TextInput
            value={state.title}
            placeholder={"공지 제목"}
            onChangeText={(text) => onChangeInput(text, TITLE_FIELD)}
            returnKeyType="next"
            style={{
              ...styles.keyboard,
              fontFamily: themeContext.regularFont,
            }}
          ></TextInput>
        </OptionContainer>
        <BodyContainer>
          <TextInput
            value={state.body}
            placeholder={"내용"}
            onChangeText={(text) => onChangeInput(text, BODY_FIELD)}
            underlineColorAndroid="transparent"
            returnKeyType="none"
            style={{
              paddingVertical: 0,
              paddingHorizontal: 10,
              lineHeight: 25,
            }}
            autoCorrect={false}
            scrollEnabled={false}
            autoFocus={false}
            multiline={true}
          ></TextInput>
        </BodyContainer>
        <ImgContainer>
          <ScrollView horizontal={true}></ScrollView>
        </ImgContainer>
        <FileContainer>
          <SubContainer>
            <TouchableOpacity
              onPress={() => setIsCollapsed((prev) => !prev)}
              style={styles.collapsibleButton}
            >
              <View style={styles.collapsibleContainer}>
                <NanumText style={{ color: themeContext.greenColor }}>
                  파일
                </NanumText>
                {isCollapsed ? (
                  <Ionicons
                    name={"ios-arrow-down"}
                    size={26}
                    color={themeContext.darkGreenColor}
                    style={{ paddingHorizontal: 15 }}
                  ></Ionicons>
                ) : (
                  <Ionicons
                    name={"ios-arrow-up"}
                    size={26}
                    color={themeContext.darkGreenColor}
                    style={{ paddingHorizontal: 15 }}
                  ></Ionicons>
                )}
              </View>
            </TouchableOpacity>
          </SubContainer>
        </FileContainer>
        <EmptySpace></EmptySpace>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    height: "100%",
    paddingHorizontal: 10,
  },
  collapsibleButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  collapsibleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});

const noticeData = {
  noticeTitle: "중간고사로 인한 일정 변경",
  noticeMemo:
    "안녕하세요. 서기 박야옹입니다. 다름이 아니라 4월 초 회장단 회의 결과를 말씀드리고자 글을 올리게 되었습니다.\n\n이번 1학기 총학생회측에서 말씀드린 바와 같이 4월 중순으로 잡혀있던 중간고사 일정이 4월 말로 미뤄짐에 따라, 저희 중앙동아리 PIXEL의 4월달과 5월달의 일정을 중간고사 기간에 영향을 미치지 않도록 5월과 6월 초로 미루게 되었습니다. 일정은 현재 운영진과 함께 조율 중에 있어, 날짜가 확정되는대로 알려드리도록 하겠습니다.\n\n문의사항이나 다른 의견사항이 있으면 언제든 말씀해주세요.",
  author: {
    name: "장안구",
    id: "7",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    typeInGroup: 2,
    major: "소프트웨어학과",
  },
  createdAt: "2020-05-19T08:14:00.000Z",
  files: ["http://dicl.skku.edu/class/fall2019/pl/PL_Syllabus_2019_Fall.pdf"],
  images: ["https://unsplash.com/photos/zwUN_PalZdI"],
  isMandatory: true,
};
