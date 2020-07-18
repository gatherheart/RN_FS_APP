/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import {
  Image,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  InputToolbar,
  Actions,
  Composer,
  Send,
  SystemMessage,
} from "react-native-gifted-chat";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { formatAMPM, getYearMonthDayKr } from "../../utils/DateFormat";
import { GREEN_COLOR } from "../../constants/Color";
import { _pickImage, _pickDocument } from "../../utils/FileSystem";

export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: "#fff",
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
    }}
    primaryStyle={{}}
  />
);

export const renderSystemMessage = (props) => (
  <SystemMessage
    {...props}
    containerStyle={{ backgroundColor: "white" }}
    wrapperStyle={{ borderWidth: 10, borderColor: "white" }}
    textStyle={{ color: "blue", fontWeight: "900" }}
  />
);

export const renderScrollToBottom = (props) => (
  <Ionicons name={"ios-arrow-down"} size={20}></Ionicons>
);

export const renderActions = (change) => (props) => (
  <Actions
    {...props}
    containerStyle={{
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 0,
    }}
    icon={() => <Ionicons name={"ios-add"} size={20}></Ionicons>}
    options={{
      "이미지 선택": async () => {
        const _picked = await _pickImage();
        console.log(_picked);
        const _handleOnPress = () => {
          const { onSend } = props;
          if (_picked && onSend) {
            onSend({ image: _picked.uri }, true);
          }
        };
        _handleOnPress();
      },
      닫기: () => {
        console.log("Cancel");
      },
    }}
    optionTintColor="#222B45"
  />
);

export const renderComposer = (props) => (
  <Composer
    {...props}
    textInputProps={{
      autoCorrect: false,
      autoCapitalize: "none",
      autoGrow: true,
      autoFocus: false,
    }}
    placeholder={""}
  />
);

export const renderSend = (keyboardHeight, emojiButtonFunc) => (props) => {
  const _enabled = !props.text && !props.emoji && !keyboardHeight;
  return _enabled ? (
    <TouchableOpacity style={styles.emojiButton} onPress={emojiButtonFunc}>
      <FontAwesome name="lemon-o" size={24} color={GREEN_COLOR} />
    </TouchableOpacity>
  ) : (
    <Send
      {...props}
      disabled={_enabled}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 4,
      }}
    >
      <FontAwesome name="send-o" size={24} color={GREEN_COLOR} />
    </Send>
  );
};

const styles = StyleSheet.create({
  emojiButton: { borderWidth: 0, alignSelf: "center", marginRight: 10 },
});
