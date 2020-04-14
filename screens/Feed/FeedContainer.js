import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default ({ navigation }) => {
  return (
    <View>
      <Text>Feed</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Post")}>
        <Text>Post Button</Text>
      </TouchableOpacity>
    </View>
  );
};
