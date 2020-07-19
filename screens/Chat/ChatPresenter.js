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
} from "react-native";

import { GiftedChat, Send } from "react-native-gifted-chat";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import KeyboardSpacer from "react-native-keyboard-spacer";
import EmojiBoard from "react-native-emoji-board";

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
import MenuDrawer from "react-native-side-drawer";
import {
  GREEN_COLOR,
  LIGHT_GREEN_COLOR,
  BG_COLOR,
} from "../../constants/Color";
import drawerContent from "../../components/Chat/DrawerComponent";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Chat = ({ loading, messages, participants, setState }) => {
  const animation = useRef(null);
  const [emojiEnabled, setemojiEnabled] = useState(false);
  const [drawerOpened, setDrawerOpend] = useState(false);
  const onEmojiClick = (emoji) => {
    const _handleOnPress = (emoji) => {
      if (emoji && onSend) {
        onSend(
          {
            text: emoji.code,
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
    keyboardDismissMode: "on-drag",
  };
  const _toggleOpen = () => {
    setDrawerOpend((prev) => !prev);
  };

  //  https://stackoverflow.com/a/54550286/1458375
  return loading ? (
    <Loader></Loader>
  ) : (
    <View style={styles.main}>
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
      <EmojiBoard
        showBoard={emojiEnabled}
        onClick={(emoji) => {
          onEmojiClick(emoji);

          setemojiEnabled(false);
        }}
        containerStyle={{ borderWidth: 0, paddingTop: 0 }}
        onRemove={() => {
          setemojiEnabled(false);
        }}
      ></EmojiBoard>
      <MenuDrawer
        open={drawerOpened}
        drawerContent={drawerContent({ participants })}
        drawerPercentage={65}
        animationTime={230}
        overlay={true}
        opacity={0.5}
        position={"right"}
      >
        <KeyboardAvoidingView
          style={{ ...styles.container }}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            wrapInSafeArea={false}
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
              paddingBottom: emojiEnabled ? viewHeight - getBottomSpace() : 0,
              paddingTop: HeaderHeight,
            }}
            alwaysShowSend
            keyboardShouldPersistTaps={"never"}
            parsePatterns={(linkStyle) => {
              return [
                {
                  pattern: /#(\w+)/,
                  style: { ...linkStyle[0], color: "white" },
                  onPress: (props) => alert(`press on ${props}`),
                },
              ];
            }}
          />
        </KeyboardAvoidingView>
      </MenuDrawer>
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
    borderWidth: 1,
  },
  main: { flex: 1, backgroundColor: "white" },
});

export default Chat;
