import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  Button,
  Modal,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import CustomHeader from "../../../components/common/CustomHeader";
import DateTimePicker from "../../../components/common/DateTimePicker";
import { timePickedConverter } from "../../../utils/DateFormat";
import { CheckBox } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomIcon from "../../../components/common/CustomIcon";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import AlertModal from "../../../components/common/AlertModal";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Container = styled.View`
  background-color: ${(props) => props.theme.backgroundColor};
  width: ${(WIDTH * 95) / 100}px;
`;

const OptionContainer = styled.View`
  width: 100%;
  height: 60px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.lightGreyColor};
`;

const VoteListContainer = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.lightGreyColor};
  padding-vertical: 20px;
  padding-horizontal: 10px;
`;

const VoteListElement = styled.View`
  height: 60px;
  margin: 0px 0px 10px 0px;
  flex-direction: row;
  border-radius: 10px;
  background-color: ${(props) => props.theme.moreLightGreyColor};
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;

  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const IconTextContainer = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
  margin: 0px 0px 0px 10px;
`;

const TextContainer = styled.View``;

const EmptySpace = styled.View`
  height: ${HEIGHT / 2}px;
`;

const AlginedText = styled.Text`
  margin: 0px 0px 0px 10px;
  color: ${(props) => props.theme.lightGreyColor}
  font-family: ${(props) => props.theme.regularFont}
