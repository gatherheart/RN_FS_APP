import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Clipboard,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import styled, { ThemeContext } from "styled-components/native";
import { simplifiedFormat } from "../../../utils/DateFormat";
import CustomIcon from "../../common/CustomIcon";
import AlertModal from "../../common/AlertModal";
import * as WebBrowser from "expo-web-browser";
import { _kakaoUriGenerate } from "../../../utils/Payment";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Title = styled.Text`
  font-weight: 400;
  font-size: 14px;
  margin: 20px 0px 20px 20px;
  font-family: ${(props) => props.theme.boldFont};
`;
const Deadline = styled.Text`
  font-size: 13px;
  text-align: right;
  margin: 0px 10px 10px 0px;
  font-family: ${(props) => props.theme.regularFont};
`;

const Body = styled.Text`
  font-weight: 300;
  font-size: 13px;
  text-align: center;
  margin: 10px 0px 20px 10px;
  font-family: ${(props) => props.theme.regularFont};
`;

const AccountContainer = styled.View`
  background-color: ${(props) => props.theme.pastelGreyColor};
  padding-vertical: 10px;
  padding-horizontal: 5%;
  margin-right: 5px;
  border-radius: 7px;
  justify-content: center;
`;

const Caculated = styled.View`
  background-color: ${(props) => props.theme.pastelGreyColor};
  margin-right: 5px;
  border-radius: 7px;
  justify-content: center;
  align-items: center;
  width: 59%;
  flex-direction: row;
`;

const OkButtonText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.darkGreyColor};
  font-family: ${(props) => props.theme.regularFont};
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const NanumText = styled.Text`
  font-family: ${(props) => props.theme.regularFont};
`;

const CheckContainer = styled.View`
  background-color: ${(props) => props.theme.pastelGreyColor};
  border-color: ${(props) => props.theme.lightGreyColor};
  border-width: 0.2px;
  height: 40px;
  width: 30%;
  border-radius: 7px;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.View`
  width: 92%;
  align-items: center;
  overflow: hidden;
