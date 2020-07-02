import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomHeader from "../../../components/common/CustomHeader";
import { BG_COLOR } from "../../../constants/Color";

export default () => {
  return (
    <>
      <CustomHeader></CustomHeader>
      <View style={styles.container}>
        <Text>Group Create</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
});
