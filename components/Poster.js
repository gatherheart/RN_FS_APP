import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import getImage from "../utils/GetImage";

const Image = styled.Image`
  width: 110px;
  height: 110px;
  resize-mode: cover;
  border-radius: 5px;
`;

const Poster = ({ url }) => {
  return <Image source={{ uri: getImage(url) }}></Image>;
};

Poster.prototype = {};

export default Poster;
