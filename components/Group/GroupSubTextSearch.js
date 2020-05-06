import React, { useState, useMemo, useEffect } from "react";
import { View, Text, TextInput, KeyboardAvoidingView } from "react-native";

function GroupTextSearch({}) {
  const [message, setMessage] = useState("");

  // Send Message
  //const [sendMessageMutation, _] = useMutation(SEND_MESSAGE);

  // Get a Message updated using subscription
  //const { data } = useSubscription(NEW_MESSAGE);

  const onChangeText = (text) => {
    setMessage(text);
  };

  const onSubmit = async () => {
    if (message === "") return;
    setMessage("");

    /*
    try {
      await sendMessageMutation({
        variables: { text: message },
      });
      setMessage("");
    } catch (e) {
      console.log(e);
    }
    */
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <TextInput
        style={{
          marginTop: 50,
          width: "90%",
          height: "100%",
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 10,
          backgroundColor: "#f2f2f2",
        }}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        value={message}
        autoCapitalize={"none"}
        autoCorrect={false}
        placeholder={"Type a message"}
        returnKeyType={"send"}
      ></TextInput>
    </KeyboardAvoidingView>
  );
}

export default GroupTextSearch;
