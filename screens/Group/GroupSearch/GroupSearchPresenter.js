import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import ScrollContainer from "../../../components/ScrollContainer";

export default ({ refreshFn, loading }) => {
  return (
    <ScrollContainer refreshFn={refreshFn} loading={loading}>
      <Text>Group Search</Text>
    </ScrollContainer>
  );
};
