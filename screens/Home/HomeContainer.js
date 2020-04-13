import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Groups")}>
        <Text>Click</Text>
      </TouchableOpacity>
    </View>
  );
};
