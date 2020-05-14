import React, { useEffect, useState, useContext, useMemo, useRef } from "react";
import { View, Text, Dimensions } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CustomHeader from "../../components/CustomHeader";
import Loader from "../../components/Loader";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import SearchInput from "../../components/SearchInput";
import SmallUserCard from "../../components/User/SmallUserCard";
import { CheckBox } from "react-native-elements";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const avatarUrl =
  "https://images.unsplash.com/photo-1588869715773-c6641407939b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=80";

const Divider = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: #e9ecef;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${(WIDTH * 20) / 100}px;
  padding: 0px 0px 0px 20px;
  border-style: solid;
  border-bottom-color: ${(props) => props.theme.moreLightGreyColor};
  border-bottom-width: 1px;
`;

const MemberType = styled.Text`
  font-weight: 500;
  font-size: 18px;
  padding: 10px;
  font-family: ${(props) => props.theme.regularFont};
`;

const TotalButton = styled.TouchableOpacity`
  margin-right: 10px;
  background-color: ${(props) => props.theme.lightGreenColor};
  padding: 7px 10px 7px 10px;
`;

const TotalButtonText = styled.Text`
  font-weight: 500;
  font-size: 12px;
  font-family: ${(props) => props.theme.regularFont};
`;

const EmptySpace = styled.View`
  height: ${(HEIGHT * 3) / 100}px;
`;

const MemberClassify = ({
  title,
  members,
  type,
  checkState,
  setCheckState,
  keyword,
}) => {
  console.log("Rendering2");
  const themeContext = useContext(ThemeContext);

  const changeChecked = (id) => {
    let newChecked = { ...checkState };
    newChecked[id] = !newChecked[id];
    setCheckState(newChecked);
  };

  const changeAllChecked = () => {
    let newChecked = { ...checkState };
    members
      .filter((member) => member.type === type)
      .forEach((member) => {
        newChecked[member.id] = !newChecked[member.id];
      });
    setCheckState(newChecked);
  };

  return (
    <View>
      <RowContainer style={{ marginVertical: 10 }}>
        <MemberType>{title}</MemberType>
        <TotalButton onPress={changeAllChecked}>
          <TotalButtonText>전체 선택</TotalButtonText>
        </TotalButton>
      </RowContainer>
      {members
        .filter((member) => member.type === type)
        .map((member) => {
          if (keyword != "" && !member.name.includes(keyword)) return null;
          return (
            <RowContainer key={"member-" + type + member.id}>
              <SmallUserCard
                name={member.name}
                major={member.major}
                avatar={member.avatar}
              ></SmallUserCard>
              <CheckBox
                right={true}
                iconRight={true}
                checkedColor={themeContext.lightGreenColor}
                checkedIcon="check-circle"
                uncheckedIcon="check-circle"
                checked={checkState[member.id]}
                onPress={() => changeChecked(member.id)}
              />
            </RowContainer>
          );
        })}
    </View>
  );
};

export default ({}) => {
  console.log("Rendering1");
  const [data, setData] = useState({
    loading: true,
    members: [],
  });
  const themeContext = useContext(ThemeContext);
  // keyword for search textInput
  const [keyword, setKeyword] = useState("");
  const [checkState, setCheckState] = useState({});
  const [memberList, setMemberList] = useState([]);

  const onSubmit = () => {
    if (keyword === "") return;
    setKeyword("");
  };
  const onChange = (text) => setKeyword(text);

  const getData = async () => {
    setData({
      loading: false,
      members: membersData,
    });
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const newDict = {};
    data.members.forEach((member) => {
      newDict[member.id] = false;
    });
    setCheckState(newDict);
  }, [data.loading]);

  return data.loading ? (
    <Loader></Loader>
  ) : (
    <ScrollView
      style={{
        backgroundColor: themeContext.backgroundColor,
        fontFamily: themeContext.regularFont,
      }}
      showsVerticalScrollIndicator={false}
    >
      <CustomHeader
        title={"투표할 대상 선택"}
        headerStyle={{
          borderBottomWidth: 1,
          borderBottomColor: themeContext.moreLightGreyColor,
        }}
      ></CustomHeader>
      <EmptySpace></EmptySpace>
      <SearchInput
        placeholder={"이름 검색"}
        value={keyword}
        onChange={onChange}
        onSubmit={onSubmit}
        returnKeyType="search"
      ></SearchInput>
      {Object.keys(checkState).length !== 0 ? (
        <>
          <MemberClassify
            title="회장"
            members={data.members}
            type={0}
            checkState={checkState}
            setCheckState={setCheckState}
            keyword={keyword}
          ></MemberClassify>
          <MemberClassify
            title="운영진"
            members={data.members}
            type={1}
            checkState={checkState}
            setCheckState={setCheckState}
            keyword={keyword}
          ></MemberClassify>
          <MemberClassify
            title="멤버"
            members={data.members}
            type={2}
            checkState={checkState}
            setCheckState={setCheckState}
            keyword={keyword}
          ></MemberClassify>
        </>
      ) : null}
    </ScrollView>
  );
};

MemberClassify.propTypes = {
  title: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.number.isRequired,
  checkState: PropTypes.object.isRequired,
  setCheckState: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
};

const membersData = [
  {
    name: "김영모",
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 0,
    major: "소프트웨어학과",
  },
  {
    name: "이진우",
    id: "2",
    avatar: avatarUrl,
    type: 1,
    major: "소프트웨어학과",
  },
  {
    name: "상미이",
    id: "3",
    avatar: avatarUrl,
    type: 1,
    major: "소프트웨어학과",
  },
  {
    name: "김자운",
    id: "4",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
  },
  {
    name: "장안구",
    id: "5",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
  },
  { name: "이지훈", id: "6", avatar: avatarUrl, type: 2, major: "장어학과" },
  {
    name: "장안구",
    id: "7",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 2,
    major: "소프트웨어학과",
  },
  {
    name: "장안구",
    id: "8",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
  },
  {
    name: "장안구",
    id: "9",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
  },
  {
    name: "장안구",
    id: "10",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 2,
    major: "소프트웨어학과",
  },
  {
    name: "장안구",
    id: "11",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
  },
  { name: "장안구", id: "12", avatar: "", type: 2, major: "소프트웨어학과" },
  {
    name: "장안구",
    id: "13",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 2,
    major: "소프트웨어학과",
  },
  {
    name: "장안구",
    id: "14",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
  },
];
