import React, { useEffect, useState, useContext, useMemo, useRef } from "react";
import { View, Text, Dimensions, ScrollView, StyleSheet } from "react-native";
import CustomHeader from "../../../components/common/CustomHeader";
import Loader from "../../../components/common/Loader";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import SearchInput from "../../../components/common/SearchInput";
import SmallUserCard from "../../../components/User/SmallUserCard";
import { CheckBox } from "react-native-elements";
import {
  UnderHeader,
  HeaderHeight,
  StatusHeight,
} from "../../../utils/HeaderHeight";
import { useNavigation, useRoute } from "@react-navigation/native";

/**
 *
 * This code is wrapped and bootstrapped from VoteMemberList
 * Therefore it needs to be refactored.
 * /Users/a/ExpoProjects/forest-in/forest-app/screens/Group/GroupVote/VoteMemberList.js
 */

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

const MemberClassify = ({ title, members, type, keyword }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <View>
      <RowContainer style={{}}>
        <MemberType>{title}</MemberType>
      </RowContainer>
      {members
        .filter((member) => member.type === type)
        .map((member) => {
          if (keyword != "" && !member.name.includes(keyword)) return null;
          return (
            <RowContainer key={"member-" + type + member.id}>
              <SmallUserCard
                name={member.name}
                major={member.institution.major}
                institution={member.institution}
                avatar={member.avatar}
                admissionYear={member.admissionYear}
              ></SmallUserCard>
            </RowContainer>
          );
        })}
    </View>
  );
};

export default ({}) => {
  const [data, setData] = useState({
    loading: true,
    members: [],
  });
  const themeContext = useContext(ThemeContext);
  // keyword for search textInput
  const [keyword, setKeyword] = useState("");
  const [checkState, setCheckState] = useState({});
  const [memberList, setMemberList] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

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

  const changeChecked = (id) => {
    let newChecked = { ...checkState };
    newChecked[id] = !newChecked[id];
    if (newChecked[id] && !memberList.includes(id))
      setMemberList([...memberList, id]);
    else if (!newChecked[id] && memberList.includes(id))
      setMemberList(memberList.filter((memberId) => memberId != id));

    setCheckState(newChecked);
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
    <>
      <CustomHeader
        title={"멤버 목록"}
        headerStyle={{}}
        rightButtonEnabled={false}
        rightButton={
          <Text
            onPress={() =>
              navigation.navigate(route.params.from, { memberList: memberList })
            }
          >
            완료
          </Text>
        }
      ></CustomHeader>

      <ScrollView
        style={{
          backgroundColor: themeContext.backgroundColor,
          top: HeaderHeight,
        }}
        showsVerticalScrollIndicator={false}
      >
        <SearchInput
          placeholder={"이름 검색"}
          value={keyword}
          onChange={onChange}
          onSubmit={onSubmit}
          returnKeyType="search"
          style={styles.keyboard}
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
              setMemberList={setMemberList}
              memberList={memberList}
              changeChecked={changeChecked}
            ></MemberClassify>
            <MemberClassify
              title="운영진"
              members={data.members}
              type={1}
              checkState={checkState}
              setCheckState={setCheckState}
              keyword={keyword}
              setMemberList={setMemberList}
              memberList={memberList}
              changeChecked={changeChecked}
            ></MemberClassify>
            <MemberClassify
              title="멤버"
              members={data.members}
              type={2}
              checkState={checkState}
              setCheckState={setCheckState}
              keyword={keyword}
              setMemberList={setMemberList}
              memberList={memberList}
              changeChecked={changeChecked}
            ></MemberClassify>
          </>
        ) : null}
        <EmptySpace></EmptySpace>
        <EmptySpace></EmptySpace>
        <EmptySpace></EmptySpace>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  keyboard: { marginTop: 20 },
});

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
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "소프트웨어대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
  {
    name: "이진우",
    id: "2",
    avatar: avatarUrl,
    type: 1,
    major: "소프트웨어학과",
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "소프트웨어대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
  {
    name: "상미이",
    id: "3",
    avatar: avatarUrl,
    type: 1,
    major: "소프트웨어학과",
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "소프트웨어대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
  {
    name: "김자운",
    id: "4",
    avatar: avatarUrl,
    type: 2,
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "소프트웨어대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },

  {
    name: "이지훈",
    id: "6",
    avatar: avatarUrl,
    type: 2,
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "문과대",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
  {
    name: "장안구",
    id: "7",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 2,
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "원주캠퍼스",
      major: "소프트웨어학과",
    },
    admissionYear: "2019",
  },
  {
    name: "장안구",
    id: "8",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "인문대학",
      major: "소프트웨어학괴",
    },
    admissionYear: "2019",
  },
  {
    name: "장안구",
    id: "9",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "인문대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
  {
    name: "장안구",
    id: "10",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 2,
    major: "소프트웨어학과",
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "인문대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
  {
    name: "장안구",
    id: "11",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "인문대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
  {
    name: "장안구",
    id: "12",
    avatar: "",
    type: 2,
    major: "소프트웨어학과",
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "인문대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
  {
    name: "장안구",
    id: "13",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 2,
    major: "소프트웨어학과",
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "인문대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
  {
    name: "장안구",
    id: "14",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "인문대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
];
