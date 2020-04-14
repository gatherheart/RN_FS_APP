import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default ({
  navigation,
  route: {
    params: { id, groupName },
  },
}) => {
  console.log(id, groupName);
  return (
    <View>
      <Text>Chat</Text>
    </View>
  );
};