`;

const Title = styled.Text``;

const VoteList = ({
  idx,
  value,
  onChangeText,
  onSubmitEditing,
  spliceElem,
  style,
}) => {
  const themeContext = useContext(ThemeContext);
  console.log("Vote Render ", value);
  return (
    <VoteListElement style={styles.withShadow}>
      <TextInput
        value={value}
        placeholder={"선택지를 입력하세요"}
        onChangeText={(text) => onChangeText(text, idx)}
        onSubmitEditing={() => onSubmitEditing(idx)}
        returnKeyType="next"
        style={{
          height: "100%",
          width: "90%",
          paddingHorizontal: 15,
          ...style,
        }}
      ></TextInput>
      {idx >= 2 ? (
        <View
          style={{
            height: "100%",
            width: "10%",
          }}
        >
          <TouchableOpacity
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => spliceElem(idx)}
          >
            <CustomIcon
              name={"close"}
              size={25}
              color={themeContext.lightGreyColor}
            ></CustomIcon>
          </TouchableOpacity>
        </View>
      ) : null}
    </VoteListElement>
  );
};

export default ({ id }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [voteTitle, setVoteTitle] = useState("");
  const [voteMemo, setVoteMemo] = useState("");
  const [voteList, setVoteList] = useState(["", ""]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [deadline, setDeadline] = useState(null);
  const [multipleOption, setMultipleOption] = useState(false);
  const [anonymousOption, setAnonymousOption] = useState(false);
  const [memberList, setMemberList] = useState([]);
  const [message, setMessage] = useState("");
  const route = useRoute();

  useEffect(() => {
    setMemberList(route.params.memberList ? route.params.memberList : []);
  }, [route]);

  const navigation = useNavigation();
  const themeContext = useContext(ThemeContext);

  const submitVote = () => {
    if (voteList[0] === "" || voteList[1] === "") {
      setMessage("선택지를 채워주세요.");
    } else if (voteTitle === "") {
      setMessage("제목을 입력해주세요.");
    } else {
      setMessage("투표를 등록하였습니다.");
    }
    changeModal();
  };

  const onSubmitVoteTitle = () => {
    if (voteTitle === "") return;
  };
  const onSubmitVoteMemo = () => {
    if (voteMemo === "") return;
  };
  const onChangeVoteTitle = (text) => setVoteTitle(text);
  const onChangeVoteMemo = (text) => {
    setVoteMemo(text);
  };

  const onSubmitVoteList = (idx) => {
    if (voteList[idx] === "") return;
  };
  const onChangeVoteList = (text, idx) => {
    let newArr = [...voteList];
    newArr[idx] = text;
    setVoteList(newArr);
  };

  const addVoteList = () => {
    let newArr = [...voteList];
    newArr.push("");
    setVoteList(newArr);
  };

  const spliceElem = (idx) => {
    let newArr = [...voteList];
    newArr.splice(idx, 1);
    setVoteList(newArr);
  };

  const changeModal = () => {
    setModalVisible((prev) => !prev);
  };

  if (message === "투표를 등록하였습니다." && !modalVisible)
    navigation.goBack("GroupDrawer", { id: id });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "height" : "height"}
    >
      <CustomHeader
        title={"투표 작성"}
        headerStyle={{
          borderBottomWidth: 1,
          borderBottomColor: themeContext.moreLightGreyColor,
        }}
        rightButton={() => {
          submitVote();
        }}
      ></CustomHeader>
      <AlertModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={""}
        body={message}
      ></AlertModal>
      <ScrollView
        style={{
          backgroundColor: themeContext.backgroundColor,
          paddingTop: "15%",
        }}
        contentContainerStyle={{
          fontFamily: themeContext.regularFont,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <OptionContainer>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("VoteMemberList", {
                  from: "GroupWriteVote",
                })
              }
              style={{
                ...styles.voteTargetButton,
                borderColor: themeContext.moreLightGreyColor,
                borderBottomColor: "white",
              }}
            >
              {memberList.length === 0 ? (
                <AlginedText>투표할 대상 선택</AlginedText>
              ) : (
                <RowContainer
                  style={{ justifyContent: "flex-start", marginHorizontal: 20 }}
                >
                  <CustomIcon
                    name={"person"}
                    size={25}
                    color={themeContext.greyColor}
                  ></CustomIcon>
                  <Text
                    style={{
                      color: themeContext.greenColor,
                      marginHorizontal: 10,
                    }}
                  >
                    {memberList.filter((member) => member != null).length}명
                  </Text>
                </RowContainer>
              )}
            </TouchableOpacity>
          </OptionContainer>
          <OptionContainer>
            <TextInput
              value={voteTitle}
              placeholder={"투표 제목"}
              onChangeText={onChangeVoteTitle}
              onSubmitEditing={onSubmitVoteTitle}
              returnKeyType="next"
              style={{ height: "100%", paddingHorizontal: 10 }}
            ></TextInput>
          </OptionContainer>
          <VoteListContainer>
            {voteList.map((vote, idx) => {
              console.log(vote);
              return (
                <VoteList
                  key={"voteList-" + idx}
                  idx={idx}
                  value={vote}
                  placeholder={"선택지를 입력하세요"}
                  onChangeText={onChangeVoteList}
                  onSubmitEditing={onSubmitVoteList}
                  spliceElem={spliceElem}
                  returnKeyType="next"
                  style={{ height: "100%" }}
                ></VoteList>
              );
            })}

            <VoteListElement style={styles.withShadow}>
              <TouchableOpacity
                style={{ ...styles.voteAddList }}
                onPress={addVoteList}
              >
                <CustomIcon
                  name={"add"}
                  size={30}
                  color={themeContext.lightGreyColor}
                ></CustomIcon>
                <AlginedText>선택지를 추가하세요</AlginedText>
              </TouchableOpacity>
            </VoteListElement>
          </VoteListContainer>

          <OptionContainer>
            <TouchableOpacity
              style={{ height: "100%" }}
              onPress={() => setDatePickerVisibility((prev) => !prev)}
            >
              <RowContainer>
                <IconTextContainer style={{ marginLeft: 7 }}>
                  <MaterialCommunityIcons
                    name={"clock-outline"}
                    size={25}
                    color={themeContext.greyColor}
                  ></MaterialCommunityIcons>
                  <AlginedText
                    style={{
                      color: themeContext.greyColor,
                    }}
                  >
                    투표 마감 시간 설정
                  </AlginedText>
                </IconTextContainer>
                <AlginedText
                  style={{
                    color: themeContext.greyColor,
                  }}
                >
                  {deadline ? timePickedConverter(deadline) : null}
                </AlginedText>
              </RowContainer>
            </TouchableOpacity>
            <DateTimePicker
              setDeadline={setDeadline}
              isDatePickerVisible={isDatePickerVisible}
              setDatePickerVisibility={setDatePickerVisibility}
            ></DateTimePicker>
          </OptionContainer>
          <OptionContainer>
            <RowContainer>
              <IconTextContainer>
                <CustomIcon
                  name={"done-all"}
                  size={25}
                  color={themeContext.greyColor}
                ></CustomIcon>
                <AlginedText
                  style={{
                    color: themeContext.greyColor,
                  }}
                >
                  복수 선택
                </AlginedText>
              </IconTextContainer>

              <CheckBox
                right={true}
                iconRight={true}
                checkedColor={themeContext.lightGreenColor}
                checkedIcon="check-circle"
                uncheckedIcon="check-circle"
                checked={multipleOption}
                onPress={() => setMultipleOption((prev) => !prev)}
              />
            </RowContainer>
          </OptionContainer>
          <OptionContainer>
            <RowContainer>
              <IconTextContainer>
                <FontAwesome
                  name={"user"}
                  size={27}
                  color={themeContext.greyColor}
                ></FontAwesome>
                <AlginedText
                  style={{
                    color: themeContext.greyColor,
                  }}
                >
                  익명 투표
                </AlginedText>
              </IconTextContainer>

              <CheckBox
                right={true}
                iconRight={true}
                checkedColor={themeContext.lightGreenColor}
                checkedIcon="check-circle"
                uncheckedIcon="check-circle"
                checked={anonymousOption}
                onPress={() => setAnonymousOption((prev) => !prev)}
              />
            </RowContainer>
          </OptionContainer>
          <TextInput
            value={voteMemo}
            placeholder={"투표 메모"}
            onChangeText={onChangeVoteMemo}
            onSubmitEditing={onSubmitVoteMemo}
            underlineColorAndroid="transparent"
            returnKeyType="none"
            style={{
              paddingVertical: 0,
              paddingHorizontal: 10,
            }}
            autoCorrect={false}
            scrollEnabled={false}
            autoFocus={false}
            multiline={true}
          ></TextInput>
        </Container>
        <EmptySpace></EmptySpace>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  voteTargetButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  voteAddList: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  withShadow: {
    borderWidth: 0,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    shadowOffset: {
      height: 2.5,
      width: 2.5,
    },
  },
});
