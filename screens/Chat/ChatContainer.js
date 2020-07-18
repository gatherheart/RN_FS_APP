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
import { _pickImage } from "../../utils/FileSystem";
import CustomHeader from "../../components/common/CustomHeader";
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
  const [viewHeight, setViewHeight] = useState(244);

  const didShow = (height) => {
    console.log("Keyboard show. Height is " + height, emojiEnabled, viewHeight);
    setViewHeight(height !== 0 ? height : viewHeight);
  };
  const didHide = () => {};
  const [keyboardHeight] = useKeyboard(didShow, didHide);
  const _closeEmojiPanel = () => {
    setemojiEnabled(false);
  };
  const getDate = async () => {};

  const changeImage = (test) => {
    setState((prev) => ({ ...prev, image: test }));
  };
  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", () => {
      setemojiEnabled(false);
    });

    return () =>
      Keyboard.removeListener("keyboardWillShow", () => {
        setemojiEnabled(false);
      });
  }, []);

  useEffect(() => {
    getDate();
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
    console.log("Hello emojiButtonFunc");
    setemojiEnabled((prev) => !prev);
    if (keyboardHeight !== 0) Keyboard.dismiss();
  };

  const _listViewProps = {
    style: styles.listViewStyle,
    contentContainerStyle: styles.contentContainerStyle,
    keyboardDismissMode: "on-drag",
  };

  //  https://stackoverflow.com/a/54550286/1458375
  return state.loading ? (
    <Loader></Loader>
  ) : (
    <View style={styles.main}>
      <CustomHeader></CustomHeader>

      <KeyboardAvoidingView
        style={{ ...styles.container }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        enabled={true}
      >
        <GiftedChat
          messages={state.messages}
          onSend={(messages) => onSend(messages)}
          wrapInSafeArea={false}
          bottomOffset={getBottomSpace()}
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
          renderComposer={renderComposer(_closeEmojiPanel)}
          renderSend={renderSend(keyboardHeight, emojiButtonFunc)}
          renderInputToolbar={renderInputToolbar}
          renderActions={renderActions(changeImage)}
          listViewProps={_listViewProps}
          renderTime={renderTime}
          renderDay={renderDay}
          renderCustomView={renderCustomView}
          renderAvatar={renderAvatar}
          renderAvatarOnTop={true}
          isKeyboardInternallyHandled={false}
          messagesContainerStyle={{
            paddingBottom: 0,
          }}
          alwaysShowSend
          keyboardShouldPersistTaps={"never"}
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
      </KeyboardAvoidingView>
    </View>
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
    marginBottom: getBottomSpace(),
    backgroundColor: "white",
    paddingTop: HeaderHeight,
  },
  main: { flex: 1, backgroundColor: "white" },
});

export default Chat;
