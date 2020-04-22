import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default ({}) => {
  const route = useRoute();
  const navigation = useNavigation();

  const { firstSelected, secondSelected } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: secondSelected,
    });
    console.log(secondSelected);
  }, [route]);

  return (
    <View>
      <Text>Group Search</Text>
    </View>
  );
};
