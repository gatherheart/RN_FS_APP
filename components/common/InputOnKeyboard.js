import React, { useState, useContext, useEffect } from "react";
import Title from "./Title";
import styled, { ThemeContext } from "styled-components/native";
import {
  Animated,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import { BottomSafeAreaHeight } from "../../utils/HeaderHeight";
import { BG_COLOR } from "../../constants/Color";

const Container = styled.View``;

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const TEXTINPUT_MIN_HEIGHT = 50;
const TEXTINPUT_MAX_HEIGHT = 85;

const InputOnKeyboard = ({ text, setText, submit }) => {
  let keyboardDidShowListener;
  let keyboardDidHideListener;
  const [textInputHeight, setTextInputHeight] = useState(TEXTINPUT_MIN_HEIGHT);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [bottomSafeArea, setBottomSafeArea] = useState(BottomSafeAreaHeight);

  const themeContext = useContext(ThemeContext);
  const onChangeText = (text) => {
    setText(text);
  };
  const onSubmitText = () => {
    if (text === "") return;
    Keyboard.dismiss();
    submit();
    setText("");
  };
  const _keyboardDidShow = () => {
    console.log("_keyboardDidShow");
    setKeyboardVisible(true); // or some other action
  };
  const _keyboardDidHide = () => {
    console.log("_keyboardDidHide");
    setKeyboardVisible(false); // or some other action
  };
  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      _keyboardDidShow
    );
    keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      _keyboardDidHide
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ backgroundColor: BG_COLOR, borderWidth: 1 }}
    >
      <Animated.View
        style={{
          ...styles.container,
          height: textInputHeight,
          bottom: bottomSafeArea,
          backgroundColor: themeContext.backgroundColor,
        }}
      >
        <TextInput
          value={text}
          placeholder={"댓글을 달아주세요"}
          onChangeText={(text) => {
            onChangeText(text);
          }}
          onFocus={() => setBottomSafeArea(0)}
          onBlur={() => setBottomSafeArea(BottomSafeAreaHeight)}
          onContentSizeChange={(event) => {
            const textInputHeight = Math.min(
              TEXTINPUT_MAX_HEIGHT,
              Math.max(
                TEXTINPUT_MIN_HEIGHT,
                event.nativeEvent.contentSize.height
              )
            );
            setTextInputHeight(textInputHeight);
          }}
          underlineColorAndroid="transparent"
          returnKeyType="none"
          style={{
            ...styles.paragraph,
          }}
          scrollEnabled={true}
          autoCorrect={false}
          autoFocus={false}
          multiline={true}
        ></TextInput>

        <View style={{ ...styles.buttonContainer, borderWidth: 1 }}>
          <TouchableOpacity
            style={{
              ...styles.button,
              height: "100%",
              width: "100%",
            }}
          >
            <Text>게시</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    flexDirection: "row",
    bottom: BottomSafeAreaHeight,
    backgroundColor: BG_COLOR,
  },
  paragraph: {
    paddingVertical: 0,
    paddingHorizontal: 15,
    textAlignVertical: "center",
    justifyContent: "center",
    borderWidth: 1,
    height: "100%",
    width: (WIDTH * 85) / 100,
  },
  buttonContainer: {
    width: (WIDTH * 15) / 100,
    backgroundColor: "#ecf0f1",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});

InputOnKeyboard.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};
export default InputOnKeyboard;
