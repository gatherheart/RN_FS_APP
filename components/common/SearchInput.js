import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components/native";
import { Dimensions, StyleSheet, View, TextInput } from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";
import { GREY_COLOR } from "../../constants/Color";

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
      <EvilIcons
        name={"search"}
        size={scale(25)}
        color={GREY_COLOR}
      ></EvilIcons>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "92%",
    height: (HEIGHT * 5) / 100,
    borderWidth: 0.1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  keyboard: {
    paddingLeft: 10,
    margin: 0,
    width: "85%",
    backgroundColor: "#f2f2f2",
    height: "90%",
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
