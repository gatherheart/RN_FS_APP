import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default ({ navigation }) => {
  return (
    <View>
      <Text>Group Search First Category</Text>
      <TouchableOpacity onPress={() => navigation.navigate("SecondCategory")}>
        <Text>Group</Text>
      </TouchableOpacity>
    </View>
  );
};
