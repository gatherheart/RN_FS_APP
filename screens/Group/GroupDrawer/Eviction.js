import React, { useEffect, useState, useContext, useMemo, useRef } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
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
import UsersTable from "../../../components/User/HorizontalUsersTable";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AlertModal from "../../../components/common/AlertModal";

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
  height: ${(HEIGHT * 8.5) / 100}px;
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
  setMemberList,
  changeChecked,
}) => {
  const themeContext = useContext(ThemeContext);

  const changeAllChecked = () => {
    let newChecked = { ...checkState };
    const newMembers = members.map((member) => {
      if (member.type === type) {
        newChecked[member.id] = !newChecked[member.id];
        return newChecked[member.id] ? member.id : null;
      } else {
        return newChecked[member.id] ? member.id : null;
      }
    });

    setCheckState(newChecked);
    setMemberList(newMembers);
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
  const [data, setData] = useState({
    loading: true,
    members: [],
  });
  const themeContext = useContext(ThemeContext);
  // keyword for search textInput
  const [keyword, setKeyword] = useState("");
  const [checkState, setCheckState] = useState({});
  // Selected Member List
  const [memberList, setMemberList] = useState([]);
  const [modalVisible, setModalVisible] = useState({
    visible: false,
    message: "",
    targets: [],
  });
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
        title={"내보내기"}
        headerStyle={{}}
        rightButton={
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => {
              const _selected = data.members.filter((member) =>
                memberList.includes(member.id)
              );
              setModalVisible({
                visible: true,
                targets: _selected,
                message: `${_selected
                  .map((t) => t.name)
                  .join()}을(를) 내보내시겠습니까?`,
              });
            }}
          >
            <Text>완료</Text>
          </TouchableOpacity>
        }
      ></CustomHeader>
      <AlertModal
        modalVisible={!!modalVisible.visible}
        setModalVisible={setModalVisible}
        body={modalVisible.message}
        cancleEnabled
        callback={() => {
          console.log("A", modalVisible.targets);
        }}
      ></AlertModal>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          backgroundColor: "white",
          top: HeaderHeight,
          zIndex: 1,
          height: memberList.some((member) => member != null)
            ? (HEIGHT * 12.5) / 100
            : 0,
        }}
        contentContainerStyle={{
          borderWidth: 1,
          borderColor: "red",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <UsersTable
          users={data.members}
          usersId={memberList}
          setUsers={setMemberList}
          changeChecked={changeChecked}
        ></UsersTable>
      </ScrollView>
      <ScrollView
        style={{
          backgroundColor: themeContext.backgroundColor,
          paddingTop: HeaderHeight * 2,
        }}
        showsVerticalScrollIndicator={false}
      >
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
        <EmptySpace></EmptySpace>
      </ScrollView>
    </>
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
