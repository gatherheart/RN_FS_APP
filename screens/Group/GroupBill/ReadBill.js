import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import CustomHeader from "../../../components/common/CustomHeader";
import { simplifiedFormat } from "../../../utils/DateFormat";
import Collapsible from "react-native-collapsible";
import PropTypes from "prop-types";
import Loader from "../../../components/common/Loader";
import CustumIcon from "../../../components/common/CustomIcon";
import UsersTable from "../../../components/User/UsersTable";
import { useNavigation } from "@react-navigation/native";
import BillModal from "../../../components/Group/Bill/BillModal";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const NanumText = styled.Text`
  font-family: ${(props) => props.theme.regularFont};
`;
const SubContainer = styled.View`
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.darkGreenColor};
  width: 100%;
  height: ${(HEIGHT * 8.5) / 100}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 9px 0px 18px;
`;
const Container = styled.View`
  align-items: center;
`;

const EmptySpace = styled.View`
  height: ${(HEIGHT * 10) / 100}px;
`;

const BarContainer = styled.View`
  flex-direction: row;
  width: ${(WIDTH * 90) / 100}px;
  align-items: center;
  justify-content: space-between;
  border-color: ${(props) => props.theme.darkGreenColor};
  border-width: 1px;
  margin: 5px 0px 5px 0px;
  height: ${(HEIGHT * 5) / 100}px;
`;

const BarEndContainer = styled.View`
  margin: 0px 14px 0px 0px;
`;
const BarStartContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: ${(HEIGHT * 5) / 100}px;
  border-radius: 10px;
`;

const OptionContainer = styled.View`
  width: 100%;
  height: 60px;
`;
const Calculated = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.moreLightGreyColor};
`;

const BarText = styled.Text`
  color: ${(props) => props.theme.blackColor};
  font-family: ${(props) => props.theme.regularFont};
`;

