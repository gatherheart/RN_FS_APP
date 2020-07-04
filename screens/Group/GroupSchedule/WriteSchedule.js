import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default ({ navigation }) => {
  return (
    <View>
      <Text>Notice</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Group")}>
        <Text>Group Button</Text>
      </TouchableOpacity>
    </View>
  );
};
