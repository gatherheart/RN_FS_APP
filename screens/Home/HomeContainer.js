import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useLogOut } from "../../context/AuthContext";

export default ({ navigation }) => {
  const logOut = useLogOut();
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => navigation.navigate("GroupStack")}>
        <Text>Group Button</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("GroupSearch")}>
        <Text>Group Search Button</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("GroupCreate")}>
        <Text>Group Create Button</Text>
      </TouchableOpacity>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={logOut}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
