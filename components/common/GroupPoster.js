import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import getImage from "../../utils/GetImage";
import { View, PixelRatio } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";

const _size = scale(75);
console.log(_size);
const Image = styled.Image`
  width: ${_size}px;
  height: ${_size}px;
  resize-mode: cover;
  border-radius: ${_size / 2}px;
`;

const Poster = ({ url }) => {
  return <Image source={{ uri: getImage(url) }}></Image>;
};

Poster.prototype = {};

export default Poster;