`;

export default ({
  modalVisible = false,
  setModalVisible,
  billTitle = "",
  billMemo = "",
  deadline = "",
  kakaoUri = "",
  tossUri = "",
  bank = "",
  account = "",
  accountOwner = "",
  memberList = [],
  billAmount = 0,
}) => {
  const changeState = () => {
    setModalVisible((prev) => !prev);
  };
  const _handleOpenWithWebBrowser = async (url) => {
    if (url === "") {
      setMessage("등록되어 있지 않은 주소입니다.");
      setAlertVisible(true);
      return;
    }
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch (err) {
      console.log(err);
      setMessage("앱을 여는 데 문제가 발생하였습니다.");
      setAlertVisible(true);
    }
  };

  const themeContext = useContext(ThemeContext);

  const [clipboardContent, setClipboardContent] = useState("");
  const [message, setMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [paid, setPaid] = useState(false);

  const readFromClipboard = async () => {
    const clipboardContent = await Clipboard.getString();
    this.setState({ clipboardContent });
  };

  const writeToClipboard = async () => {
    await Clipboard.setString(account);
    setMessage("복사 되었습니다.");
    setAlertVisible(true);
  };

  return (
    <Modal
      isVisible={modalVisible}
      onRequestClose={changeState}
      onBackdropPress={changeState}
      backdropColor={"black"}
      backdropOpacity={0.7}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating={false}
      useNativeDriver={true}
      animationIn={{ from: { opacity: 1 }, to: { opacity: 1 } }}
      animationOut={{ from: { opacity: 0 }, to: { opacity: 0 } }}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AlertModal
        setModalVisible={setAlertVisible}
        modalVisible={alertVisible}
        body={message}
      ></AlertModal>
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              width: "100%",
              paddingRight: 10,
              top: 10,
            }}
          >
            <TouchableOpacity onPress={changeState}>
              <CustomIcon
                name={"close"}
                color={themeContext.greyColor}
                size={27}
              ></CustomIcon>
            </TouchableOpacity>
          </View>
          <RowContainer>
            <Title style={{ width: "100%", textAlign: "center" }}>
              {billTitle}
            </Title>
          </RowContainer>
          <Deadline>{simplifiedFormat(deadline).slice(4)} 까지</Deadline>
          <Body>{billMemo}</Body>
          <ButtonContainer>
            <RowContainer>
              <AccountContainer>
                <NanumText>{bank}</NanumText>
              </AccountContainer>
              <AccountContainer style={{ width: "50%", alignItems: "center" }}>
                <NanumText>{account}</NanumText>
              </AccountContainer>
              <AccountContainer
                style={{
                  marginRight: 0,
                  paddingHorizontal: 10,
                  backgroundColor: themeContext.lightGreenColor,
                }}
              >
                <TouchableOpacity onPress={writeToClipboard}>
                  <NanumText style={{ color: themeContext.greyColor }}>
                    복사
                  </NanumText>
                </TouchableOpacity>
              </AccountContainer>
            </RowContainer>
            <RowContainer
              style={{ justifyContent: "space-around", marginTop: 10 }}
            >
              <NanumText
                style={{ color: themeContext.greyColor, marginRight: 20 }}
              >
                총 금액: {billAmount.toLocaleString()}원
              </NanumText>
              <NanumText style={{ color: themeContext.greyColor }}>
                참여 인원: {memberList.length}
              </NanumText>
            </RowContainer>
            <RowContainer style={{ marginTop: 10 }}>
              <Caculated>
                <NanumText style={{ color: themeContext.greenColor }}>
                  1 인당{" "}
                </NanumText>
                <NanumText>
                  {Math.ceil(billAmount / memberList.length).toLocaleString()}원
                </NanumText>
              </Caculated>
              <View style={{ marginRight: 5 }}>
                <TouchableOpacity
                  onPress={() =>
                    _handleOpenWithWebBrowser(
                      _kakaoUriGenerate(kakaoUri, billAmount)
                    )
                  }
                >
                  <Image
                    style={{ width: 40, height: 40 }}
                    source={require("../../../assets/imgs/kakao.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => _handleOpenWithWebBrowser(tossUri)}
                >
                  <Image
                    style={{ width: 40, height: 40 }}
                    source={require("../../../assets/imgs/toss.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
            </RowContainer>
            <RowContainer style={{ marginTop: 10 }}>
              <CheckContainer
                style={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  backgroundColor: themeContext.greenColor,
                }}
              >
                <NanumText style={{ color: "white" }}>입금 여부</NanumText>
              </CheckContainer>
              <CheckContainer
                style={{
                  borderRadius: 0,
                  backgroundColor: paid
                    ? themeContext.lightGreenColor
                    : themeContext.pastelGreyColor,
                }}
              >
                <TouchableOpacity
                  style={styles.OXbutton}
                  onPress={() => setPaid(true)}
                >
                  <NanumText>O</NanumText>
                </TouchableOpacity>
              </CheckContainer>
              <CheckContainer
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  backgroundColor: !paid
                    ? themeContext.lightGreenColor
                    : themeContext.pastelGreyColor,
                }}
              >
                <TouchableOpacity
                  style={styles.OXbutton}
                  onPress={() => setPaid(false)}
                >
                  <NanumText>X</NanumText>
                </TouchableOpacity>
              </CheckContainer>
            </RowContainer>
            <RowContainer style={{ marginTop: 10 }}>
              <NanumText style={{ fontSize: 12, fontWeight: "300" }}>
                * 입금 완료 후 입금여부에 O를 눌러주세요.
              </NanumText>
            </RowContainer>
            <RowContainer>
              <TouchableOpacity
                style={{
                  ...styles.okButton,
                  backgroundColor: themeContext.lightGreyColor,
                }}
                onPress={changeState}
              >
                <OkButtonText style={{ color: themeContext.backgroundColor }}>
                  확인
                </OkButtonText>
              </TouchableOpacity>
            </RowContainer>
          </ButtonContainer>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    opacity: 0,
  },
  modalContainer: {
    width: (WIDTH * 80) / 100,
    margin: 0,
    backgroundColor: "white",
    borderRadius: 9,
    overflow: "hidden",
  },
  innerContainer: {
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 8,
  },
  okButton: {
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: "30%",
    borderRadius: 7,
  },
  OXbutton: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
