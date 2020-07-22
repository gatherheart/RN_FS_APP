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
  ScrollView,
  Easing,
  Animated,
} from "react-native";

import { GiftedChat, Send } from "react-native-gifted-chat";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import KeyboardSpacer from "react-native-keyboard-spacer";
import EmojiBoard from "react-native-emoji-board";
import { DrawerActions } from "@react-navigation/drawer";

import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSystemMessage,
  renderScrollToBottom,
  renderSend,
  renderCustomInputToolBar,
} from "./InputToolBar";
import renderDay from "../../components/Chat/RenderDay";
import { isIphoneX, getBottomSpace } from "react-native-iphone-x-helper";
import {
  BottomSafeAreaHeight,
  HeaderHeight,
  UnderHeader,
  StatusHeight,
} from "../../utils/HeaderHeight";
import {
  renderMessage,
  renderCustomView,
  renderBubble,
  renderAvatar,
  renderUsername,
  renderTime,
  renderMessageImage,
  renderMessageText,
} from "./MessageContainer";
import { useState } from "react";
import Loader from "../../components/common/Loader";
import { useKeyboard } from "react-native-keyboard-height";
import { _pickImage } from "../../utils/FileSystem";
import CustomHeader from "../../components/common/CustomHeader";
import {
  GREEN_COLOR,
  LIGHT_GREEN_COLOR,
  BG_COLOR,
} from "../../constants/Color";
import DrawerContent from "../../components/Chat/DrawerComponent";
import Drawer from "../../components/Group/GroupDrawer";
import SideMenu from "react-native-side-menu";
import { customEmojis, defaultProps } from "./CustomEmojis";
import { useNavigation } from "@react-navigation/native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Chat = ({ loading, messages, participants, setState }) => {
  const animation = useRef(null);
  const _openOpacity = new Animated.Value(0);
  const _closeOpacity = new Animated.Value(0);
  const navigation = useNavigation();
  const [emojiEnabled, setemojiEnabled] = useState(false);
  const [drawerOpened, setDrawerOpend] = useState(false);
  const [text, setText] = useState("");
  const onEmojiClick = (emoji) => {
    const _handleOnPress = (emoji) => {
      if (emoji && onSend) {
        onSend(
          {
            text: emoji.code || emoji.img,
            _id: Math.round(Math.random() * 1000000),
            user: {
              _id: 1,
              name: "Developer",
            },
            createdAt: new Date(),
          },
          true
        );
      }
    };
    _handleOnPress(emoji);
  };
  const [viewHeight, setViewHeight] = useState(250);
  const didShow = (height) => {
    setViewHeight(height !== 0 ? height : viewHeight);
  };
  const didHide = () => {};
  const [keyboardHeight] = useKeyboard(didShow, didHide);
  const _closeEmojiPanel = () => {
    setemojiEnabled(false);
  };

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

  const onSend = (messages = []) => {
    setState((previousState) => ({
      ...previousState,
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };
  const emojiButtonFunc = () => {
    setemojiEnabled((prev) => !prev);
    if (keyboardHeight !== 0) Keyboard.dismiss();
  };
  const _listViewProps = {
    style: styles.listViewStyle,
    contentContainerStyle: styles.contentContainerStyle,
  };

  const _toggleOpen = () => {};

  //  https://stackoverflow.com/a/54550286/1458375
  return loading ? (
    <Loader></Loader>
  ) : (
    <>
      <CustomHeader
        rightButtonEnabled={true}
        rightButton={
          <TouchableOpacity
            onPress={() => {
              _toggleOpen();
            }}
            style={{ marginHorizontal: 10 }}
          >
            <Ionicons
              name={"ios-menu"}
              color={LIGHT_GREEN_COLOR}
              size={30}
            ></Ionicons>
          </TouchableOpacity>
        }
      ></CustomHeader>

      <KeyboardAvoidingView
        style={{ ...styles.container }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <GiftedChat
          messages={messages}
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
          renderInputToolbar={renderCustomInputToolBar(text, setText)}
          renderActions={renderActions(changeImage)}
          listViewProps={_listViewProps}
          renderTime={renderTime}
          renderDay={renderDay}
          renderCustomView={renderCustomView}
          renderAvatar={renderAvatar}
          renderAvatarOnTop={true}
          isKeyboardInternallyHandled={false}
          messagesContainerStyle={{
            paddingBottom: emojiEnabled ? viewHeight : 0,
            paddingTop: HeaderHeight,
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
        <EmojiBoard
          showBoard={emojiEnabled}
          customEmoji={customEmojis}
          defaultProps={defaultProps}
          onClick={(emoji) => {
            onEmojiClick(emoji);
            setemojiEnabled(false);
          }}
          containerStyle={{ borderWidth: 0, paddingTop: 0 }}
          onRemove={() => {
            setemojiEnabled(false);
          }}
        ></EmojiBoard>
      </KeyboardAvoidingView>
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
    marginBottom: getBottomSpace(),
    backgroundColor: "white",
  },
});

export default Chat;
