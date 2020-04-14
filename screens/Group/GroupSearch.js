import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default ({ navigation }) => {
  return (
    <View>
      <Text>Group Search</Text>
      <TouchableOpacity onPress={() => navigation.navigate("GroupStack")}>
        <Text>Group</Text>
      </TouchableOpacity>
    </View>
  );
};
