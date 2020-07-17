/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Image, TextInput, View, Text } from "react-native";
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

export const renderKeyboard = (props) => {
  const {
    commentForm: { text },
  } = props;
  return (
    <TextInput
      autoGrow={true}
      style={{ flex: 1 }}
      onChangeText={this.handleOnChangeText}
      value={text}
      multiline={true}
      placeholder="Write a message..."
      autoCorrect={false}
      underlineColorAndroid="transparent"
      blurOnSubmit={false}
      onFocus={() => this.setState({ focusOnInput: true })}
      onBlur={() => this.setState({ focusOnInput: false })}
    />
  );
};

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
      "Choose From Library": () => {
        console.log("Choose From Library");
        change("image");
      },
      Cancel: () => {
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
    }}
    placeholder={""}
  />
);

export const renderSend = (props) => {
  const _enabled = !props.text;
  return _enabled ? (
    <Send
      {...props}
      disabled={!_enabled}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 4,
      }}
    >
      <FontAwesome name="lemon-o" size={24} color={GREEN_COLOR} />
    </Send>
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
