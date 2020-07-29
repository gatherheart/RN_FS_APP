import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
} from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import styled, { ThemeContext } from "styled-components/native";
import { banks } from "../../constants/Bank";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Title = styled.Text`
  font-weight: 400;
  font-size: 14px;
  margin: 20px 0px 20px 20px;
  font-family: ${(props) => props.theme.boldFont};
`;

const Body = styled.Text`
  font-weight: 300;
  font-size: 13px;
  text-align: center;
  margin: 10px 0px 20px 10px;
  font-family: ${(props) => props.theme.regularFont};
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
const OkButtonText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.darkGreyColor};
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
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderRadius: 4,
            width: (WIDTH * 30) / 100,
            color: "black",
            paddingRight: 30, // to ensure the text is never behind the icon
          },
          inputAndroid: {
            fontSize: 15,
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

      <Ionicons
        name="ios-arrow-down"
        size={20}
        color={themeContext.lightGreyColor}
      />
    </View>
  );
};
const EditProfileModal = ({
  modalVisible = false,
  setModalVisible,
  title = "",
  body = "",
  cancleEnabled = false,
  callback = () => {},
  onModalHide = () => {},
}) => {
  const themeContext = useContext(ThemeContext);

  const [accountOwner, setAccountOwner] = useState("");

  const [account, setAccount] = useState("");
  const onChangeAccountOwner = (text) => {
    setAccountOwner(text);
  };
  const onChangeAccount = (text) => {
    console.log(text);
    setAccount(text);
  };
  const changeState = (_success) => {
    setModalVisible((prev) => {
      if (typeof prev === "boolean") return !prev;
      else if (typeof prev === "object")
        return { ...prev, visible: !prev.visible, success: _success };
      else return prev;
    });
  };
  return (
    <Modal
      isVisible={modalVisible}
      onRequestClose={changeState}
      onBackdropPress={changeState}
      backdropColor={"black"}
      backdropOpacity={0.7}
      hasBackdrop={true}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      animationInTiming={100}
      animationOutTiming={100}
      style={{
        alignItems: "center",
      }}
      useNativeDriver
      onModalHide={onModalHide}
    >
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <OptionContainer>
            <TextInput
              value={accountOwner}
              placeholder={"예금주"}
              onChangeText={onChangeAccountOwner}
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
          <View style={styles.button}>
            {cancleEnabled ? (
              <TouchableOpacity
                style={{
                  marginVertical: 20,
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
                onPress={() => changeState(false)}
              >
                <OkButtonText>취소</OkButtonText>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              style={{
                marginVertical: 20,
                paddingHorizontal: 30,
              }}
              onPress={() => {
                callback();
                changeState(true);
              }}
            >
              <OkButtonText>확인</OkButtonText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

EditProfileModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  cancleEnabled: PropTypes.bool,
  callback: PropTypes.func,
  onModalHide: PropTypes.func,
};

export default EditProfileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    opacity: 0,
  },
  keyboard: {
    height: "100%",
    paddingHorizontal: 10,
  },
  modalContainer: {
    width: (WIDTH * 80) / 100,
    height: (HEIGHT * 15) / 100,
    margin: 0,
    backgroundColor: "white",
    bottom: 20,
  },
  innerContainer: {
    backgroundColor: "white",
  },
  button: {
    flexDirection: "row",

    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
