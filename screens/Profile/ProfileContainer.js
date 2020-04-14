import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default ({ navigation }) => {
  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
        <Text>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};
