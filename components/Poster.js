import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import getImage from "../utils/GetImage";

const Image = styled.Image`
  width: 100px;
  height: 100px;
  resize-mode: cover;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

const Poster = ({ url }) => {
  return <Image source={{ uri: getImage(url) }}></Image>;
};

Poster.prototype = {};

export default Poster;
