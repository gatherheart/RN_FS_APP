import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default ({ navigation }) => {
  return (
    <View>
      <Text>Group Search Second Category</Text>
      <TouchableOpacity onPress={() => navigation.navigate("GroupSearch")}>
        <Text>Group</Text>
      </TouchableOpacity>
    </View>
  );
};
