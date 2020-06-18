import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default () => {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 50 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Group Drawer</Text>
      </TouchableOpacity>
    </View>
  );
};
