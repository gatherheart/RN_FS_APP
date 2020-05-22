import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { ThemeContext } from "styled-components";
import Loader from "../../../components/Loader";
import CustomHeader from "../../../components/CustomHeader";
import styled from "styled-components/native";
import SmallUserCard from "../../../components/User/SmallUserCard";
import { simplifiedFormat } from "../../../utils/DateFormat";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

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

const NanumText = styled.Text`
  font-family: ${(props) => props.theme.regularFont};
`;

export default () => {
  const themeContext = useContext(ThemeContext);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [modalVisible, setModalVisible] = useState(true);
  const [imgViewerVisible, setImgViewerVisible] = useState(false);

  const changeViewerState = () => {
    setImgViewerVisible((prev) => !prev);
  };

  const images = [
    {
      // Simplest usage.
      url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",

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
      url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",

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
        rightButton={() => setModalVisible((prev) => !prev)}
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
          <Modal visible={imgViewerVisible} transparent={true}>
            <ImageViewer imageUrls={images} onSwipeDown={changeViewerState} />
          </Modal>
          {images.map((image, idx) => (
            <Image
              source={image}
              style={{
                width: undefined,
                height: "100%",
                borderWidth: 1,
                aspectRatio: 1,
              }}
              key={`img-view-${idx}`}
            ></Image>
          ))}
        </ImgContainer>
      </ScrollView>
    </>
  );
};

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
