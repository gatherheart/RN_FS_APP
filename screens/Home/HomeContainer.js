import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => navigation.navigate("GroupStack")}>
        <Text>Group Button</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("GroupSearch")}>
        <Text>Group Search Button</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("GroupCreate")}>
        <Text>Group Create Button</Text>
      </TouchableOpacity>
    </View>
  );
};
