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
import CustomHeader from "../../../components/CustomHeader";
import { simplifiedFormat } from "../../../utils/DateFormat";
import SmallUserCard from "../../../components/User/SmallUserCard";
import Collapsible from "react-native-collapsible";
import PropTypes from "prop-types";
import Loader from "../../../components/Loader";
import CustumIcon from "../../../components/CustomIcon";
import UsersTable from "../../../components/User/UsersTable";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const NanumText = styled.Text`
  font-family: ${(props) => props.theme.regularFont};
`;

const SubContainer = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: ${(HEIGHT * 8.5) / 100}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 5px 0px 10px;
`;
const Container = styled.View`
  border-width: 2px;
  border-color: blue;
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

const BarText = styled.Text`
  color: ${(props) => props.theme.blackColor};
  font-family: ${(props) => props.theme.regularFont};
`;
const CHART_WIDTH = new Animated.Value(0);

const RatioBar = ({ percent, textInBar, textOutBar }) => {
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    Animated.timing(CHART_WIDTH, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <BarContainer>
      <BarStartContainer>
        <Animated.View
          style={{
            height: (HEIGHT * 5) / 100,
            opacity: 0.7,
            width: 1,
            backgroundColor: themeContext.darkGreenColor,
            transform: [
              {
                translateX: CHART_WIDTH.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, (WIDTH * 90 * percent) / 200],
                }),
              },
              {
                scaleX: CHART_WIDTH.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, (WIDTH * 90 * percent) / 100],
                }),
              },
            ],
          }}
        ></Animated.View>
        <BarText style={{ marginHorizontal: 10 }}>{textInBar}</BarText>
      </BarStartContainer>
      <BarEndContainer>
        <BarText>{textOutBar}</BarText>
      </BarEndContainer>
    </BarContainer>
  );
};

RatioBar.propTypes = {
  percent: PropTypes.number.isRequired,
  textInBar: PropTypes.string,
  textOutBar: PropTypes.string,
};

export default () => {
  const themeContext = useContext(ThemeContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [data, setData] = useState({
    loading: true,
    voteTitle: "",
    voteMemo: "",
    voteList: [],
    deadline: "",
    multipleOption: false,
    anonymousOption: false,
    closed: false,
    voteMemberList: [],
    createdAt: "",
    author: {},
  });
  const [voteResult, setVoteResult] = useState({
    result: {},
    participants: 0,
    nonParticipants: 0,
    classified: false,
  });

  const getData = async () => {
    setData({
      loading: false,
      ...voteData,
    });
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (data.loading) return;
    let newDict = {};
    let participants = [];
    let nonParticipants = [];
    data.voteList.map((vote, idx) => {
      newDict[vote] = data.voteMemberList.filter((member) => {
        const ret = member.vote.some((value) => value === idx);
        if (ret && idx === 0) nonParticipants.push(member);
        else if (ret) participants.push(member);
      });
    });
    setVoteResult({
      result: newDict,
      participants,
      nonParticipants,
      classified: true,
    });
  }, [data.loading]);

  return data?.loading || !voteResult?.classified ? (
    <Loader></Loader>
  ) : (
    <>
      <CustomHeader title={"투표글 보기"}></CustomHeader>

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
          <NanumText>{data.voteTitle}</NanumText>
          <Text>~{simplifiedFormat(data.deadline)}</Text>
        </SubContainer>
        <SubContainer>
          <SmallUserCard
            name={data.author.name}
            major={data.author.major}
            avatar={data.author.avatar}
            style={{ borderWidth: 1 }}
          ></SmallUserCard>
          <Text>{simplifiedFormat(data.createdAt)}</Text>
        </SubContainer>
        <Container style={styles.memoContainer}>
          <Text>{data.voteMemo}</Text>
        </Container>

        <Container>
          <SubContainer style={{ justifyContent: "flex-start" }}>
            <NanumText>투표 결과 </NanumText>
            <NanumText style={{ marginHorizontal: 10 }}>
              {voteResult.participants.length}명 참여
            </NanumText>
          </SubContainer>
          {data.voteList.map((vote, idx) => {
            if (idx === 0) return null;
            return (
              <RatioBar
                key={`vote-${vote}-${idx}`}
                textInBar={vote}
                textOutBar={`${voteResult.result[vote].length}명`}
                percent={
                  voteResult.result[vote].length /
                  voteResult.participants.length
                }
              ></RatioBar>
            );
          })}
        </Container>
        <SubContainer style={{ justifyContent: "center" }}>
          <TouchableOpacity>
            <BarContainer
              style={{
                ...styles.reVoteContainer,
                backgroundColor: themeContext.darkGreenColor,
              }}
            >
              <Text>재투표하기</Text>
            </BarContainer>
          </TouchableOpacity>
        </SubContainer>
        <Container>
          <SubContainer>
            <TouchableOpacity
              onPress={() => setIsCollapsed((prev) => !prev)}
              style={styles.collapsibleButton}
            >
              <View style={styles.collapsibleContainer}>
                <NanumText>
                  {data.anonymousOption ? "익명 투표" : "실명 투표"}
                </NanumText>
                <NanumText style={{ color: themeContext.greenColor }}>
                  총 {data.voteMemberList.length}명
                </NanumText>
              </View>
              <CustumIcon
                name={"arrow-down"}
                size={26}
                color={themeContext.darkGreenColor}
              ></CustumIcon>
            </TouchableOpacity>
          </SubContainer>
          <Collapsible collapsed={isCollapsed}>
            {!data.anonymousOption ? (
              <View
                style={{
                  justifyContent: "flex-start",
                  borderWidth: 1,
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
                    {voteResult.participants.length}명
                  </NanumText>
                </View>

                <View style={{ alignItems: "center" }}>
                  <UsersTable users={voteResult.participants}></UsersTable>
                </View>

                <View
                  style={{
                    ...styles.memberTableLabel,
                    backgroundColor: themeContext.pastelGreenColor,
                  }}
                >
                  <NanumText>미참여 멤버</NanumText>
                  <NanumText
                    style={{
                      ...styles.memberTableText,
                      color: themeContext.greenColor,
                    }}
                  >
                    {voteResult.nonParticipants.length}명
                  </NanumText>
                </View>
              </View>
            ) : null}
          </Collapsible>
        </Container>
        <EmptySpace></EmptySpace>
        <EmptySpace></EmptySpace>
        <EmptySpace></EmptySpace>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  memoContainer: {
    paddingVertical: 20,
  },
  reVoteContainer: {
    opacity: 0.7,
    justifyContent: "center",
  },
  collapsibleButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  collapsibleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
  },
  memberTableLabel: {
    paddingHorizontal: 20,
    flexDirection: "row",
    width: WIDTH,
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
    vote: [0],
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

const voteData = {
  voteTitle: "4월 회식 날짜",
  voteMemo: "4월 회식은 편의점 포차에서 진행할 예정입니다.",
  voteList: ["null", "4월 15일", "4월 20일", "4월 30일", "4월 31일"],
  deadline: "2020-05-14T09:43:54.107Z",
  multipleOption: false,
  anonymousOption: false,
  closed: false,
  voteMemberList: membersData,
  createdAt: "2020-12-12T15:43:54.107Z",
  author: {
    name: "장안구",
    id: "7",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 2,
    major: "소프트웨어학과",
  },
};
