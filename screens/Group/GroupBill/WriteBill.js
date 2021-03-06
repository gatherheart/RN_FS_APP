import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import CustomHeader from "../../../components/common/CustomHeader";
import CustomIcon from "../../../components/common/CustomIcon";
import { useNavigation, useRoute } from "@react-navigation/native";
import AlertModal from "../../../components/common/AlertModal";
import RNPickerSelect from "react-native-picker-select";
import { banks } from "../../../constants/Bank";

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
  justify-content: center;
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
  const items = banks.map((bank) => ({ label: bank, value: bank }));

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={items}
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
  const [billTitle, setBillTitle] = useState("");
  const [billMemo, setBillMemo] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [accountOwner, setAccountOwner] = useState("");
  const [account, setAccount] = useState("");
  const [bank, setBank] = useState("");
  const [message, setMessage] = useState("");
  const [memberList, setMemberList] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    setMemberList(
      route.params.memberList
        ? route.params.memberList.filter((member) => member != null)
        : []
    );
  }, [route]);

  const themeContext = useContext(ThemeContext);

  const onSubmitbillTitle = () => {
    if (billTitle === "") return;
  };
  const onSubmitbillMemo = () => {
    if (billMemo === "") return;
  };
  const onSubmitBillAmount = () => {
    if (billAmount === "") return;
  };
  const onSubmitAccount = () => {
    if (account === "") return;
  };
  const onSubmitAccountOwner = () => {
    if (accountOwner === "") return;
  };
  const onChangebillTitle = (text) => setBillTitle(text);
  const onChangebillMemo = (text) => {
    setBillMemo(text);
  };

  const onChangeBillAmount = (text) => {
    //console.log(isNaN(amount));
    setBillAmount(text);
  };
  const onChangeAccountOwner = (text) => {
    setAccountOwner(text);
  };
  const onChangeAccount = (text) => {
    console.log(text);
    setAccount(text);
  };

  const changeModal = () => {
    setModalVisible((prev) => !prev);
  };

  if (message === "투표를 등록하였습니다." && !modalVisible)
    navigation.navigate("GroupDrawer", { id: id });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <CustomHeader
        title={"더치페이"}
        headerStyle={{
          borderBottomWidth: 1,
          borderBottomColor: themeContext.moreLightGreyColor,
        }}
        rightButton={
          <Text onPress={() => setModalVisible((prev) => !prev)}>완료</Text>
        }
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
                  from: "GroupWriteBill",
                })
              }
              style={{
                ...styles.voteTargetButton,
                borderColor: themeContext.moreLightGreyColor,
                borderBottomColor: "white",
              }}
            >
              {memberList.length === 0 ? (
                <AlginedText>대상 선택</AlginedText>
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
                    {memberList.length}명
                  </Text>
                </RowContainer>
              )}
            </TouchableOpacity>
          </OptionContainer>
          <OptionContainer>
            <TextInput
              value={billTitle}
              placeholder={"수금 제목"}
              onChangeText={onChangebillTitle}
              onSubmitEditing={onSubmitbillTitle}
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
              <NanumText
                style={{ color: themeContext.greenColor, marginRight: 25 }}
              >
                1 인당
              </NanumText>
              <NanumText>
                {memberList.length === 0
                  ? 0
                  : Math.ceil(billAmount / memberList.length).toLocaleString()}
                원
              </NanumText>
            </Calculated>
          </OptionContainer>
          <OptionContainer>
            <TextInput
              value={accountOwner}
              placeholder={"예금주"}
              onChangeText={onChangeAccountOwner}
              onSubmitEditing={onSubmitAccountOwner}
              returnKeyType="next"
              style={{
                ...styles.keyboard,
              }}
            ></TextInput>
          </OptionContainer>
          <OptionContainer>
            <RowContainer
              style={{
                alignItems: "center",
              }}
            >
              <Dropdown></Dropdown>
              <TextInput
                value={account}
                placeholder={"계좌번호"}
                onChangeText={onChangeAccount}
                onSubmitEditing={onSubmitAccount}
                keyboardType="number-pad"
                returnKeyType="next"
                style={{
                  ...styles.keyboard,
                  color: "black",
                  paddingRight: 20,
                  width: 200,
                }}
              ></TextInput>
            </RowContainer>
          </OptionContainer>
          <OptionContainer>
            <RowContainer style={{ alignItems: "center" }}>
              <Text>QR Code</Text>
            </RowContainer>
          </OptionContainer>
          <TextInput
            value={billMemo}
            placeholder={"메모"}
            onChangeText={onChangebillMemo}
            onSubmitEditing={onSubmitbillMemo}
            underlineColorAndroid="transparent"
            returnKeyType="none"
            style={{
              paddingVertical: 20,
              paddingHorizontal: 10,
              minHeight: 200,
              marginTop: 20,
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
