import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components/native";
import { Dimensions, StyleSheet, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const SearchInput = ({
  placeholder,
  value,
  onChange,
  onSubmit,
  returnKeyType,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        returnKeyType={returnKeyType}
        style={styles.keyboard}
      ></TextInput>
      <Ionicons name={"arrow-down-outline"}></Ionicons>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 2,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  keyboard: {
    borderRadius: 10,
    paddingLeft: 10,
    borderWidth: 1,
    margin: 0,
    width: "85%",
    backgroundColor: "#f2f2f2",
    height: HEIGHT / 20,
  },
});

SearchInput.proptypes = {
  placeholder: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  onChange: Proptypes.func.isRequired,
  onSubmit: Proptypes.func.isRequired,
  returnKeyType: Proptypes.string.isRequired,
};

export default SearchInput;
