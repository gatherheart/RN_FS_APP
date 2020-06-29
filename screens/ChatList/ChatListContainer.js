import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default ({ navigation }) => {
  console.log(navigation);
  return (
    <View style={{ marginTop: 100 }}>
      <Text>ChatList</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
        <Text>Chat</Text>
      </TouchableOpacity>
    </View>
  );
};
