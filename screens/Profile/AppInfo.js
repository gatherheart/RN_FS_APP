import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Linking,
  NativeModules,
  Platform,
} from "react-native";
import CustomHeader from "../../components/common/CustomHeader";
import { HeaderHeight } from "../../utils/HeaderHeight";
import { BG_COLOR } from "../../constants/Color";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const goToSetting = () => {
  if (Platform.OS === "ios") {
    Linking.openURL("app-settings:");
  } else {
    Linking.OpenNotification();
  }
};
export default ({ navigation }) => {
  return (
    <>
      <CustomHeader></CustomHeader>
      <ScrollView
        style={{ paddingTop: HeaderHeight, backgroundColor: BG_COLOR }}
      >
        <TouchableOpacity onPress={goToSetting}>
          <View style={[styles.optionContainer, { borderTopWidth: 0.5 }]}>
            <Text>알림 설정</Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.optionContainer]}></View>
        <View style={[styles.optionContainer]}></View>
        <View style={[styles.optionContainer]}></View>
        <View style={[styles.optionContainer]}></View>
        <View style={[styles.optionContainer]}></View>

        <Text>Post</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text>Group Button</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    width: WIDTH,
    height: 70,
    borderBottomWidth: 0.5,
  },
});
