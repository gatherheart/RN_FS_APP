import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const TextInput = styled.TextInput`
  background-color: #f2f2f2;
  border-radius: 10px;
  margin: 0px 0px 10px 10px;
  width: ${(WIDTH * 95) / 100}px;
  height: ${HEIGHT / 20}px;
`;

const SearchInput = ({
  placeholder,
  value,
  onChange,
  onSubmit,
  returnKeyType,
}) => {
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      onChangeText={onChange}
      onSubmitEditing={onSubmit}
      returnKeyType={returnKeyType}
    ></TextInput>
  );
};

SearchInput.proptypes = {
  placeholder: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  onChange: Proptypes.func.isRequired,
  onSubmit: Proptypes.func.isRequired,
  returnKeyType: Proptypes.string.isRequired,
};

export default SearchInput;