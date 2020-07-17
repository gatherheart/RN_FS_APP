import React, { useEffect, useState, useRef } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LottiView from "lottie-react-native";

export default ({ navigation }) => {
  const animation = useRef();
  useEffect(() => {}, []);
  console.log(navigation);
  return (
    <View style={{ marginTop: 100, flex: 1, backgroundColor: "white" }}>
      <Text>ChatList</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
        <Text>Chat</Text>
        <View style={{ height: 200 }}>
          <LottiView
            autoPlay
            loop={true}
            source={require("../../assets/lottieFiles/dino-dance.json")}
            style={{
              width: 414,
              height: 200,
              position: "absolute",
              zIndex: 1,
            }}
          ></LottiView>
        </View>
      </TouchableOpacity>
    </View>
  );
};
