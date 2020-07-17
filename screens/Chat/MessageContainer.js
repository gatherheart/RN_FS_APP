/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Avatar,
  Bubble,
  SystemMessage,
  Message,
  MessageText,
  utils,
} from "react-native-gifted-chat";
import { formatAMPM, getYearMonthDayKr } from "../../utils/DateFormat";
import { isSameTime } from "./customUtils";

const { isSameUser, isSameDay } = utils;

export const renderAvatar = (props) => {
  return (
    <Avatar
      {...props}
      containerStyle={{ left: {}, right: {} }}
      imageStyle={{ left: {}, right: {} }}
    />
  );
};

const renderUsername = (props) => {
  const username = props.currentMessage.user.name;
  if (username) {
    const { containerStyle, wrapperStyle, ...usernameProps } = props;
    if (props.renderUsername) {
      return props.renderUsername(usernameProps);
    }
    return (
      <Text
        style={[
          slackStyles.standardFont,
          slackStyles.headerItem,
          slackStyles.username,
          props.usernameStyle,
        ]}
      >
        {username}
      </Text>
    );
  }
  return null;
};
export const renderTime = (props) => {
  const { currentMessage, previousMessage } = props;
  const _nextPageExist = !!Object.keys(props.nextMessage).length;
  console.log(props.currentMessage, _nextPageExist);
  const isSameThread =
    isSameUser(currentMessage, previousMessage) &&
    isSameTime(currentMessage, previousMessage) &&
    _nextPageExist;

  return isSameThread ? null : (
    <View
      style={{
        width: "100%",
        position: "absolute",
        bottom: 0,
        right: props.currentMessage.user._id === props.user._id ? 50 : -50,
      }}
    >
      {console.log(props.currentMessage.user._id === props.user._id)}
      <Text
        style={{
          fontSize: 10,
          fontWeight: "200",
          opacity: 0.5,
          alignSelf:
            props.currentMessage.user._id === props.user._id
              ? "flex-start"
              : "flex-end",
          width: 50,
          textAlign: "center",
        }}
      >
        {formatAMPM(props.currentMessage.createdAt)}
      </Text>
    </View>
  );
};

export const renderDay = (props) => (
  <View
    style={{
      width: "100%",
    }}
  >
    {console.log(props.currentMessage.user._id === props.user._id)}
    <Text
      style={{
        fontSize: 10,
        fontWeight: "200",
        opacity: 0.5,
        width: 50,
        textAlign: "center",
      }}
    >
      {getYearMonthDayKr(props.currentMessage.createdAt)}
    </Text>
  </View>
);

export const renderBubble = (props) => {
  const { currentMessage, previousMessage } = props;
  const isSameThread =
    isSameUser(props.currentMessage, props.previousMessage) &&
    isSameDay(props.currentMessage, props.previousMessage);
  const isMe = props.user._id === props.currentMessage?.user?._id;
  const messageHeader =
    isSameThread || isMe ? null : (
      <View style={slackStyles.headerView}>{renderUsername(props)}</View>
    );
  return (
    <View>
      {messageHeader}
      <Bubble
        {...props}
        // renderTime={() => <Text>Time</Text>}
        // renderTicks={() => <Text>Ticks</Text>}
        containerStyle={{
          left: {
            marginTop: !isSameUser(currentMessage, previousMessage) ? 10 : 0,
          },
          right: {
            marginTop: !isSameUser(currentMessage, previousMessage) ? 10 : 0,
          },
        }}
        wrapperStyle={{
          left: {},
          right: {},
        }}
        bottomContainerStyle={{
          left: {},
          right: {},
        }}
        tickStyle={{}}
        usernameStyle={{}}
        containerToNextStyle={{
          left: {},
          right: {},
        }}
        containerToPreviousStyle={{
          left: {},
          right: {},
        }}
      />
    </View>
  );
};

export const renderSystemMessage = (props) => (
  <SystemMessage
    {...props}
    containerStyle={{ backgroundColor: "pink" }}
    wrapperStyle={{ borderWidth: 10, borderColor: "white" }}
    textStyle={{ color: "crimson", fontWeight: "900" }}
  />
);

export const renderMessage = (props) => (
  <Message
    {...props}
    // renderDay={() => <Text>Date</Text>}
    containerStyle={{ marginTop: 20, borderWidth: 1 }}
  />
);

export const renderMessageText = (props) => (
  <MessageText
    {...props}
    containerStyle={{
      left: { backgroundColor: "yellow" },
      right: { backgroundColor: "purple" },
    }}
    textStyle={{
      left: { color: "red" },
      right: { color: "green" },
    }}
    linkStyle={{
      left: { color: "orange" },
      right: { color: "orange" },
    }}
    customTextStyle={{ fontSize: 24, lineHeight: 24 }}
  />
);

export const renderCustomView = ({ user }) => (
  <View style={{ minHeight: 0, alignItems: "center" }}></View>
);

const slackStyles = StyleSheet.create({
  standardFont: {
    fontSize: 14,
  },
  slackMessageText: {
    marginLeft: 0,
    marginRight: 0,
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
  },
  wrapper: {
    marginRight: 60,
    minHeight: 20,
    justifyContent: "flex-end",
  },
  username: {
    fontWeight: "bold",
  },
  time: {
    textAlign: "left",
    fontSize: 12,
  },
  timeContainer: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  headerItem: {},
  headerView: {
    left: -10,
  },
  /* eslint-disable react-native/no-color-literals */
  tick: {
    backgroundColor: "transparent",
    color: "white",
  },
  /* eslint-enable react-native/no-color-literals */
  tickView: {
    flexDirection: "row",
  },
  slackImage: {
    borderRadius: 3,
    marginLeft: 0,
    marginRight: 0,
  },
});
