import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  StatusBar,
} from "react-native";
import { ThemeContext } from "styled-components";
import Loader from "../../../components/common/Loader";
import CustomHeader from "../../../components/common/CustomHeader";
import styled from "styled-components/native";
import SmallUserCard from "../../../components/User/SmallUserCard";
import { simplifiedFormat } from "../../../utils/DateFormat";

import SlideImageModal from "../../../components/common/SlideImageModal";
import Collapsible from "react-native-collapsible";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { getFileName } from "../../../utils/String";
import { downloadFile } from "../../../utils/FileSystem";
import { useNavigation } from "@react-navigation/native";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const SubContainer = styled.View`
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.darkGreenColor};
  height: ${(HEIGHT * 8) / 100}px;
  border-width: 1px;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
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
  StatusBar.setHidden(false, "fade");

  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [modalVisible, setModalVisible] = useState(true);
  const [imgViewerState, setImgViewerState] = useState({
    visible: false,
    index: 0,
  });
  let imageIndex = 0;

  const changeViewerState = (idx = 0) => {
    console.log("Change", idx);
    setImgViewerState((prev) => {
      return { visible: !prev.visible, index: idx };
    });
  };

  const images = [
    {
      uri: "https://reactnative.dev/img/tiny_logo.png",

      // Simplest usage.

      // width: number
      // height: number
      // Optional, if you know the image size, you can set the optimization performance

      // You can pass props to <Image />.
      props: {
        // headers: ...
      },
    },
    {
      // Simplest usage.
      uri: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",

      // width: number
      // height: number
      // Optional, if you know the image size, you can set the optimization performance

      // You can pass props to <Image />.
      props: {
        // headers: ...
      },
    },
  ];

  const [data, setData] = useState({
    noticeTitle: "",
    noticeMemo: "",
    author: {},
    createdAt: "",
    files: [],
    images: [],
    isMandatory: false,
    loading: true,
  });

  const getData = async () => {
    setData({
      loading: false,
      ...noticeData,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return data?.loading ? (
    <Loader></Loader>
  ) : (
    <>
      <CustomHeader
        title={"공지글 보기"}
        rightButton={
          <Text onPress={() => setModalVisible((prev) => !prev)}>완료</Text>
        }
      ></CustomHeader>

      <ScrollView
        style={{
          backgroundColor: themeContext.backgroundColor,
          paddingTop: "13%",
        }}
        showsVerticalScrollIndicator={false}
      >
        <SubContainer>
          <NanumText style={{ fontFamily: themeContext.boldFont }}>
            {data.noticeTitle}
          </NanumText>
        </SubContainer>
        <SubContainer style={{ justifyContent: "space-between" }}>
          <SmallUserCard
            name={data.author.name}
            avatar={data.author.avatar}
            style={{ borderWidth: 1, height: (HEIGHT * 8) / 100 }}
          ></SmallUserCard>
          <NanumText>{simplifiedFormat(data.createdAt)}</NanumText>
        </SubContainer>
        <BodyContainer>
          <NanumText style={{ lineHeight: 25 }}>{data.noticeMemo}</NanumText>
        </BodyContainer>
        <ImgContainer>
          <ScrollView horizontal={true}>
            {images.map((image, idx) => (
              <TouchableOpacity
                key={`img-view-${idx}`}
                onPress={() => {
                  navigation.navigate("SlideImageModal", {
                    idx,
                    images,
                    from: "ReadNotice",
                  });
                }}
              >
                <Image
                  source={image}
                  style={{
                    width: undefined,
                    height: "100%",
                    borderWidth: 1,
                    aspectRatio: 1,
                    zIndex: 1,
                  }}
                ></Image>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
          <Collapsible collapsed={isCollapsed}>
            {data.files
              ? data.files.map((file, idx) => {
                  return (
                    <TouchableOpacity
                      key={`downloadable-file-${idx}`}
                      onPress={() => downloadFile(file)}
                    >
                      <SubContainer style={{ justifyContent: "space-between" }}>
                        <NanumText>{getFileName(file)}</NanumText>
                        <AntDesign
                          name={"paperclip"}
                          size={25}
                          color={themeContext.lightGreyColor}
                          style={{ paddingHorizontal: 15 }}
                        ></AntDesign>
                      </SubContainer>
                    </TouchableOpacity>
                  );
                })
              : null}
          </Collapsible>
        </FileContainer>
        <EmptySpace></EmptySpace>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
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