export default () => {
  const themeContext = useContext(ThemeContext);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [modalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();
  const [data, setData] = useState({
    loading: true,
    billTitle: "",
    billId: "",
    billMemo: "",
    deadline: "",
    closed: false,
    memberList: [],
    createdAt: "",
    author: {},
    billAmount: 0,
    bank: "",
  });
  const [billResult, setbillResult] = useState({
    result: {},
    participants: 0,
    nonParticipants: 0,
    classified: false,
  });

  const getData = async () => {
    setData({
      loading: false,
      ...billData,
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
        title={"더치페이글 보기"}
        rightButton={() => setModalVisible((prev) => !prev)}
      ></CustomHeader>
      <BillModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        {...data}
      ></BillModal>
      <ScrollView
        style={{
          backgroundColor: themeContext.backgroundColor,
          paddingTop: "15%",
        }}
        contentContainerStyle={{
          fontFamily: themeContext.regularFont,
        }}
        showsVerticalScrollIndicator={false}
      >
        <SubContainer>
          <NanumText>{data.billTitle}</NanumText>
          <Text>~{simplifiedFormat(data.deadline)}</Text>
        </SubContainer>
        <SubContainer style={{ borderWidth: 0 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            총 {data.billAmount.toLocaleString()}원
          </Text>
        </SubContainer>
        <OptionContainer>
          <Calculated
            style={{
              backgroundColor: themeContext.moreLightGreyColor,
            }}
          >
            <NanumText
              style={{ color: themeContext.greenColor, marginRight: 35 }}
            >
              1 인당
            </NanumText>
            <NanumText>
              {Math.ceil(
                data.billAmount / data.memberList.length
              ).toLocaleString()}
              원
            </NanumText>
          </Calculated>
        </OptionContainer>
        <SubContainer>
          <NanumText>{data.accountOwner}</NanumText>
          <NanumText>{data.account}</NanumText>
        </SubContainer>
        <Container
          style={{
            ...styles.memoContainer,
            borderColor: themeContext.darkGreenColor,
            alignItems: "flex-start",
          }}
        >
          <View style={{ marginLeft: 20 }}>
            <NanumText
              style={{ color: themeContext.greenColor, marginBottom: 20 }}
            >
              메모
            </NanumText>
            <NanumText>{data.billMemo}</NanumText>
          </View>
        </Container>

        <Container>
          <SubContainer>
            <TouchableOpacity
              onPress={() => setIsCollapsed((prev) => !prev)}
              style={styles.collapsibleButton}
            >
              <View style={styles.collapsibleContainer}>
                <NanumText style={{ color: themeContext.greenColor }}>
                  총 {data.memberList.length}명
                </NanumText>

                <CustumIcon
                  name={"arrow-down"}
                  size={26}
                  color={themeContext.darkGreenColor}
                ></CustumIcon>
              </View>
            </TouchableOpacity>
          </SubContainer>
          <Collapsible collapsed={isCollapsed}>
            {!data.anonymousOption ? (
              <View
                style={{
                  justifyContent: "flex-start",
                  width: WIDTH,
                }}
              >
                <View
                  style={{
                    ...styles.memberTableLabel,
                    backgroundColor: themeContext.pastelGreenColor,
                  }}
                >
                  <NanumText>참여 멤버</NanumText>
                  <NanumText
                    style={{
                      ...styles.memberTableText,
                      color: themeContext.greenColor,
                      fontFamily: themeContext.regularFont,
                    }}
                  >
                    {data.memberList.length}명
                  </NanumText>
                </View>
                <View style={{ alignItems: "center", borderWidth: 1 }}>
                  <UsersTable users={data.memberList}></UsersTable>
                </View>
                <View style={{ marginRight: 40 }}>
                  <TouchableOpacity
                    style={{ width: "100%", alignItems: "flex-end" }}
                    onPress={() =>
                      navigation.navigate("BillMemberList", { id: data.billId })
                    }
                  >
                    <Text>전체 보기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </Collapsible>
        </Container>
        <EmptySpace></EmptySpace>
        <EmptySpace></EmptySpace>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  memoContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
  },
  reVoteContainer: {
    opacity: 0.7,
    justifyContent: "center",
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
  memberTableLabel: {
    paddingHorizontal: 20,
    flexDirection: "row",
    width: WIDTH,
    height: (HEIGHT * 5) / 100,
    alignItems: "center",
  },
  memberTableText: {
    marginHorizontal: 20,
  },
});

const avatarUrl =
  "https://images.unsplash.com/photo-1588869715773-c6641407939b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=80";

const membersData = [
  {
    name: "김영모",
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 0,
    major: "소프트웨어학과",
    vote: [1],
  },
  {
    name: "이진우",
    id: "2",
    avatar: avatarUrl,
    type: 1,
    major: "소프트웨어학과",
    vote: [3],
  },
  {
    name: "상미이",
    id: "3",
    avatar: avatarUrl,
    type: 1,
    major: "소프트웨어학과",
    vote: [4],
  },
  {
    name: "김자운",
    id: "4",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
    vote: [0],
  },
  {
    name: "장안구",
    id: "5",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
    vote: [2],
  },
  {
    name: "이지훈",
    id: "6",
    avatar: avatarUrl,
    type: 2,
    major: "장어학과",
    vote: [0],
  },
  {
    name: "장안구",
    id: "7",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 2,
    major: "소프트웨어학과",
    vote: [0],
  },
  {
    name: "장안구",
    id: "8",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
    vote: [2],
  },
  {
    name: "장안구",
    id: "9",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
    vote: [0],
  },
  {
    name: "장안구",
    id: "10",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 2,
    major: "소프트웨어학과",
    vote: [0],
  },
  {
    name: "장안구",
    id: "11",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
    vote: [3],
  },
  {
    name: "장안구",
    id: "12",
    avatar: "",
    type: 2,
    major: "소프트웨어학과",
    vote: [2],
  },
  {
    name: "장안구",
    id: "13",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 2,
    major: "소프트웨어학과",
    vote: [2],
  },
  {
    name: "장안구",
    id: "14",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
    vote: [1],
  },
];

const billData = {
  id: "123",
  billTitle: "4월 개강 총회 회비",
  billMemo: "회식비에 사용",
  deadline: "2020-05-14T09:43:54.107Z",
  billAmount: 100000,
  account: "110384479842",
  accountOwner: "김현우",
  kakaoUri: "https://qr.kakaopay.com/281006011000001135744526",
  tossUri:
    "supertoss://send?bank=신한&accountNo=110384479842&origin=linkgen&amount=1000&msg=%EC%9E%85%EA%B8%88+%EB%B2%84%ED%8A%BC",
  bank: "신한",
  closed: false,
  memberList: membersData,
  createdAt: "2020-12-12T15:43:54.107Z",
  author: {
    name: "장안구",
    id: "7",
    type: 2,
  },
};
