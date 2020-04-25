import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  useRoute,
  useNavigation,
  useNavigationParam,
} from "@react-navigation/native";

export default ({}) => {
  const route = useRoute();
  const navigation = useNavigation();
  console.log(route);
  const { firstSelected, secondSelected } = route.params;
  console.log(firstSelected);

  return (
    <View>
      <Text>Group Search</Text>
    </View>
  );
};
