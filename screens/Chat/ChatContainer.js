import React, { Component, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";

import { GiftedChat, Send } from "react-native-gifted-chat";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import KeyboardSpacer from "react-native-keyboard-spacer";

import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSystemMessage,
  renderScrollToBottom,
  renderSend,
} from "./InputToolBar";
import renderDay from "./RenderDay";
import { isIphoneX, getBottomSpace } from "react-native-iphone-x-helper";
import {
  BottomSafeAreaHeight,
  HeaderHeight,
  UnderHeader,
} from "../../utils/HeaderHeight";
import {
  renderMessage,
  renderCustomView,
  renderBubble,
  renderAvatar,
  renderUsername,
  renderTime,
  renderMessageImage,
} from "./MessageContainer";
import { useState } from "react";
import Loader from "../../components/common/Loader";
import messagesData from "./Messages";
import { useKeyboard } from "react-native-keyboard-height";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const Chat = () => {
  const [state, setState] = useState({
    loading: true,
    messages: [],
  });
  const animation = useRef(null);
  const [emojiEnabled, setemojiEnabled] = useState(false);
  const onClick = (emoji) => {
    console.log(emoji);
  };
  const didShow = (height) => {
    console.log("Keyboard show. Height is " + height);
    setemojiEnabled(false);
    setViewHeight(height);
  };

  const didHide = () => {
    console.log("Keyboard hide");
  };
  const [keyboardHeight] = useKeyboard(didShow, didHide);
  const [viewHeight, setViewHeight] = useState(
    0
  ); /* for example with didShow and didHide */

  const changeImage = (test) => {
    setState((prev) => ({ ...prev, image: test }));
  };

  useEffect(() => {
    console.log(state);
    if (!state.messages?.length) {
      setState({
        loading: false,
        messages: [
          {
            _id: Math.round(Math.random() * 1000000),
            text: "0 message",
            createdAt: new Date(),
            system: true,
          },
        ],
      });
    }
    setState({
      loading: false,
      messages: messagesData,
    });
  }, []);

  const onSend = (messages = []) => {
    setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };
  const emojiButtonFunc = () => {
    console.log("Hello World");
    setemojiEnabled((prev) => !prev);
    console.log(keyboardHeight);
    Keyboard.dismiss();
  };
  const _listViewProps = {
    style: styles.listViewStyle,
    contentContainerStyle: styles.contentContainerStyle,
  };
  useEffect(() => {
    console.log(viewHeight);
  }, [viewHeight]);

  //  https://stackoverflow.com/a/54550286/1458375
  return state.loading ? (
    <Loader></Loader>
  ) : (
    <>
      {state.messages?.length === 0 && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              bottom: 50,
            },
          ]}
        >
          <Image
            source={{ uri: "https://i.stack.imgur.com/qLdPt.png" }}
            style={{
              ...StyleSheet.absoluteFillObject,
              resizeMode: "contain",
            }}
          />
        </View>
      )}
      <View style={styles.container}>
        <GiftedChat
          messages={state.messages}
          onSend={(messages) => onSend(messages)}
          wrapInSafeArea={false}
          bottomOffset={
            getBottomSpace() +
            (emojiEnabled ? viewHeight - getBottomSpace() : 0)
          }
          scrollToBottom
          scrollToBottomComponent={renderScrollToBottom}
          renderSystemMessage={renderSystemMessage}
          renderMessage={renderMessage}
          onPressAvatar={console.log}
          renderCustomView={(props) => renderCustomView(props, animation)}
          renderMessageImage={renderMessageImage}
          renderBubble={renderBubble}
          messagesContainerStyle={{ backgroundColor: "white" }}
          user={{
            _id: 1,
            name: "Developers",
            avatar: "https://placeimg.com/150/150/any",
          }}
          renderUsername={renderUsername}
          renderComposer={renderComposer}
          renderSend={renderSend(keyboardHeight, emojiButtonFunc)}
          renderInputToolbar={renderInputToolbar}
          renderActions={renderActions(changeImage)}
          listViewProps={_listViewProps}
          renderTime={renderTime}
          renderDay={renderDay}
          renderCustomView={renderCustomView}
          renderAvatar={renderAvatar}
          renderAvatarOnTop={true}
          renderAccessory={
            emojiEnabled ? () => <View style={{ borderWidth: 1 }}></View> : null
          }
          accessoryStyle={{
            height: viewHeight - getBottomSpace(),
          }}
          messagesContainerStyle={{
            paddingBottom: emojiEnabled ? viewHeight - getBottomSpace() : 0,
          }}
          alwaysShowSend
          parsePatterns={(linkStyle) => {
            return [
              {
                pattern: /#(\w+)/,
                style: { ...linkStyle[0], color: "lightgreen" },
                onPress: (props) => alert(`press on ${props}`),
              },
            ];
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
  sendingContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: "100%",
    marginRight: 10,
    borderWidth: 1,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: "cover",
  },
  listViewStyle: {},
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainerStyle: {},
  container: {
    flex: 1,
    paddingBottom: getBottomSpace(),
    backgroundColor: "white",
    paddingTop: UnderHeader,
  },
});

export default Chat;
