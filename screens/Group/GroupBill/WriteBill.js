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
import CustomHeader from "../../../components/CustomHeader";
import DateTimePicker from "../../../components/DateTimePicker";
import { timePickedConverter } from "../../../utils/DateFormat";
import { CheckBox } from "react-native-elements";
import CustomIcon from "../../../components/CustomIcon";
import { useNavigation } from "@react-navigation/native";
import CustumIcon from "../../../components/CustomIcon";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import AlertModal from "../../../components/AlertModal";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import * as WebBrowser from "expo-web-browser";

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

const Calculated = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.moreLightGreyColor};
`;

const EmptySpace = styled.View`
  height: ${HEIGHT / 2}px;
`;

const AlginedText = styled.Text`
  margin: 0px 0px 0px 10px;
  color: ${(props) => props.theme.lightGreyColor}
  font-family: ${(props) => props.theme.regularFont}
`;

const NanumText = styled.Text`
  font-family: ${(props) => props.theme.regularFont};
`;

export const Dropdown = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={[
          { label: "신한", value: "신한" },
          { label: "국민", value: "국민" },
          { label: "Hockey", value: "hockey" },
          { label: "Football", value: "football" },
          { label: "Baseball", value: "baseball" },
          { label: "Hockey", value: "hockey" },
          { label: "Football", value: "football" },
          { label: "Baseball", value: "baseball" },
          { label: "Hockey", value: "hockey" },
          { label: "Football", value: "football" },
          { label: "Baseball", value: "baseball" },
          { label: "Hockey", value: "hockey" },
          { label: "Football", value: "football" },
          { label: "Baseball", value: "baseball" },
          { label: "Hockey", value: "hockey" },
          { label: "Football", value: "football" },
          { label: "Baseball", value: "baseball" },
          { label: "Hockey", value: "hockey" },
          { label: "Football", value: "football" },
          { label: "Baseball", value: "baseball" },
          { label: "Hockey", value: "hockey" },
        ]}
        placeholder={{ label: "은행", value: "은행" }}
        style={{
          inputIOS: {
            fontSize: 15,
            fontFamily: themeContext.regularFont,
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderRadius: 4,
            width: (WIDTH * 30) / 100,
            color: "black",
            paddingRight: 30, // to ensure the text is never behind the icon
          },
          inputAndroid: {
            fontSize: 15,
            fontFamily: themeContext.regularFont,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 4,
            width: (WIDTH * 30) / 100,
            color: "black",
            paddingRight: 20, // to ensure the text is never behind the icon
          },
          iconContainer: {
            top: "25%",
            right: "5%",
          },
        }}
        useNativeAndroidPickerStyle={false}
      />

      <CustomIcon
        name="arrow-down"
        size={20}
        color={themeContext.lightGreyColor}
      />
    </View>
  );
};

export default ({ id }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [voteTitle, setVoteTitle] = useState("");
  const [voteMemo, setVoteMemo] = useState("");
  const [billAmount, setBillAmount] = useState("");

  const [voteList, setVoteList] = useState(["", ""]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [deadline, setDeadline] = useState(null);
  const [multipleOption, setMultipleOption] = useState(false);
  const [anonymousOption, setAnonymousOption] = useState(false);
  const [voteMemberList, setVoteMemberList] = useState([]);
  const [message, setMessage] = useState("");
  const [bank, setBank] = useState("");

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
  const onSubmitBillAmount = () => {
    if (voteMemo === "") return;
  };

  const onChangeVoteTitle = (text) => setVoteTitle(text);
  const onChangeVoteMemo = (text) => {
    setVoteMemo(text);
  };
  const onChangeBillAmount = (amount) => {
    //console.log(isNaN(amount));

    setBillAmount(amount);
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
  const _handleOpenWithWebBrowser = (url) => {
    WebBrowser.openBrowserAsync(url);
  };
  const test = async () => {
    const _tossApiKey = "7fdab359e56848fca91ac00d6a4f87c1";
    const ret = await axios
      .post("https://toss.im/transfer-web/linkgen-api/link", {
        apiKey: _tossApiKey,
        bankName: "신한",
        bankAccountNo: "110384479842",
        amount: "1000",
        message: "입금 버튼",
      })
      .then((response) => {
        console.log(response.data.success.scheme);
        _handleOpenWithWebBrowser(response.data.success.scheme);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    test();
  }, []);
  const changeModal = () => {
    setModalVisible((prev) => !prev);
  };

  if (message === "투표를 등록하였습니다." && !modalVisible)
    navigation.navigate("GroupDrawer", { id: id });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "height" : "height"}
    >
      <CustomHeader
        title={"수금 작성"}
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
              onPress={() => navigation.navigate("VoteMemberList", {})}
              style={{
                ...styles.voteTargetButton,
                borderColor: themeContext.moreLightGreyColor,
                borderBottomColor: "white",
              }}
            >
              <AlginedText>수금할 대상 선택</AlginedText>
            </TouchableOpacity>
          </OptionContainer>
          <OptionContainer>
            <TextInput
              value={voteTitle}
              placeholder={"수금 제목"}
              onChangeText={onChangeVoteTitle}
              onSubmitEditing={onSubmitVoteTitle}
              returnKeyType="next"
              style={{
                ...styles.keyboard,
                fontFamily: themeContext.regularFont,
              }}
            ></TextInput>
          </OptionContainer>
          <OptionContainer>
            <TextInput
              value={billAmount}
              placeholder={"총 금액"}
              onChangeText={onChangeBillAmount}
              onSubmitEditing={onSubmitBillAmount}
              keyboardType="number-pad"
              returnKeyType="next"
              style={{
                ...styles.keyboard,
                fontFamily: themeContext.regularFont,
              }}
            ></TextInput>
          </OptionContainer>
          <OptionContainer>
            <Calculated
              style={{
                ...themeContext.withShadow,
                backgroundColor: themeContext.moreLightGreyColor,
              }}
            >
              <NanumText style={{ color: themeContext.greenColor }}>
                1 인당
              </NanumText>
              <NanumText>{Math.ceil(billAmount / 13)} 원</NanumText>
            </Calculated>
          </OptionContainer>
          <OptionContainer>
            <TextInput
              value={voteTitle}
              placeholder={"예금주"}
              onChangeText={onChangeVoteTitle}
              onSubmitEditing={onSubmitVoteTitle}
              returnKeyType="next"
              style={{
                ...styles.keyboard,
                fontFamily: themeContext.regularFont,
              }}
            ></TextInput>
          </OptionContainer>
          <OptionContainer>
            <RowContainer style={{ alignItems: "center" }}>
              <Dropdown></Dropdown>
              <TextInput
                value={voteTitle}
                placeholder={"예금주"}
                onChangeText={onChangeVoteTitle}
                onSubmitEditing={onSubmitVoteTitle}
                returnKeyType="next"
                style={{
                  ...styles.keyboard,
                  fontFamily: themeContext.regularFont,
                }}
              ></TextInput>
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
  keyboard: {
    height: "100%",
    paddingHorizontal: 10,
  },
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
