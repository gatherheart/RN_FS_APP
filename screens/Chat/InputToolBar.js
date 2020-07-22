/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import {
  Image,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
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
import {
  GREEN_COLOR,
  LIGHT_GREY_COLOR,
  LIGHT_GREEN_COLOR,
} from "../../constants/Color";
import { _pickImage, _pickDocument } from "../../utils/FileSystem";
import InputOnKeyboard from "../../components/common/InputOnKeyboard";
import { getBottomSpace } from "react-native-iphone-x-helper";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const ICON_BOX_SIZE = 40;
export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: "#ececec",
    }}
    primaryStyle={{}}
  />
);

export const renderCustomInputToolBar = (text, setText) => (props) => {
  return <InputToolbar {...props} containerStyle={{}} />;
};

export const renderSystemMessage = (props) => (
  <SystemMessage
    {...props}
    containerStyle={{ backgroundColor: "white" }}
    wrapperStyle={{ borderWidth: 0, borderColor: "white" }}
    textStyle={{ color: GREEN_COLOR, fontWeight: "900" }}
  />
);

export const renderScrollToBottom = (props) => (
  <Ionicons name={"ios-arrow-down"} size={20}></Ionicons>
);

export const renderActions = (change) => (props) => {
  return (
    <Actions
      {...props}
      containerStyle={{
        height: ICON_BOX_SIZE,
        width: ICON_BOX_SIZE,
        left: -10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 0,
      }}
      icon={() => (
        <Ionicons name={"ios-add"} size={25} color={GREEN_COLOR}></Ionicons>
      )}
      options={{
        "이미지 선택": async () => {
          const _picked = await _pickImage();
          const _handleOnPress = () => {
            const { onSend, user } = props;
            if (_picked && onSend) {
              onSend(
                {
                  text: "",
                  image: _picked.uri,
                  user: user,
                },
                true
              );
            }
          };
          _handleOnPress();
        },
        Cancel: () => {
          console.log("Cancel");
        },
      }}
      optionTintColor="#222B45"
    />
  );
};

export const renderComposer = (onFocusHandler) => (props) => (
  <Composer
    {...props}
    multiline
    textInputProps={{
      autoCorrect: false,
      autoCapitalize: "none",
      autoGrow: true,
      autoFocus: false,
      onFocus: onFocusHandler,
      borderColor: "#E4E9F2",
      marginTop: 2,
      left: -10,
      style: {
        width: WIDTH - ICON_BOX_SIZE * 3,
        height: "80%",
        alignSelf: "center",
      },
      selectionColor: GREEN_COLOR,
    }}
    placeholder={""}
  />
);

export const renderSend = (keyboardHeight, emojiButtonFunc) => (props) => {
  const _enabled = !props.text && !props.emoji && !keyboardHeight;
  return (
    <View style={styles.send}>
      <TouchableOpacity style={styles.emojiButton} onPress={emojiButtonFunc}>
        <FontAwesome name="lemon-o" size={22} color={GREEN_COLOR} />
      </TouchableOpacity>
      <Send
        {...props}
        disabled={_enabled}
        containerStyle={{
          width: ICON_BOX_SIZE,
          height: ICON_BOX_SIZE,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesome name="send-o" size={22} color={GREEN_COLOR} />
      </Send>
    </View>
  );
};

const styles = StyleSheet.create({
  emojiButton: {
    borderWidth: 0,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0,
    width: ICON_BOX_SIZE,
    height: ICON_BOX_SIZE,
  },
  send: {
    left: -10,
    alignSelf: "flex-start",
    flexDirection: "row",
  },
});
