import React, { useState, useContext } from "react";
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
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import PropTypes from "prop-types";

const Container = styled.View``;

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const TEXTINPUT_MIN_HEIGHT = 50;
const TEXTINPUT_MAX_HEIGHT = 85;

const InputOnKeyboard = ({ comment, setComment, submit }) => {
  const [textInputHeight, setTextInputHeight] = useState(TEXTINPUT_MIN_HEIGHT);
  const themeContext = useContext(ThemeContext);
  const onChangeComment = (text) => {
    setComment(text);
  };
  const onSubmitComment = () => {
    if (comment === "") return;
    submit();
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <Animated.View
        style={{
          ...styles.container,
          height: textInputHeight,
          width: WIDTH,
          backgroundColor: themeContext.backgroundColor,
          flexDirection: "row",
        }}
      >
        <TextInput
          value={comment}
          placeholder={"댓글을 달아주세요"}
          onChangeText={onChangeComment}
          onChangeText={(text) => {
            onChangeComment(text);
          }}
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
          onSubmitEditing={onSubmitComment}
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
    backgroundColor: "#ecf0f1",
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
  comment: PropTypes.string.isRequired,
  setComment: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};
export default InputOnKeyboard;
